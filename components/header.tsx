import Link from 'next/link';

interface HeaderProps {
    title: string;
}

function Header({title}: HeaderProps) {
    return (
        <div className='w-full h-20'>
            {/* <Navbar />  */}
        </div>
    )
}

export default Header
  