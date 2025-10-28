import {getUsersService,getUserByIdService,createUserService,updateUserService,deleteUserService} from "../models/userModel"

const handleResponse = (res, status, message, data=null)=>{
      res.status(status).json({
            status,
            message,
            data
      })
};
export const createUser = async (req,res,next)=>{
      const {name,email}=req.body;
      try{
            const newUser = await createUserService(name, email);
            handleResponse(res, 201, "User Created Succesfully", newUser)
      }catch(err){
            next(err)
      }
};

export const getAllUsers = async (req,res,next)=>{
      try{
            const users = await getUsersService();
            handleResponse(res, 200, "Users loaded Succesfully", users)
      }catch(err){
            next(err)
      }
};

export const getUserById = async (req,res,next)=>{
      const id = req.params.id;
      try{
            const user = await getUserByIdService(id);
            if(!user) return handleResponse(res,404,"User Not Found")
            handleResponse(res, 201, "User found by id Succesfully", user)
      }catch(err){
            next(err)
      }
};

export const updateUser = async (req,res,next)=>{
      const id = req.params.id;
      const {name, email} = req.body;
      try{
            const user = await updateUserService(name, email, id);
            if(!user) return handleResponse(res, 404, "UserNotFound")
            handleResponse(res, 201, "User updated Succesfully", user)
      }catch(err){
            next(err)
      }
};

export const deleteUser = async (req,res,next)=>{
      const id = req.params.id;
      try{
            const user = await deleteUserService(id);
            if(!user) return handleResponse(res, 404, "UserNotFound")
            handleResponse(res, 201, "User deleted Succesfully", user)
      }catch(err){
            next(err)
      }
};

