import Nav from '../components/Nav'
import '../global.scss'

export default function App({ Component, pageProps }) {
    return (
        <>
            <div className='w-full h-screen flex flex-col bg-white text-shadow-lg'>
                <Nav />
                <div className='relative w-full box-border h-screen p-4 text-gray-600 overflow-auto  hide-scroll-bar'>
                    <Component {...pageProps} />
                </div>
            </div>
        </>
    )
}
