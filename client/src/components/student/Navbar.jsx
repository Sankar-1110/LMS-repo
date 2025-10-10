import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useClerk,UserButton,useUser } from '@clerk/clerk-react';
import { AppContext } from '../../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
    const isCourseListPage=location.pathname.includes('/course-List');
const {openSignIn}=useClerk();
const {user}=useUser();
const [mobileOpen, setMobileOpen] = useState(false)
const {navigate,isEducator,backendUrl,setIsEducator,getToken}=useContext(AppContext)

const becomeEducator=async()=>{
  try{
    if(isEducator){
      navigate('/educator')
      return;
    }
    const token=await getToken()
    const {data}=await axios.get(backendUrl+'/api/educator/update-role',{headers:{Authorization:`Bearer ${token}`}})
    if(data.success){
      setIsEducator(data.message)
      toast.success(data.message)
    }
    else{
        toast.error(data.message)
    }
  }catch(error){
       toast.error(error.message)
  }
}

  return (
    <header className='sticky top-0 z-40 backdrop-blur-sm  border-b border-gray-200  bg-cyan-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-3 cursor-pointer' onClick={()=>navigate('/') }>
              <img src={assets.logo} alt='Learnify logo' className='w-28 lg:w-32' />
              
            </div>
            <nav className='hidden md:flex items-center gap-6 text-sm text-gray-600'>
              <Link to='/' className='hover:text-slate-900'>Home</Link>
              <Link to='/course-List' className='hover:text-slate-900'>Courses</Link>
              {user && <>
                <button onClick={becomeEducator} className='text-sm text-gray-700 hover:text-slate-900'>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                <Link to='/my-enrollments' className='hover:text-slate-900'>My Enrollments</Link>
              </>}
            </nav>
          </div>

          <div className='flex items-center gap-3'>
            <div className='hidden gap-4 md:flex items-center'>
              <p className='text-sm'>Hi! {user? user.fullName:'Guest'}</p>

              {user ? (
                <UserButton/>
              ) : (
                <button onClick={()=>openSignIn()} className='inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md shadow hover:bg-blue-700'>Create Account</button>
              )}
            </div>

            {/* mobile actions: hamburger + user */}
            <div className='md:hidden flex items-center text-gray-500 gap-2'>
              <button onClick={()=>setMobileOpen(v=>!v)} aria-label='Toggle menu' className='p-2 rounded-md hover:bg-gray-100'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              </button>

              {user ? <UserButton/> : <button onClick={()=>openSignIn()} className='p-2'><img src={assets.user_icon} alt='' className='w-6 h-6'/></button>}
            </div>
          </div>
        </div>
      </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className='md:hidden bg-white border-b border-gray-200'>
            <div className='px-4 py-3 space-y-2'>
              <Link to='/' onClick={()=>setMobileOpen(false)} className='block text-gray-700'>Home</Link>
              <Link to='/course-List' onClick={()=>setMobileOpen(false)} className='block text-gray-700'>Courses</Link>
              {user && (
                <>
                  <button onClick={()=>{ setMobileOpen(false); becomeEducator() }} className='w-full text-left text-gray-700'>
                    {isEducator ? 'Educator Dashboard' : 'Become Educator'}
                  </button>
                  <Link to='/my-enrollments' onClick={()=>setMobileOpen(false)} className='block text-gray-700'>My Enrollments</Link>
                </>
              )}
            </div>
          </div>
        )}
        </header>
  )
}

export default Navbar