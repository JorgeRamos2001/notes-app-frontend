import './NoteComponent.css'
import EditNoteViewComponent from "../EditNoteView/EditNoteViewComponent.jsx";

const NoteComponent = ({note, setEditView, setSelectedNote, loadNotes}) => {
    const date = new Date(note.created_date)

    const deleteNote = () => {
        const url = `http://localhost:8080/notesApi/deleteNote?id=${note.id}`;

        const opciones = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(url, opciones)
            .then(response => response.json())
            .then(data => {
                setEditView(false)
                loadNotes()
            })
            .catch(error => {
                console.error('Error al realizar la solicitud PUT:', error);
            });
    }

    return (
        <div className={'note'}>
            <div>
                <p className={'note-title'}>Title:
                    <br/>
                    <span className={'note-title-span'}>{note.title}</span>
                </p>
                <p className={'note-description'}>Description:
                    <br/>
                    <span className={'note-description-span'}>{note.description}</span>
                </p>
            </div>
            <div className={'note-footer'}>
                <p className={'note-created'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar-month"
                         width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"/>
                        <path d="M16 3v4"/>
                        <path d="M8 3v4"/>
                        <path d="M4 11h16"/>
                        <path d="M7 14h.013"/>
                        <path d="M10.01 14h.005"/>
                        <path d="M13.01 14h.005"/>
                        <path d="M16.015 14h.005"/>
                        <path d="M13.015 17h.005"/>
                        <path d="M7.01 17h.005"/>
                        <path d="M10.01 17h.005"/>
                    </svg>
                    <span className={'note-created-span'}> {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</span>
                </p>
                <div>
                    <button className={'note-button note-button-edit'} onClick={() => {
                        if (note !== undefined && note !== null) {
                            setEditView(true);
                            setSelectedNote(note);
                        }
                    }}>Edit</button>
                    <button className={'note-button note-button-delete'} onClick={() => {deleteNote()}}>Delete</button>
                </div>
            </div>
        </div>
    )
}
export default NoteComponent
