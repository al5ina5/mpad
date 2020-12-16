import { useEffect, useState } from 'react'
import Icon from 'react-hero-icon'
import Typed from 'react-typed'

export default function Loading() {
    return (
        <>
            <div className='relative w-full h-screen flex flex-col bg-white text-shadow-lg'>
                <div className='m-auto text-center'>
                    <p className='animate-spin'>
                        <Icon icon='chip' />
                    </p>
                </div>
                <div className='w-full text-xs opacity-50 font-medium pb-8 text-center  absolute bottom-0'>
                    <p>
                        <Typed
                            strings={['Getting stats...', 'Detecting drives...', 'Checking temperature...']}
                            typeSpeed={40}
                            backSpeed={40}
                            loop
                        />
                    </p>
                </div>
            </div>
        </>
    )
}
