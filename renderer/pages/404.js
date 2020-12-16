import { useEffect, useState } from 'react'
import Icon from 'react-hero-icon'
import Typed from 'react-typed'

export default function Page404() {
    return (
        <>
            <div className='w-full h-full flex bg-white text-shadow-lg'>
                <div className='m-auto text-center'>
                    <p className='animate-spin'>
                        <Icon icon='question-mark-circle' type='solid' />
                    </p>
                </div>
            </div>

            <div className='w-full text-xs opacity-50 font-medium pb-8 text-center  absolute bottom-0 left-0'>
                <p>Oops! An error occurred.</p>
            </div>
        </>
    )
}
