import Link from 'next/link'
import { useRouter } from 'next/router'

export function NavLink({ children, href, color = 'red' }) {
    const router = useRouter()

    return (
        <>
            <Link href={href}>
                <a
                    className={`${
                        router?.asPath === href ? 'opacity-100' : 'opacity-50'
                    } text-${color}-500 font-medium  hover:text-${color}-600 cursor-pointer`}>
                    {children}
                </a>
            </Link>
        </>
    )
}

export default function Nav() {
    return (
        <>
            <div className='w-full flex items-center px-4 py-2 text-xs border-b space-x-2'>
                <NavLink href='/' color='green'>
                    Clipboards
                </NavLink>
                <NavLink href='/notes' color='pink'>
                    Notes
                </NavLink>
                {/* <NavLink href='/system' color='purple'>
                    System
                </NavLink> */}
                {/* <NavLink href='/memory' color='blue'>
                    Memory
                </NavLink>
                <NavLink href='/storage' color='red'>
                    Storage
                </NavLink>
                <NavLink href='/settings' color='blue'>
                    Settings
                </NavLink> */}
            </div>
        </>
    )
}
