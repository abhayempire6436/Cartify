import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import assets from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collections = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setshowFilter] = useState(false)
  const [filterProducts, setfilterProducts] = useState([])
  const [category, setcategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [sortType, setsortType] = useState('relevant');

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setcategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setsubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(product => category.includes(product.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory));
    }

    setfilterProducts(productsCopy);
  }

  // useEffect(()=>{
  //   setfilterProducts(products);
  // }, [])

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setfilterProducts(fpCopy.sort((a,b)=> (a.price - b.price)));
        break;
      case 'high-low':
        setfilterProducts(fpCopy.sort((a,b)=> (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch, products])

  useEffect(()=>{
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* Filter Options */}
        <div className='min-w-60'>
          <p onClick={()=>setshowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ""}`} alt="" />
          </p>
          {/* Category filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/> Men
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/> Women
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/> Kids
                </p>
              </div>
          </div>

          {/* SubCategory filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>TYPE</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/> Topwear
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
                </p>
              </div>
          </div>
        </div>

        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={"ALL"} text2={"COLLECTIONS"}/>
                {/* Product sort */}
                <select onChange={(e)=> setsortType(e.target.value)} className='border border-2 border-gray-300 text-sm px-2'>
                  <option value="relevant">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Low to High</option>
                  <option value="high-low">Sort by: High to Low</option>
                </select>
            </div>

            {/* Map Product */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProducts.map((product, index)=>{
                    return <ProductItem key={index} name={product.name} id={product._id} price={product.price} image={product.image} />
                })
              }
            </div>
        </div>

        
    </div>
  )
}

export default Collections