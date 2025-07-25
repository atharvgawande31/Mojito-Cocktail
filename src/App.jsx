import { ScrollTrigger, SplitText } from 'gsap/all'
import gsap from "gsap";
import Navbar from './components/Navbar';
import React from 'react'
import Hero from './components/Hero';

gsap.registerPlugin(ScrollTrigger, SplitText);


const App = () => {
  return (
    <div className='p-4 font-bold'>
      <Navbar />
      <Hero />
      <div className='h-dvh bg-black'></div>
    </div>
  )
}

export default App
