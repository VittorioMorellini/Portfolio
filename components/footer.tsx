import React from 'react'
import Image from 'next/image'

function Footer() {
    
    return (
        <footer className="flex bg-gradient-to-tr from-blue-200 to-blue-600 items-center justify-center w-full" style={{flex: 1, height: '80px'}}>
            <div className="py-6 flex flex-col">
                © Vittorio Morellini {new Date().getFullYear()}
            </div>            
        </footer>
    )
}
export default Footer;