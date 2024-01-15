import {useState} from "react";
import './EditNoteViewComponent.css'

const EditNoteViewComponent = ({note, setEditView, loadNotes}) => {
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const date = new Date(note.created_date)

    const updateNote = () => {
        const url = `http://localhost:8080/notesApi/updateNote?id=${note.id}`;

        const opciones = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description
            }),
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
        <div className={'edit-view-container'}>
            <div className={'edit-view'}>
                <button className={'close-edit-view'} onClick={() => setEditView(false)}>X</button>
                <p className={'note-id'}>Note Id: <span>{note.id}</span></p>
                <div className={'field-group'}>
                    <p>Note Title <span>(max 150 characters):</span></p>
                    <textarea className={'note-title-field'} value={title} maxLength={150} onChange={(event) => setTitle(event.target.value)}></textarea>
                </div>
                <div className={'field-group'}>
                    <p>Note Description <span>(max 450 characters)</span>:</p>
                    <textarea className={'note-description-field'} value={description} maxLength={450} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div className={'buttons-group'}>
                    <p>Created Date: {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</p>
                    <div className={'buttons'}>
                        <button className={'button button-cancel'} onClick={() => setEditView(false)}>Cancel</button>
                        <button className={'button button-confirm'} onClick={() => {
                            updateNote()
                            setEditView(false)
                        }}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditNoteViewComponent
