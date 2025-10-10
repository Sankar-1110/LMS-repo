import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {
  const{currency,calculateRating}=useContext(AppContext)
  const rating = calculateRating(course)

  return (
    <Link to={'/course/'+course._id} onClick={()=>scrollTo(0,0)} className='course-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-colors bg-white'>
      <div className='relative'>
        <img className='w-full h-44 object-cover' src={course.courseThumbnail} alt=""  />
        <div className='absolute left-3 top-3 bg-white/70 backdrop-blur-sm rounded px-2 py-1 text-xs'>{course.category || 'General'}</div>
      </div>
      <div className='p-4'>
        <h3 className='text-sm font-semibold text-slate-900 line-clamp-2' >{course.courseTitle}</h3>
        <p className='text-xs text-gray-500 mt-1'>{course.educator.name}</p>
        <div className='flex items-center gap-2 mt-3'>
          <div className='flex items-center gap-1'>
            <span className='text-sm font-medium'>{rating}</span>
            <div className='flex'>
              {[...Array(5)].map((_,i)=>(<img key={i} src={i<Math.floor(rating)?assets.star:assets.star_blank} className='w-3.5 h-3.5' alt='rating'/>))}
            </div>
            <span className='text-xs text-gray-400'>({course.courseRatings.length})</span>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <div className='text-base font-semibold text-slate-900'>{currency}{(course.coursePrice-course.discount*course.coursePrice/100).toFixed(2)}</div>
          <button className='text-sm px-3 py-1 rounded-md bg-blue-600 text-white'>Enroll</button>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard