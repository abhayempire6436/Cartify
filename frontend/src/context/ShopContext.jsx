import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setsearch] = useState("");
    const [showSearch, setshowSearch] = useState(false);
    const [cartItems, setcartItems] = useState({});
    const [products, setproducts] = useState([]);
    const [token, settoken] = useState("")
    const navigate = useNavigate();


    const addToCart = async (itemId,size) => {

        if(!size){
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setcartItems(cartData);

        if(token){
            try {
                
                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})

            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity)=>{

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setcartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }

        return totalAmount;
    }

    // useEffect(()=>{
    //     console.log(cartItems);
        
    // },[cartItems])

    const getProductData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list');
            // console.log(response.data);

            if(response.data.success){
                setproducts(response.data.products);
            }
            else{
                toast.error(response.data.message)
            }
            

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const getUserCart = async (token) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
            if(response.data.success){
                setcartItems(response.data.cartData);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductData();
    }, [])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            settoken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    },[])

    const value = {
        products, currency, delivery_fee,
        search, setsearch, showSearch, setshowSearch,
        cartItems, addToCart, setcartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        token, settoken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider