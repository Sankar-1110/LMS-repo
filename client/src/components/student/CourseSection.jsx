import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import CourseCard from './CourseCard'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
const CourseSection = () => {
  const {allCourses}=useContext(AppContext)
  const {user}=useUser();
  const navigate=useNavigate();
  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 my-3'>Discover our top-rated courses across various categories. From coding and design to <br/> buisiness and wellness, our courses are crafted  to diver results. </p>
      <div className='px-4 md:px-0 md:my-16 my-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {allCourses.slice(0,8).map((course,index)=>(
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <button  onClick={()=>{user?(navigate('/course-List') && scrollTo(0,0)):toast.info('Login to continue!')}}
      className='text-gray-500 border border-gray-500/30 px-10 py-3  rounded'>Show all courses</button>
    </div>
  )
}

export default CourseSection