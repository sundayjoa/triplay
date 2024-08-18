"use client";

import Link from 'next/link';
import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import '../app/styles/nav.css';

const Navbar = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined' && sessionStorage.getItem('reloaded') === 'false') {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload();
        }
    }, [pathname]);

    const handleClick = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('reloaded', 'false');
        }
    };

    return (
        <nav>
            <div>
                <Link href="#" className='login-btn'>
                    로그인
                </Link>
            </div>
            <div className="nav-container">
                <Link href="/" className='project-title'>
                    트립플레이
                </Link>
                <div>
                    <Link href="#" className='tourist-attractions'>
                        관광지
                    </Link>
                    <Link 
                        href="/eventsPage"
                        className={`events-festivals ${pathname === '/eventsPage' ? 'active' : ''}`}
                        onClick={handleClick} // 클릭 시 새로고침 플래그 설정
                    >
                        축제/공연/행사
                    </Link>
                    <Link href="#" className='travel-courses'>
                        숙박
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

