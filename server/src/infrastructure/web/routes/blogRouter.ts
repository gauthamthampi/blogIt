import { Router } from 'express';
import { BlogController } from '../../../adapters/controllers/BlogController';
import { CreateBlog } from '../../../use_cases/blogs/CreateBlog';
import { FetchAllBlog } from '../../../use_cases/blogs/FetchAllBlog';
import { BlogRepositoryMongo } from '../../../adapters/repositories/BlogRepositoryMongo';
import { upload } from '../../../middlewares/multer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { FetchUserBlog } from '../../../use_cases/blogs/FetchUserBlog';
import { UpdateBlog } from '../../../use_cases/blogs/EditBlog';
dotenv.config();

const router = Router();

const blogRepository = new BlogRepositoryMongo();
const createBlog = new CreateBlog(blogRepository)
const updateblog = new UpdateBlog(blogRepository)
const fetchallblogs = new FetchAllBlog(blogRepository)
const fetchuserblogs = new FetchUserBlog(blogRepository)
const blogController = new BlogController(createBlog, updateblog, fetchallblogs, fetchuserblogs);


router.post('/api/addblog', upload.single('image'), (req, res) => blogController.CreateBlog(req, res));
router.get('/api/fetch-allblogs',(req,res)=>blogController.FetchAllBlogs(req,res))
router.get('/api/fetch-userblogs',(req,res)=> blogController.FetchUserBlogs(req,res))
router.put('/api/editblog/:id',upload.single('image'), (req,res) => blogController.UpdateBlog(req,res));



export default router;
