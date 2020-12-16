const { db } = global
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import shortid from 'shortid'

const Clip = ({ content }) => {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        if (showBanner) setTimeout(() => setShowBanner(false), 1000)
    }, [showBanner])

    if (!content) return <></>
    return (
        <div
            // onClick={() => console.log('123')}
            className={`${
                showBanner ? 'bg-gray-200' : 'bg-gray-100'
            } relative font-mono text-xs max-h-16 overflow-auto transition ease-in-out duration-150 hover:bg-gray-200 px-3 py-2 rounded`}>
            {content}
        </div>
    )
}

const ClipboardPage = ({ stats }) => {
    const loadClipboards = db?.get('clipboards').sortBy('date').reverse().take(100).value()
    const [clipboards, setClipboards] = useState(loadClipboards)

    useEffect(() => {
        const handler = (e) => {
            console.log('Detected copy event.')
            console.log(e)

            console.log(clipboards)

            setClipboards([e.detail, ...clipboards])
        }

        window.addEventListener('copy', handler)
        return () => window.removeEventListener('copy', handler)
    }, [clipboards])

    return (
        <>
            <div className='space-y-2'>
                {clipboards?.map((clip, index) => {
                    return (
                        <CopyToClipboard key={clip.id} text={clip.content}>
                            <button onClick={(e) => e.stopPropagation()} className='outline-none w-full text-left'>
                                <Clip content={clip.content} />
                            </button>
                        </CopyToClipboard>
                    )
                })}
            </div>
        </>
    )
}

export default ClipboardPage
