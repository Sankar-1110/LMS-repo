import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Loading from '../../components/student/Loading'
import { toast } from 'react-toastify'
import axios from 'axios'

const Mycourses = () => {

  const {currency,isEducator,backendUrl,getToken}=useContext(AppContext)
  const [courses,setCourses]=useState(null)
  const fetchEducatorCourses=async()=>{
   try{
  const token =await  getToken()
  const {data}=await axios.get(backendUrl+'/api/educator/courses',{headers:{Authorization:`Bearer ${token}`}})
  data.success && setCourses(data.courses)

   }catch(error){
     toast.error(error.message)
   }
     
  }
  useEffect(()=>{
    if(isEducator){
    fetchEducatorCourses()
    }
},[isEducator])

const deleteCourse = async (courseId) => {
  const ok = window.confirm('Are you sure you want to delete this course? This action cannot be undone.')
  if (!ok) return

  try {
    const token = await getToken()
    const res = await axios.delete(backendUrl+`/api/educator/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (res.data?.success) {
      setCourses(prev => prev.filter(c => c._id !== courseId))
      toast.success(res.data.message || 'Course deleted')
    } else {
      
      toast.error(res.data?.message || 'Failed to delete course')
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || 'Delete failed')
    console.error('deleteCourse error', error)
  }
}

  return courses?(
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div>
          <table>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
            <tr>
            <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
            <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
            <th className='px-4 py-3 font-semibold truncate'>Students</th>
            <th className='px-4 py-3 font-semibold truncate'>Published on</th>
            <th className='px-4 py-3 font-semibold truncate'>Actions</th>
            </tr></thead>
            <tbody className='text-sm text-gray-500'>
              {courses.map((course)=>(
                <tr key={course._id} className='border-b border-gray-500/20'>
                <td className='md:px-4 pl-2 md:pl-4 py-3 flex  items-center space-x-3 truncate'>
                  <img src={course.courseThumbnail} alt="course img" className='w-16' />
                  <span className='truncate hidden md:block'>{course.courseTitle}</span>
                </td>
                <td className='px-4 py-3'>{currency}{Math.floor(course.enrolledStudents.length*(course.coursePrice-course.discount*course.coursePrice/100))}</td>
                <td className='px-4 py-3'>{course.enrolledStudents.length}</td>
                <td className='px-4 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
                <td className='px-4 py-3'>
                  <button
                    onClick={() => deleteCourse(course._id)}
                    
                    className='px-2 py-1 text-white bg-red-900 hover:bg-red-700 rounded'
                  >
                    Delete
                  </button>
                </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  ):<Loading/>
}

export default Mycourses