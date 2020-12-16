import { useState, useEffect, useReducer } from 'react'
const { si } = global

function reducer(initialState, action) {
    let state = Object.assign({}, initialState)
    switch (action.type) {
        case 'add':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export const useStats = () => {
    const [stats, dispatch] = useReducer(reducer, {})

    useEffect(() => console.log(stats), [stats])

    useEffect(() => {
        si.mem()
            .then((mem) => {
                console.log('mem', mem)
                dispatch({ type: 'add', payload: { mem } })
            })
            .catch((error) => console.error(error))

        si.system()
            .then((system) => {
                console.log('system', system)
                dispatch({ type: 'add', payload: { system } })
            })
            .catch((error) => console.error(error))

        // setInterval(() => {
        si.fsSize()
            .then((fsSize) => {
                console.log('fsSize', fsSize)
                dispatch({ type: 'add', payload: { fsSize } })
            })
            .catch((error) => console.error(error))
        // }, 1000)
        si.cpu()
            .then((cpu) => {
                console.log('cpu', cpu)
                dispatch({ type: 'add', payload: { cpu } })
            })
            .catch((error) => console.error(error))
        si.osInfo()
            .then((osInfo) => {
                console.log('osInfo', osInfo)
                dispatch({ type: 'add', payload: { osInfo } })
            })
            .catch((error) => console.error(error))
    }, [])

    return { stats, dispatch }
}
