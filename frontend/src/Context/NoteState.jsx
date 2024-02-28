import { useState } from "react";
import noteContext from "./notecontext";
const NoteState = (props)=>{

   const InitialNotes =  [
        {
          "_id": "65d740be2cbabcdcdfe15bdc",
          "user": "65d73eeb286104aed0e6be90",
          "title": "My Title",
          "description": "This is my first title",
          "tag": "personal",
          "date": "2024-02-22T12:40:30.433Z",
          "__v": 0
        },
        {
          "_id": "65d752ce285399ab5d3d5a24",
          "user": "65d73eeb286104aed0e6be90",
          "title": "My Title",
          "description": "This is my first title",
          "tag": "personal",
          "date": "2024-02-22T13:57:34.719Z",
          "__v": 0
        },
        {
          "_id": "65d75312285399ab5d3d5a27",
          "user": "65d73eeb286104aed0e6be90",
          "title": "My second Title ",
          "description": "This is my second title",
          "tag": "personal",
          "date": "2024-02-22T13:58:42.547Z",
          "__v": 0
        },
        {
          "_id": "65d754ac0735eb821fd6ce2a",
          "user": "65d73eeb286104aed0e6be90",
          "title": "My third Title ",
          "description": "This is my third title",
          "tag": "personal",
          "date": "2024-02-22T14:05:32.038Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(InitialNotes)
    
    return(
        <noteContext.Provider value = {{notes , setNotes}}>
            {props.children}
        </noteContext.Provider>

    )
}

export default NoteState;