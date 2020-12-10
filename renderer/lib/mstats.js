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
    const [system, dispatch] = useReducer(reducer, null)

    useEffect(() => console.log(system), [system])

    useEffect(() => {
        si.getAllData()
            .then((data) => {
                console.log(data)
                dispatch({ type: 'add', payload: data })
            })
            .catch((error) => console.error(error))

        // setInterval(() => {
        //     si.mem().then((mem) => {
        //         dispatch({ type: 'add', payload: { mem: mem } })
        //     })
        // }, 3000)
    }, [])

    return system
}
