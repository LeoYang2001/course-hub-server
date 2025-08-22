import express from 'express';
import {
  getCourses,
  getCourseDetail,
  getAssignments,
  getAssignmentDetail
} from '../controllers/canvasController.js';

const router = express.Router();

router.get('/courses', getCourses);
router.get('/course', getCourseDetail);
router.get('/assignments', getAssignments);
router.get('/assignmentDetail', getAssignmentDetail);

export default router;
