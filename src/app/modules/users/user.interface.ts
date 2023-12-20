// interface
import { Model } from 'mongoose';

export type TUserName = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

export type TGuardian = {
  fatherName: string;
  fatherContactNumber: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNumber: string;
  motherOccupation: string;
};

export type TLocalGuardian = {
  name: string;
  contactNo: string;
  address: string;
  occupation: string;
};

export type TStudent = {
  id: string;
  password:string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean
};

//for creating static 

export interface StudentModel extends Model<TStudent> {
 isUserExists(id:string):Promise<TStudent | null>
}





//for creating instance 
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent |null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
