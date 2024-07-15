import React from 'react'
import Ar from "../assets/Ar.svg"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='text-white flex justify-around items-center pt-32'>
        
        <div className='mb-16 '>
            <h1 className='font-semibold text-6xl'>View and Create<br></br><span className='font-thin text-sky-400'>Soul Bound Tokens </span>(SBT)</h1>
            <p className='pt-8 text-xl font-thin'> SBTs are used for proving ownership,<br></br> as in the case of a certificate issued by a University.</p>
            <Link to="/all-nft" as={Link}>
            <button type="button" class="text-white mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Explore All</button>
            </Link>
        </div>
        <div className=''>
           <img src={Ar} alt="" className='h-[490px]' />
        </div>
    </div>
  )
}

export default Home