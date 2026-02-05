import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setlist] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      
      if(response.data.success){
        setlist(response.data.products);
        
      }
      else{
        toast.error(response.data.message)        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      // console.log("Invalid");
    }
  }

  const removeProduct = async (id) => {
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}})

      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }
      else{
        // console.log("Not remove");
        toast.error(response.data.message)
      }

    } catch (error) {
      // console.log("Not remove");
      
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Products List</p>    
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}

        {
          list.map((product, index) => (
            
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
                <img className='w-12' src={product.image[0]} alt="" />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>{currency}{product.price}</p>
                <p onClick={()=>removeProduct(product._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
            
          ))
        }
      </div>
    </>
  )
}

export default List