'use client'

import Link from 'next/link'

const Navbar = () => {
    return (
        <nav>
            <div>
                <Link href="#">
                    트립플레이
                </Link>
                <div>
                    <Link href="#">
                        관광지
                    </Link>
                    <Link href="#">
                        축제/공연/행사
                    </Link>
                    <Link href="#">
                        여행코스
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar