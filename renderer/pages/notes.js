import { useState, useEffect } from 'react'

const { db } = global

const NotesPage = ({ stats }) => {
    const [notes, setNotes] = useState(db?.get('notes')?.value())

    return (
        <>
            <textarea
                style={{ resize: 'none' }}
                value={notes}
                onChange={(e) => {
                    setNotes(e.target.value)
                    db.set('notes', e.target.value).write()
                }}
                className='text-xs font-mono w-full h-full outline-none'
                placeholder='Jot down some notes...'
                autoFocus
            />
        </>
    )
}

export default NotesPage
