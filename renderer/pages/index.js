import { useStats } from '../lib/mstats'
import prettyBytes from 'pretty-bytes'
import { useEffect } from 'react'

const Index = () => {
    const data = useStats()

    useEffect(() => console.log('data', data), data)

    if (!data) return 'loading...'
    return (
        <>
            <div className='w-full h-screen flex flex-col backdrop-blur bg-opacity-25 text-shadow-lg'>
                <div className='w-full flex items-center px-4 py-2 text-xs font-medium border-b space-x-2'>
                    <a className='text-green-500 cursor-pointer'>CPU</a>
                    <a className='text-blue-500 cursor-pointer'>RAM</a>
                    <a className='text-purple-500 cursor-pointer'>System</a>
                    <a className='text-red-500 cursor-pointer'>Storage</a>
                </div>
                <div className='w-full box-border h-screen p-4 text-gray-600 space-y-4 overflow-scroll  hide-scroll-bar'>
                    <div>
                        <div className='text-purple-600 text-2xl font-bold'>System</div>
                        <p>{data.system.manufacturer}</p>
                        <p>{data.system.model}</p>
                        <p>{data.system.serial}</p>
                        <p>{data.system.uuid}</p>
                    </div>

                    <div>
                        <div className='text-red-500 text-2xl font-bold'>Storage</div>
                        {data.fsSize.map((disk, index) => {
                            if (disk.mount.startsWith('/Volumes'))
                                return (
                                    <>
                                        <p className='flex items-center'>
                                            <span>{disk.mount}</span>
                                            <div className='ml-auto' />
                                            <span className='text-xs font-medium'>
                                                {prettyBytes(disk.size - disk.used || 0)} /{' '}
                                                {prettyBytes(disk.size || 0)}
                                            </span>
                                        </p>
                                    </>
                                )
                        })}
                    </div>

                    {/* const total = parseInt(person.archived) + parseInt(person.done)

                            const percentageArchived = (person.archived / total) * 100
                            const percentageDone = (person.done / total) * 100 */}

                    <div>
                        <div className='text-blue-500 text-2xl font-bold'>RAM</div>
                        {/* <div>
                            <p>{prettyBytes(data.mem.total)}</p>
                            <p>{prettyBytes(data.mem.free)}</p>
                        </div> */}
                        <div className='block h-8 rounded-lg overflow-hidden shadow'>
                            <div
                                style={{ width: `${(data.mem?.free / data.mem?.total) * 100}%` }}
                                className='block h-full bg-purple-400'>
                                {' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
