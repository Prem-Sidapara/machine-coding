import React, {useState} from 'react';
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import getVideoId from 'get-video-id';
import { ToastContainer, toast } from 'react-toastify';

const App=()=> {
  const urlModel = [
    {
      width: 1280,
      height: 720,
      url: 'https://img.youtube.com/vi',
      filename: 'maxresdefault.jpg'
    },
    {
      width: 684,
      height: 480,
      url: 'https://img.youtube.com/vi',
      filename: 'sddefault.jpg'
    },
    {
      width: 480,
      height: 360,
      url: 'https://img.youtube.com/vi',
      filename: 'hqdefault.jpg'
    },
    
    {
      width: 320,
      height: 180,
      url: 'https://img.youtube.com/vi',
      filename: 'mqdefault.jpg'
    },
    {
      width: 120,
      height: 90,
      url: 'https://img.youtube.com/vi',
      filename: 'default.jpg'
    }
  ]
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState([]);

  const fetchThumbnail=(e)=>{ 
    e.preventDefault();
    const videoId = getVideoId(url);
    console.log(videoId);
    if(videoId.id)
    {
      const model = urlModel.map((item)=>({
        ...item,
        url: `${item.url}/${videoId.id}/${item.filename}`
      }))
      setThumbnails(model);
      console.log(model);
      
      toast.success('Thumbnails fetched successfully!')
    }
    else
    {
      toast.error('Invalid Youtube URL')
    }
  }
  return (
    <div className="min-h-screen relative py-8 bg-[linear-gradient(233deg,_#a1c4fd,_#c2e9fb,_hsl(273.5,_67.68610660297105%,_54.239516802698304%))]">
      <div className='max-w-md mx-auto bg-[linear-gradient(53deg,_#a1c4fd,_#c2e9fb,_hsl(273.5,_67.68610660297105%,_54.239516802698304%))]  rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-bold mb-4'>Youtube Thumbnail Downloader</h1>
        <form action="" className='animate__animated animate__fadeIn' onSubmit={fetchThumbnail}> 
          <div className='flex flex-col'>
            <input type="url" name="" id="" 
              placeholder='Enter Youtube Video URL'
              className='border border-black-900 focus:outline-none rounded-lg p-2 w-full mb-4'
              onChange={(e)=>setUrl(e.target.value)}
              />
            <button className='flex items-center bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 hover:cursor-pointer transition-colors duration-300'>
              <i className='ri-download-line mr-2'></i>
              <span >Download Thumbnail</span>
            </button>
          </div>
        </form>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8'>

        {
          thumbnails.map((item, index)=>(
                <div className='bg-black relative rounded-lg rounded-b-3xl shadow-md flex flex-col items-center'> 
                  <img src={item.url} alt={`Thumbnail ${index}`} className='mb-4  w-full object-cover  rounded-lg'/>
                  <a  href={item.url} target='_blank' download className='bg-green-500 w-full absolute bottom-0 text-white rounded-b-3xl px-4 py-2 flex items-center justify-center shadow-lg hover:bg-green-600'>
                    <i className='ri-download-line mr-2'></i>
                    <span onClick={(e) => {}}>Download {item.width}x{item.height}</span>
                  </a>
                </div>

          ))
        }

      </div>

      <div className='bottom-0 w-full absolute'>
        <p className='text-center text-gray-400 mt-4'>Made by Prem Sidapara</p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    </div>
  );
}

export default App;