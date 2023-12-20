import { Request, Response } from 'express';
import { studentServices } from './student.service';
import StudentSchema from './studnet.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const zodData = StudentSchema.parse(studentData);
    const result = await studentServices.createStudentIntoDb(zodData );

    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message ||'something went wrong',
      error: err,
    });
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
            success: false,
            message:err.message || 'something went wrong',
            error: err,  });
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentsFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully',
      data: result,
    });
  } catch (err:any) {
  
    res.status(500).json({
      success: false,
      message:err.message || 'something went wrong',
      error: err,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'student is deleted successfully',
      data: result,
    });
  } catch (err:any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message:err.message || 'something went wrong',
      error: err,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudent
}