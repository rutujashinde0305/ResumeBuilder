const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ===================== HEALTH =====================
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend running in REAL MODE 🚀' });
});

// ===================== PARSE RESUME =====================
app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
  try {
    const apyApiKey = process.env.APY_API_KEY;

    if (!apyApiKey) {
      return res.status(500).json({ success: false, error: 'API key missing' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Resume file required' });
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    const response = await axios.post(
      'https://api.apyhub.com/sharpapi/api/v1/hr/parse_resume',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'apy-token': apyApiKey,
        },
      }
    );

    fs.unlink(req.file.path, () => {});

    res.json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error('Parse Error:', error.response?.data || error.message);

    // Handle rate limiting
    if (error.response?.status === 429) {
      fs.unlink(req.file?.path, () => {});
      return res.status(429).json({
        success: false,
        error: 'API rate limit exceeded. Please try again later.',
        retryAfter: error.response.headers['retry-after'] || 60,
      });
    }

    fs.unlink(req.file?.path, () => {});

    res.status(500).json({
      success: false,
      error: 'Parse resume failed',
      details: error.response?.data || error.message,
    });
  }
});

// ===================== JOB MATCH (ASYNC HANDLED) =====================
app.post('/api/job-match', async (req, res) => {
  console.log('Job match request received:', req.body);
  try {
    const { resumeContent, jobDescription } = req.body;
    const apyApiKey = process.env.APY_API_KEY;

    console.log('API Key present:', !!apyApiKey);

    if (!resumeContent || !jobDescription) {
      return res.status(400).json({
        success: false,
        error: 'Resume content and job description required',
      });
    }

    // Create a temporary file from the resume content
    const tempFilePath = path.join(__dirname, 'temp_resume.txt');
    fs.writeFileSync(tempFilePath, resumeContent);

    // Step 1: Submit Job
    const formData = new FormData();
    formData.append('file', fs.createReadStream(tempFilePath));
    formData.append('content', jobDescription);
    formData.append('language', 'English');

    console.log('Sending request to ApyHub...');

    const submitResponse = await axios.post(
      'https://api.apyhub.com/sharpapi/api/v1/hr/resume_job_match_score',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'apy-token': apyApiKey,
        },
        timeout: 30000, // 30 second timeout
      }
    );

    console.log('ApyHub submit response status:', submitResponse.status);
    console.log('ApyHub submit response data:', JSON.stringify(submitResponse.data, null, 2));

    const statusUrl = submitResponse.data.status_url;

    if (!statusUrl) {
      // Clean up temp file
      fs.unlink(tempFilePath, () => {});
      return res.status(500).json({
        success: false,
        error: 'No status URL returned from API',
      });
    }

    // Step 2: Wait & Poll result
    let resultData = null;
    const maxPolls = 10; // Poll for up to 10 times (30 seconds total)

    for (let i = 0; i < maxPolls; i++) {
      console.log(`Polling attempt ${i + 1}/${maxPolls}`);
      await new Promise(resolve => setTimeout(resolve, 3000));

      try {
        const statusResponse = await axios.get(statusUrl, {
          headers: {
            'apy-token': apyApiKey,
          },
          timeout: 10000,
        });

        console.log('Status response:', statusResponse.status, statusResponse.data.status);

        if (statusResponse.data.status === 'completed') {
          resultData = statusResponse.data;
          break;
        }
      } catch (pollError) {
        console.log('Poll error:', pollError.message);
        // Continue polling even if one request fails
      }
    }

    // Clean up temp file
    fs.unlink(tempFilePath, () => {});

    if (!resultData) {
      return res.status(202).json({
        success: false,
        message: 'Processing still in progress, try again later',
        statusUrl,
      });
    }

    res.json({
      success: true,
      result: resultData,
    });

  } catch (error) {
    console.error('Job Match Error:', error.message);
    console.error('Error details:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }

    // Handle rate limiting
    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        error: 'API rate limit exceeded. Please try again later.',
        retryAfter: error.response.headers['retry-after'] || 60,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Job match failed',
      details: error.response?.data || error.message,
    });
  }
});

// ===================== ROOT =====================
app.get('/', (req, res) => {
  res.send('🚀 Resume Builder Backend (REAL API MODE)');
});

// ===================== START SERVER =====================
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Health: http://localhost:${port}/api/health`);
  });

  server.on('error', (error) => {
    if ((error.code === 'EADDRINUSE' || error.code === 'EACCES') && port === 5000) {
      console.warn('Port busy, switching to 5001');
      startServer(5001);
    } else {
      console.error(error);
      process.exit(1);
    }
  });
};

startServer(PORT);