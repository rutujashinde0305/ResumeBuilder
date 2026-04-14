import json
import urllib.request

for url, payload in [
    ('http://localhost:5001/api/parse-resume', {'content': 'Test resume content.'}),
    ('http://localhost:5001/api/job-match', {'resumeContent': 'Test resume content', 'jobDescription': 'Test JD'})
]:
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            print(url, resp.status, resp.read().decode('utf-8'))
    except Exception as e:
        print(url, 'ERROR', type(e).__name__, e)
