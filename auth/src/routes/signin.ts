import express,{Request,Response} from "express";
import {body} from 'express-validator';
import { BadRequestError } from '@sgblits/common';
import {User} from '../models/user'
import { Password } from "../services/password";
import jwt from 'jsonwebtoken';
import { validateRequest } from '@sgblits/common';

const router=express.Router();
router.post('/api/users/signin',
[
    body('email')
        .isEmail()
        .withMessage('Email must be validdd'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply passwordd')
],
validateRequest,
async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('User not found');
    }
    const passwordMatch=await Password.compare(existingUser.password,password);
    if(!passwordMatch){
        throw new BadRequestError('password doesnt match');
    }
    const userJwt=jwt.sign({
        id:existingUser.id,
        email:existingUser.email
      },process.env.JWT_KEY!);
      req.session={
        jwt:userJwt
      };
      res.status(200).send(existingUser);
});

export {router as signinRouter}