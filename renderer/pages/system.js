import { useStats } from '../lib/mstats'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import prettyBytes from 'pretty-bytes'

const Index = ({ stats, dispatch }) => {
    useEffect(() => {
        const getMem = () => {
            si.mem()
                .then((mem) => {
                    console.log('mem', mem)
                    dispatch({ type: 'add', payload: { mem } })
                })
                .catch((error) => console.error(error))
        }

        getMem()
        const timer = setInterval(() => getMem(), 1000)
        return () => clearInterval(timer)
    }, [])

    if (!stats.system && !stats.mem && !stats.cpu && !stats.fsSize && !stats.osInfo) return <Loading />

    return (
        <>
            <div className='space-y-8'>
                <div className='space-y-1'>
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
                <div>
                    <div className='text-green-500 text-2xl font-bold'>Storage</div>
                    {stats?.fsSize?.map((disk, index) => {
                        // if (disk.mount.startsWith('/Volumes'))
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
                <div>
                    <div className='text-green-500 text-2xl font-bold'>Storage</div>
                    <button
                        onClick={async () => {
                            const speed = await getNetworkDownloadSpeed()
                            console.log('speed', speed)
                        }}>
                        Wifi
                    </button>
                </div>
                <div className='text-xs text-center space-y-1 font-medium text-gray-400'>
                    <p className='text-lg font-light'>
                        {stats?.osInfo?.distro} {stats?.osInfo?.release}
                    </p>
                    <p className='font-bold'>{stats.osInfo.hostname}</p>
                    <p>Serial: {stats?.system?.serial}</p>
                    <p>UUID: {stats?.system?.uuid}</p>
                    <p>Model: {stats?.system?.model}</p>
                    <p>CPU: {stats?.cpu?.manufacturer}</p>
                </div>
            </div>
        </>
    )
}

export default Index
