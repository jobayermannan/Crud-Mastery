import express from 'express';
import { studentController } from './user.controller';


const router = express.Router();

//will call controller function

router.post('/create-student', studentController.createStudent);

router.get('/', studentController.getAllStudents);

router.get('/:studentId', studentController.getSingleStudents);


router.delete('/:studentId', studentController.deleteStudent);

export const studentRoutes = router;