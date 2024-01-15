import './NotesListComponent.css'
import NoteComponent from "../Note/NoteComponent.jsx";

const NotesListComponent = ({notes, setEditView, setSelectedNote, loadNotes}) => {
    return (
        <div className={`notes-list ${notes.length > 2 ? 'notes-list-scroll' : ''}`}>
            {notes.length == 0
                ? <p>No notes have been created yet</p>
                : notes.map((note) => <NoteComponent note={note} setEditView={setEditView} setSelectedNote={setSelectedNote} loadNotes={loadNotes} key={note.id}/>)}
        </div>
    )
}
export default NotesListComponent
