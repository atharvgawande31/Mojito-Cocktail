import { ScrollTrigger, SplitText } from 'gsap/all'
import gsap from "gsap";


import React from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText);


const App = () => {
  return (
    <div className='p-4 font-bold noisy w-full h-full'>
      App
    </div>
  )
}

export default App
