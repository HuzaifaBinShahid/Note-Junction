import {React  ,useContext , useState} from 'react'
import noteContext from '../Context/notecontext'


const AddNote = (props) => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note  , setNote] = useState({title: "" , description: "" , tag: ""})

    const handelAdd = (e)=>{
        e.preventDefault();
        addNote(note.title , note.description , note.tag)
        setNote({title: "" , description: "" , tag: ""})
        props.showAlert("Added a new Note" , "success")
    }

    const onChange = (e)=>{
        setNote({...note , [e.target.name]: e.target.value})

    }


    return (
        <>
            <h1>Add a note</h1>
            <form>
                <div className="form-group my-4">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control my-1" id="title" name="title"  placeholder="Enter your title " value = {note.title} onChange = {onChange} minLength={5} required/>
                   
                </div>
                <div className="form-group my-4">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control my-1" id="description" name="description" placeholder="Explain your note"  value = {note.description}onChange = {onChange} minLength={5} required/>
                </div>
                <div className="form-group my-4">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control my-1" id="tag" name="tag" placeholder="" value = {note.tag} onChange = {onChange} minLength={5} required/>
                </div>
               
                <button disabled = {note.title.length < 5 || note.description.length < 5} onClick = {handelAdd} type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </>
    )
}

export default AddNote