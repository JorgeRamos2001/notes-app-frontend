import {useState} from "react";

const CreateNoteViewComponent = ({setCreateView, loadNotes}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emptyField, setEmptyField] = useState(false);

    const saveNote = () => {
        const url = `http://localhost:8080/notesApi/saveNote`;

        const opciones = {
            method: 'POST',
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
                setCreateView(false)
                loadNotes()
            })
            .catch(error => {
                console.error('Error al realizar la solicitud PUT:', error);
            });
    }
    return (
        <div className={'edit-view-container'}>
            <div className={'edit-view'}>
                <button className={'close-edit-view'} onClick={() => setCreateView(false)}>X</button>
                <div className={'field-group'}>
                    <p>Note Title <span>(max 150 characters):</span></p>
                    <textarea className={'note-title-field'} value={title} maxLength={150} onChange={(event) => setTitle(event.target.value)}></textarea>
                </div>
                <div className={'field-group'}>
                    <p>Note Description <span>(max 450 characters)</span>:</p>
                    <textarea className={'note-description-field'} value={description} maxLength={450} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div className={'buttons-group'}>
                    <div className={'buttons'}>
                        <button className={'button button-cancel'} onClick={() => setCreateView(false)}>Cancel</button>
                        <button className={'button button-confirm'} onClick={() => {
                            if(title.length == 0 || description.length == 0) {
                                setEmptyField(true)
                            }else {
                                saveNote()
                                setCreateView(false)
                            }
                        }}>Confirm</button>
                    </div>
                    {emptyField && <p>All fields are required</p>}
                </div>
            </div>
        </div>
    )
}
export default CreateNoteViewComponent
