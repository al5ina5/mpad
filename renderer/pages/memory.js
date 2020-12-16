import { useStats } from '../lib/mstats'
import prettyBytes from 'pretty-bytes'
import { useEffect } from 'react'
import Loading from '../components/Loading'

const MemoryPage = ({ stats }) => {
    if (!stats.mem) return <Loading />
    return (
        <>
            <div className='space-y-2'>
                <div className='text-blue-500 text-2xl font-bold'>RAM</div>
                <div className='flex text-xs font-medium'>
                    <p>{prettyBytes(stats.mem?.free || 0)} free</p>
                    <div className='ml-auto'></div>
                    <p>{prettyBytes(stats.mem?.total || 0)} total</p>
                </div>

                <div className='block h-6 rounded bg-purple-200 overflow-hidden'>
                    <div
                        style={{ width: `${(stats.mem?.free / stats.mem?.total) * 100}%` }}
                        className='block h-full bg-purple-400'></div>
                </div>
            </div>
        </>
    )
}

export default MemoryPage
