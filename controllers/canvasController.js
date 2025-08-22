import fetch from 'node-fetch';

export async function getCourses(req, res) {
  const apiKey = req.query.apiKey;
  const baseUrl = req.query.baseUrl;
  if (!apiKey || !baseUrl) {
    return res.status(400).json({ error: 'Missing apiKey or baseUrl query parameter.' });
  }
  try {
    const courses = await fetchAllCourses(baseUrl, apiKey);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
}

export async function getCourseDetail(req, res) {
  const apiKey = req.query.apiKey;
  const baseUrl = req.query.baseUrl;
  const courseId = req.query.courseId;
  if (!apiKey || !baseUrl || !courseId) {
    return res.status(400).json({ error: 'Missing apiKey, baseUrl, or courseId query parameter.' });
  }
  try {
    const url = `${baseUrl}/courses/${courseId}?include[]=syllabus_body&include[]=teachers`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course details', details: err.message });
  }
}

export async function getAssignments(req, res) {
  const apiKey = req.query.apiKey;
  const baseUrl = req.query.baseUrl;
  const courseId = req.query.courseId;
  if (!apiKey || !baseUrl || !courseId) {
    return res.status(400).json({ error: 'Missing apiKey, baseUrl, or courseId query parameter.' });
  }
  try {
    const url = `${baseUrl}/courses/${courseId}/assignments?per_page=100`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignments', details: err.message });
  }
}

export async function getAssignmentDetail(req, res) {
  const apiKey = req.query.apiKey;
  const baseUrl = req.query.baseUrl;
  const courseId = req.query.courseId;
  const assignmentId = req.query.assignmentId;
  if (!apiKey || !baseUrl || !courseId || !assignmentId) {
    return res.status(400).json({ error: 'Missing apiKey, baseUrl, courseId, or assignmentId query parameter.' });
  }
  try {
    const url = `${baseUrl}/courses/${courseId}/assignments/${assignmentId}/submissions/self`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignment detail', details: err.message });
  }
}

async function fetchAllCourses(baseUrl, apiKey) {
  let courses = [];
  let url = `${baseUrl}/courses?per_page=100`;
  while (url) {
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    const data = await response.json();
    courses = courses.concat(data);
    const link = response.headers.get('link');
    if (link && link.includes('rel="next"')) {
      const match = link.match(/<([^>]+)>; rel="next"/);
      url = match ? match[1] : null;
    } else {
      url = null;
    }
  }
  return courses;
}
