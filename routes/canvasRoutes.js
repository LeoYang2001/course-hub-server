import express from 'express';
import {
  getCourses,
  getCourseDetail,
  getAssignments,
  getAssignmentDetail,
  emailSending,
  handleSchedule,
} from '../controllers/canvasController.js';

const router = express.Router();

router.get('/courses', getCourses);
router.get('/course', getCourseDetail);
router.get('/assignments', getAssignments);
router.get('/assignmentDetail', getAssignmentDetail);


router.post('/email-sending', emailSending);
router.post('/handle-schedule', handleSchedule);


export default router;
