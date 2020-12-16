import Nav from '../components/Nav'
import '../global.scss'
import { useStats } from '../lib/mstats'

export default function App({ Component, pageProps }) {
    const stats = useStats()
    return (
        <>
            <div className='w-full h-screen flex flex-col bg-white text-shadow-lg'>
                <Nav />
                <div className='relative w-full box-border h-screen p-4 text-gray-600 overflow-auto  hide-scroll-bar'>
                    <Component {...stats} {...pageProps} />
                </div>
            </div>
        </>
    )
}
