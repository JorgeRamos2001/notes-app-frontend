import {useState, useEffect} from "react";
import './Dashboard.css'
import NotesListComponent from "../../Components/NotesList/NotesListComponent.jsx";
import EditNoteViewComponent from "../../Components/EditNoteView/EditNoteViewComponent.jsx";
import CreateNoteViewComponent from "../../Components/CreateNoteView/CreateNoteViewComponent.jsx";
const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editView, setEditView] = useState(false);
    const [createView, setCreateView] = useState(false);

    const loadNotes = () => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/notesApi/getAllNotes');
                const data = await response.json();
                setNotes(data)
            } catch (error) {
                console.error('Error al obtener datos de la API', error);
            }
        };

        fetchData();
    }

    useEffect(() => {
        loadNotes()
    }, []);


    return (
        <>
            <div className={'dashboard'}>
                <h1 className={'dashboard-title'}>NOTES APP</h1>
                <button className={'dashboard-add-button'} onClick={() => setCreateView(true)}>Add Note</button>
                <NotesListComponent notes={notes} setEditView={setEditView} setSelectedNote={setSelectedNote} loadNotes={loadNotes}/>
            </div>
            {editView && <EditNoteViewComponent note={selectedNote} setEditView={setEditView} loadNotes={loadNotes}/>}
            {createView && <CreateNoteViewComponent setCreateView={setCreateView} loadNotes={loadNotes}/>}
        </>
    )
}
export default Dashboard
