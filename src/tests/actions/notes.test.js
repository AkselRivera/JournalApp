/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { saveNote, startLoadingNotes, startNewNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

import * as fs from 'fs';
 
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState= {
    auth:{
        uid:'testing'
    },

    notes:{
        active:{
            id:'PqOfG8IudD7ZDBuwXlWs',
            title:'Hola',
            body:''
        }
    }
}

let store= mockStore( initState );

describe('Pruebas a notes,js', () => {

    beforeEach(()=>{
        store= mockStore( initState );
    });

  test('Debe de crear una nota startNewNote', async() => {
    await store.dispatch(startNewNote());

    const actions= store.getActions();

    expect(actions[0]).toEqual({
        type:types.notesActive,
        payload:{
            id:expect.any(String),
            title:'',
            body:'',
            date:expect.any(Number)
        }
    });

    expect(actions[1]).toEqual({
        type:types.notesAddNew,
        payload:{
            id:expect.any(String),
            title:'',
            body:'',
            date:expect.any(Number)
        }
    })
    
    const docId= actions[0].payload.id;
    await db.doc(`/testing/journal/notes/${docId}`).delete();

  });


  test('Debe cargar las notas', async() => {
    
    await store.dispatch(startLoadingNotes('testing'));

    const actions= store.getActions();

    expect(actions[0]).toEqual({
        type:types.notesLoad,
        payload: expect.any(Array)
    });

  });

  test('Debe actualizar la nota',async () => {
    
    const note={
        id:'PqOfG8IudD7ZDBuwXlWs',
        title:'Holis',
        body:''
    }

    await store.dispatch(saveNote(note));
    const actions= store.getActions();

    expect (actions[0].type).toBe(types.notesUpdated);

    const docRef= await db.doc(`/testing/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);

  });


  test('startUploading debe de actualizar la url del entry', async () => {
    fileUpload.mockReturnValue('https://hola-mundo.com')
    fs.writeFileSync('foto.jpg', '')
    const file = fs.readFileSync('foto.jpg')
    await store.dispatch(startUploading(file));

    const docRef = await db.doc(`/testing/journal/notes/PqOfG8IudD7ZDBuwXlWs`).get()
    expect(docRef.data().url).toBe('https://hola-mundo.com')
   })



});
