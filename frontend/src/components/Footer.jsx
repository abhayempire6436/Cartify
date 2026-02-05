import React from 'react'
import assets from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.cartify} alt="" className='mb-5 w-32 border-black'/>
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos modi, expedita pariatur reiciendis sed molestiae repellat blanditiis deserunt fugit impedit nobis.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5 text-blue-700'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5 text-blue-700'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>contact@cartify.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-center'>Copyright 2025 @cartify.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer