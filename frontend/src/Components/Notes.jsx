import { React, useContext, useEffect, useRef, useState } from 'react'
import notesContext from '../Context/notecontext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

  const context = useContext(notesContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: " ", etitle: "", edescription: "", etag: "" })

  const ref = useRef(null)
  const Closeref = useRef(null)

  const updateNote = (currentNote) => {

    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

  }



  const handelAdd = (e) => {

    editNote(note.id, note.etitle, note.edescription, note.etag)
    Closeref.current.click();
    

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }


  return (
    <>

      <AddNote />



      <button ref={ref} type="button" className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body my-1">
              <form>
                <div className="form-group my-1">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control my-1" id="etitle" name="etitle" placeholder="Enter your title " value={note.etitle} onChange={onChange} minLength={5} required />

                </div>
                <div className="form-group my-1">
                  <label htmlFor="edescription">Description</label>
                  <input type="text" className="form-control my-1" id="edescription" name="edescription" placeholder="Explain your note" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group my-1">
                  <label htmlFor="etag">Tag</label>
                  <input type="text" className="form-control my-1" id="etag" name="etag" placeholder="" value={note.etag} onChange={onChange} minLength={5} required />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button ref={Closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handelAdd} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container my-3">
          {notes.length === 0 && 'Note has not been added yet!'}
        </div>
        {notes.map((note) => {
          return <NoteItem updateNote={updateNote} key={note._id} note={note} />
        })}
      </div>
    </>

  )
}

export default Notes;