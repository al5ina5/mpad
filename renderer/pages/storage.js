import { useStats } from '../lib/mstats'
import prettyBytes from 'pretty-bytes'
import { useEffect } from 'react'
import Loading from '../components/Loading'

const StoragePage = ({ stats }) => {
    if (!stats.fsSize) return <Loading />
    return (
        <>
            <div>
                <div className='text-green-500 text-2xl font-bold'>Storage</div>
                {stats?.fsSize?.map((disk, index) => {
                    if (disk.mount.startsWith('/Volumes'))
                        return (
                            <>
                                <p className='flex items-center'>
                                    <span>{disk.mount}</span>
                                    <div className='ml-auto' />
                                    <span className='text-xs font-medium'>
                                        {prettyBytes(disk.size - disk.used || 0)} / {prettyBytes(disk.size || 0)}
                                    </span>
                                </p>
                            </>
                        )
                })}
            </div>
        </>
    )
}

export default StoragePage
