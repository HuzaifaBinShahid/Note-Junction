import { useState } from "react";
import noteContext from "./notecontext";
const NoteState = (props) => {

  const host = 'http://localhost:5000'
  const InitialNotes = []

  const [notes, setNotes] = useState(InitialNotes)

  const getNotes = async () => {

    // API call to Add
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      


    });
    console.log(localStorage.getItem('token'))

    const json = await response.json();
   
    setNotes(json);

  }

  // Add Note

  const addNote = async (title, description, tag) => {

    // API call to Add
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))


  }


  // Delete Note
  const deleteNote = async (id) => {

    
   
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      
        

    });
   
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  //Edit Note

  const editNote = async (id, title, description, tag) => {

    // API call for fetch

 

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      body: JSON.stringify({title, description,tag}),
    });

    const json = await response.json();

    
    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     

    }
    setNotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>

  )
}

export default NoteState;