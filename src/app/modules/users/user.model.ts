// model
import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose';

import {

  TGuardian,
  TLocalGuardian,
  TStudent,
 
  StudentModel,
  TUserName,
} from './students/student.interface';
import config from '../config';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    maxlength: [10, 'First name cannot exceed 10 characters.'],
    // validate: {
    //   validator:function(value:string){
    //     const firstNameStr= value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    //   return value === firstNameStr;

    //   },
    //   message: '{VALUE}is not in a capitalized formate'
    // }
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    // validate:{
    //   validator: (value:string)=> validator.isAlpha(value)

    //   ,
    //   message: '{VALUE} is not valid .'
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNumber: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    
    max_length:[20, 'password can not be more than 20']
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'Gender must be either "male" or "female".',
    },
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'Email is required.'] },
  contactNo: { type: String, required: [true, 'Contact number is required.'] },
  emergencyContactNumber: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'Invalid blood group type.',
    },
    required: [true, 'Blood group is required.'],
  },

  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required.'],
  },
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
    type:Boolean,
    default:false
    
  },
},{
  toJSON:{
    virtuals:true
  }
});

//virtual mon goose

studentSchema.virtual('fullName').get(function() {
  return this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName;
});


//pre save middle ware pre save hook //() wil work on create and save function
studentSchema.pre('save', async function(next){
  // console.log(this,' pre hook: we will save the data  ')
   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const user = this //current processing a jawa document k refer kore
  //hashing password and save it to db

  user.password= await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
  
  next()
})

//post middle ware  /hook 

studentSchema.post('save', function(doc,next){
  doc.password= ""

  next()
})
// query middle ware hook 
studentSchema.pre('find', function(next){

  this.find({isDeleted:{$ne:true}})

  next()

} )
studentSchema.pre('findOne', function(next){

  this.find({isDeleted:{$ne:true}})

  next()

} )

// [  { '$match': { isDeleted:{$ne:true} } },{ '$match': { id: '12376' } } ]
studentSchema.pre('aggregate', function(next){

  this.pipeline().unshift( { '$match': { isDeleted:{$ne:true} } })

  next()

} )







//creating a custom static method 

studentSchema.statics.isUserExists=async function(id:string){
  const existingUser= await Student.findOne({id})
  return existingUser

}


//creating a custom instance method 
// studentSchema.methods.isUserExists=async function(id:string){
//   const existingUser= await Student.findOne({id})
//   return existingUser
// }
export const Student = model<TStudent,StudentModel>('Student', studentSchema);
