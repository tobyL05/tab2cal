import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Navbar from './components/Navbar.tsx'
import { Toaster } from './components/UI/Toast/Toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="flex flex-col md:flex-row ">
      <Navbar className={"w-screen h-18 border-b-[1px] md:w-28 md:h-screen md:border-r-[1px] border-black"}/>
      <App />
      <Toaster />
    </div>
  </React.StrictMode>,
)
