import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote=()=>{
    return async(dispatch, getState)=>{

        const {uid}=getState().auth;

        const newNote={
            title:'',
            body:'',
            date: new Date().getTime()
        }

        const doc= await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(doc.id, newNote));
        dispatch( addNewNote(doc.id,newNote) )
    }
}

export const activeNote= (id,note)=>({
    type:types.notesActive,
    payload:{
        id,
        ...note
    }
})

export const addNewNote =(id, note)=>{
   return { type:types.notesAddNew,
    payload:{
        id,
        ...note
    }}
}

export const startLoadingNotes= (uid)=>{
    return async (dispatch)=>{
        const notes=await loadNotes(uid)
        dispatch(setNotes(notes));
    }
}

export const setNotes=(notes)=>({
    type:types.notesLoad,
    payload:notes
})


export const saveNote= (note)=>{
    return async (dispatch,getState)=>{

        if(!note.url){
            delete note.url
        }

        const {uid}=getState().auth;
        const noteToFireStore= {...note};

        delete noteToFireStore.id;
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);

        dispatch(refreshNote(note.id, noteToFireStore));
        Swal.fire('Saved!',note.title,'success');
    }
}

export const refreshNote=(id,note)=>({
     type:types.notesUpdated,
     payload:{
        id, 
        note:{
            id,
            ...note
        }
     }
})


export const startUploading= (file)=>{
    return async ( dispatch,getState)=>{
        const {active:activeNote}=getState().notes;

        Swal.fire({
            title:'Uploading...',
            text:'Please wait',
            allowOutsideClick:false,
            onBeforeOpen: ()=>{
                Swal.showLoading();
            }
        })

        const fileUrl= await fileUpload(file);
        activeNote.url=fileUrl;

        dispatch( saveNote( activeNote ) );
        Swal.close();

    }
}

export const startDeleting= (id) =>{
    return async(dispatch,getState)=>{
        const uid= getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));

    }
}

export const deleteNote= (id)=>{
    return {
        type:types.notesDeleted,
        payload:id
    }
}


export const logoutNotes =()=>{
        return {type:types.notesLogoutCleaning}

}
//react-journal
// https://api.cloudinary.com/v1_1/davat1eco/upload
// https://api.cloudinary.com/v1_1/:cloud_name/:action