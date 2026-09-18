import React, { useState } from 'react';
import {LockKeyhole, KeyRound, Copy} from 'lucide-react';
import {ToastContainer, toast} from 'react-toastify';
const App=()=> {
  const pattern = '%TZ;]Xqj}KR>Fd31m|:6OaH5nL@uIYh[2v_&yQ(4o.?g7B8wbS=#r<s0Ul+Jkexfp!*D$VC9)N,MtW{AzPEG^i-c"'
  
  const [password, setPassword] = useState('');

  const generatePassword = (e) =>{
    e.preventDefault();
    let p = ''
    const len = e.target[0].value
    const patternLength = pattern.length-1
    for(let i=0; i< len; i++)
      {
        // const randomIndex = Math.floor(Math.random() * patternLength)
        const random1Index = Math.floor(Math.random() * patternLength)
        const random2Index = Math.floor(Math.random() * random1Index)
        const random3Index = Math.floor(Math.random() * random2Index)
        p = p + pattern[random3Index] 
      }
      setPassword(p)
      
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    toast.success('Password Copied')
  }

  return (
    <div className="h-screen bg-[conic-gradient(from_355deg,_#30cfd0_0%_50%,_#330867_50%_100%)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-4xl p-16 w-lg rounded-lg bg-[conic-gradient(from_355deg,_#d4fc79_0%_50%,_#96e6a1_50%_100%)]  hover:scale-101 duration-400 transition-transform font-bold">
        <LockKeyhole className='text-black/100 w-12 h-12' /> 
        <h1 className='text-3xl font-bold '>Password Generator</h1>
        <form className='w-full  rounded-lg bg-transparent mt-6 p-5 flex flex-col gap-4'  onSubmit={generatePassword} >
          <input input='number' placeholder="Enter Password Length" className=" bg-white/70 text-black border-2 border-black/70 rounded-lg p-2 text-block/100 w-full focus:outline-none focus:border-black/100 focus:bg-white/100 focus:ring-1 focus:ring-black/100 text-lg font-semibold" />
          <button className=' flex items-center gap-2 bg-green-500 text-white border-1 border-black/70 rounded-lg p-2 text-white/100 w-full hover:bg-green-500 hover:border-2 hover:border-black/100 hover:text-white/100 focus:outline-none focus:ring-1 focus:ring-black/100 text-lg justify-center font-semibold '>
            <KeyRound className='text-white' />
            Generate Strong Password
          </button>
        </form>
        {
          password !== '' && 
        
        <div className='w-full bg-black/90 max-h-20 text-white border-2 border-white/70 rounded-lg p-4 text-white/100 flex justify-between items-center text-lg font-semibold mt-4'>
          <p className=' w-80 truncate'>{password}</p>
          <Copy className='text-white hover:scale-110 transition-transform duration-100' onClick={copyPassword} />
        </div>
      }       
      </div>

      <div className='absolute left-10 text-left text-white/90 text-center font-semibold'>
        <p className='text-yellow-700'>Weak Password: 0-12 Characters</p>
        <p className='text-red-500'>Very Strong Password: More than 12 Characters</p>
      </div>


      <ToastContainer />
    </div>
  );
}

export default App;