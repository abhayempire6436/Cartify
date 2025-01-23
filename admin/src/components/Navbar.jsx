import React from 'react'
import {assets} from '../admin_assets/assets.js'

const Navbar = ({settoken}) => {
  return (
    <div className='flex items-center py-3 px-[2%] justify-between'>
        <img className='w-[max(10%, 50px)]' src={assets.logo} alt="" />
        <h1 className='text-2xl max-sm:hidden font-semibold'>Admin Panel</h1>
        <button onClick={()=> settoken("")} className='bg-blue-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar