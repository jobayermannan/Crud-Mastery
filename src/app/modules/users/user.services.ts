// import { Student } from '../studennt.model';
// import { TStudent } from './student.interface';

import { TStudent } from "./user.interface";
import { Student } from "./user.model";

const createStudentIntoDb = async (studentData: TStudent) => {

  if (await Student.isUserExists(studentData.id)){
    throw new Error ('user already exists')
  }

  const result = await Student.create(studentData);//built in static method



  // const student = new Student(studentData);//create an instance 

  // if (await student.isUserExists(studentData.id)){
  //   throw new Error ('user already exists')
  // }


  // const result = await student.save(); //built in isntace method

  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsFromDb = async (id: string) => {


  // const result = await Student.findOne({ id: id }); //in es6 you can use {id} instead of {id:id}
  const result = await Student.aggregate([{$match:{id:id}}]); //in es6 you can use {id} instead of {id:id}
  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id: id },{isDeleted:true}); //in es6 you can use {id} instead of {id:id}
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentsFromDb,
  deleteStudentFromDb
};
