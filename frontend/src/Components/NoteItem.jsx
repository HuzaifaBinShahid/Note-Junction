import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import noteContext from '../Context/notecontext';


const NoteItem = (props) => {


    const context  = useContext(noteContext)
    const {deleteNote} = context;

    const { note , updateNote } = props;

    


    return (
        <div className="col-md-3">

            <div className="card " >

                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>

                    <FontAwesomeIcon onClick={()=>{deleteNote(note._id)}} icon={faTrash}  style={{marginRight: '1rem' , cursor: 'pointer'}}/>
                    <FontAwesomeIcon onClick = {()=>{updateNote(note)}} icon={faPenToSquare} style={{marginRight: '1rem' , cursor: 'pointer'}}/>



                </div>
            </div>
        </div>
    )
}

export default NoteItem