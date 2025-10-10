import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
  <footer className='w-full text-white mt-5
   bg-slate-900'>
      {/* full-width background */}
      <div className='w-full bg-slate-900'>
        <div className='max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10'>
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <img src={assets.logo_dark} alt="logo" className='w-40 md:w-32 mb-4' />
          <p className='text-sm text-white/80 max-w-xs md:max-w-none'>Learn from industry experts. Courses crafted to help you grow professionally and personally.</p>
        </div>
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <h3 className='font-semibold text-white mb-4'>Company</h3>
          <ul className='space-y-2 text-sm text-white/80'>
            <li><a href='#' className='hover:text-white'>Home</a></li>
            <li><a href='#' className='hover:text-white'>About us</a></li>
            <li><a href='#' className='hover:text-white'>Contact</a></li>
            <li><a href='#' className='hover:text-white'>Privacy policy</a></li>
          </ul>
        </div>
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <h3 className='font-semibold text-white mb-4'>Subscribe</h3>
          <p className='text-sm text-white/80 mb-4'>Get weekly updates on new courses and offers.</p>
          <form className='flex w-full max-w-md gap-2 flex-col sm:flex-row items-stretch' onSubmit={(e)=>e.preventDefault()}>
            <input type="email" placeholder='Enter your email' className='w-full rounded-md px-3 py-2 text-sm bg-white/5 placeholder-white/60 border border-white/10 outline-none' />
            <button className='px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm w-full sm:w-auto'>Subscribe</button>
          </form>
        </div>
        </div>
      </div>
      <div className='py-4 text-center text-xs  text-white/60'>
        Copyright 2025 © LMS. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer