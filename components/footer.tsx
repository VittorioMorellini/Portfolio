import React from 'react'
import Image from 'next/image'

function Footer() {
    
    return (
        <footer className="flex bg-blue-400 justify-center items-center absolute bottom-0 w-full" style={{flex: 1, height: '80px'}}>
            Powered by{' '}
            <span className="h-4 ml-2 mb-10">
                <img src='../images/logo_sixtema_footer.jpg' alt="Sixtema Logo" width={238} height={60}/>
            </span>
        </footer>
    )
}

export default Footer;