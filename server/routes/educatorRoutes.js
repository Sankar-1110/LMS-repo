import express  from 'express'
import { addCourse, educatorDashboardData, getEducatorCourse, getEnrolledStudentsData, updateRoleEducator, deleteCourse } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'

const educatorRouter=express.Router()
educatorRouter.get('/update-role',updateRoleEducator)
educatorRouter.post('/add-course',upload.single('image'),protectEducator,addCourse)
educatorRouter.get('/courses',protectEducator,getEducatorCourse)
educatorRouter.get('/dashboard',protectEducator,educatorDashboardData)
educatorRouter.get('/enrolled-students',protectEducator,getEnrolledStudentsData)
educatorRouter.delete('/course/:id', protectEducator, deleteCourse)


export default educatorRouter