const http = require('http');
const data = JSON.stringify({ content: 'Test resume content.' });
const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/parse-resume',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('parse-resume', res.statusCode, body);
    const payload = JSON.stringify({ resumeContent: 'Test resume content', jobDescription: 'Test JD' });
    const opts = {
      hostname: 'localhost',
      port: 5001,
      path: '/api/job-match',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };
    const rq = http.request(opts, (res2) => {
      let body2 = '';
      res2.on('data', (chunk) => (body2 += chunk));
      res2.on('end', () => {
        console.log('job-match', res2.statusCode, body2);
      });
    });
    rq.on('error', (e) => console.error('job-match error', e.message));
    rq.write(payload);
    rq.end();
  });
});
req.on('error', (e) => console.error('parse-resume error', e.message));
req.write(data);
req.end();
