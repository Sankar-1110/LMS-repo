import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'
import { useUser } from '@clerk/clerk-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Hero = () => {
  const navigate=useNavigate();
  const {user}=useUser();
  const scrollDown=()=>{
    navigate('/course-list')
  }
  const loginToUse=()=>{
    toast.info('Login to continue !');
  }
  return (
    <section className='w-full px-6 md:px-12 py-16'>
      <div className='mx-auto max-w-6xl bg-gradient-to-r from-cyan-50/60 to-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8'>
        <div className='content text-center md:text-left md:flex-1'>
          <h1 className='text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight'>
            Empower your future with courses designed to <span className='text-blue-600'>fit your choice</span>
          </h1>
          <p className='mt-4 text-gray-500 max-w-2xl'>We bring together world-class instructors, interactive content, and a supportive community to help you reach your personal and professional goals.</p>
          <div className='mt-6 flex items-center justify-center md:justify-start gap-4'>
            <button onClick={()=>{user?scrollDown():loginToUse()}} className='inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg hover:scale-[1.02] transition'>Get Started</button>
            
          </div>
        </div>

        <div className='md:flex-1 flex items-center justify-center'>
          <div className='w-full max-w-sm'>
            <img src={assets.sketch} alt='hero' className='w-full h-56 object-cover rounded-lg shadow-sm' />
          </div>
        </div>
      </div>
      <div className='mt-8 max-w-6xl mx-auto'>
        <SearchBar />
      </div>
    </section>
  )
}

export default Hero