import React, { useEffect, useState, useSyncExternalStore } from 'react';
import 'animate.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css'
const API_KEY = "WPT2LmEBBJYUiLZy8EA9UNccFqr4RyhH7wTcd0Ns0RJyDfIdYnSXfqnj"

const App=()=> {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("flower")

  const fetchImage = async()=>{
    try
    {
      setLoading(true )
     const options = {
      headers : {
        Authorization : API_KEY
      }
     }
     const res = await axios.get( `https://api.pexels.com/v1/search?query=${query}&page=0${page}&per_page=12`, options)
     console.log(res.data);
     setPhotos([
      ...photos,
      ...res.data.photos
     ])  
    }
    catch(err) 
    {
      toast.error("Failed to fetch images")
    }
    finally
    {
      setLoading(false)
    }
  }

  const loadMore =()=> {
     setPage(page+1)
  }

  const search =(e)=> {
    e.preventDefault()
    const q = e.target[0].value.trim()
    setPhotos([])
    setQuery(q)
    
  }

  useEffect(()=>{
    fetchImage()
  }, [page, query])
  return (
    <div className='min-h-screen flex flex-col items-center py-8 sm:gap-12 gap-4 animate__animated animate__fadeIn bg-white'>
      
        <h1 className='firstline text-4xl font-bold sm:text-5xl'> 
            📷Free stock images
        </h1>

        <h3 className='text-gray-600 sm:text-center sm:w-[50%] text-center w-[90%] tracking-wide  '>Find high-quality free stock images using the Pexels API. Perfect for frontend developers and designers to use in websites and apps.</h3>

        <form onSubmit={search} className=' sm:my-0 my-10'>
          <input className='p-3 bg-white sm:w-[400px]  shadow-lg rounded-l-lg focus:outline-none ' placeholder='Search image here... ' required/>
          <button className='text-white font-bold py-3 px-8 rounded-r-lg hover:scale-105 transition-transform bg-[linear-gradient(152deg,_#30cfd0,_#330867)]'>Search</button> 
        </form>
          {
            photos.length === 0 &&
            <h1 className='text-4xl font-bold text-center'>Search result not found</h1>
          }

        <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-12 gap-8 w-9/12 sm:w-[90%] w-[90%] '>
          {
            photos.map((item, index)=>(
              <div key={index} className='bg-white  shadow-md hover:shadow-xl/20  rounded-xl '>
                <img 
                  src={item.src.medium}
                  alt={item.alt}
                  className='rounded-t-lg h-[180px] object-cover w-full hover:scale-105 transition-transform duration-300'
                />
                <div className='p-3'>
                  <h1 className='text-sm font-medium text-gray-600 capitalize'>{item.photographer}</h1>
                  <a target='__blank' href={item.src.original} className='mt-3 block font-medium py-2 rounded-lg text-center hover:scale-105 transition-transform duration-300  bg-[linear-gradient(352deg,_#d4fc79,_#96e6a1,_hsl(117.1,_79.14354880243617%,_50.5688764156049%))]'>
                    <i className="ri-download-line mr-r"></i>
                    Download
                  </a>
                </div>
              </div>
            ))
          }

        </div>

          {
          loading && 
          <span className='flex'>
          <i className="ri-loader-4-line  text-2xl animate-spin"></i> 
          <h2 className='text-2xl'>
            loading...
          </h2>
          </span>

          }


          {
            photos.length > 0 &&
          <button onClick={loadMore} className='py-3 px-16 rounded-lg font-medium text-white bg-rose-500 hover:scale-105 transition-transform duration-300 sm:mt-0 mt-10'>
            load more
          </button>

          }
          
      <ToastContainer/>
    </div>
  );
}

export default App;

