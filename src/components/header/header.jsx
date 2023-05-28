import Image from 'next/image'
import Link from 'next/link'
import './header.css'

import logo from './logo.png'

export function Header(){
    return (
        <header className="header"> 
            <div className="header__container">
                <Image src={logo} alt="logo" />
                <nav className="header__nav">
                    <Link className="header__link" href="/">Characters </Link>
                    <Link className="header__link" href="/episode">Episode </Link>
                </nav>
            </div>
        </header>
    )
}