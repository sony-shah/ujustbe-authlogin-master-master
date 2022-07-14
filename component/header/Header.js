import React from 'react'
import Image from 'next/image'
import {BiLogOutCircle} from 'react-icons/bi'
import {IoMdLogIn} from 'react-icons/io'
import Link from 'next/link'    



const Header = () => {
    return (
        <header className="wrapper m-header">      {/* header */}
        <div className="headerLeft"> 
                   
        </div>
        <div className="headerRight">
            
            {/* <button className="profile">
                <span>Logout</span>
            </button> */}
             <div>
                <span><IoMdLogIn /></span>
                <Link href="/admin/login">
                     <a>Login</a>
                </Link>
               
           </div>
            <div>
                <span className='icon-rotate-90'><BiLogOutCircle /></span>
                Logout
           </div>
          
        </div>
     </header>
    )
}

export default Header
