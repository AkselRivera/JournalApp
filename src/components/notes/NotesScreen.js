import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NotesScreen = () => {

    const note = useSelector( state => state.notes.active);
    const [formValues,handleInputChange,reset] =useForm(note);
    const {body,title}= formValues;

    
    const dispatch = useDispatch();

    const activeId = useRef (note.id);

    useEffect(() => {

        if(note.id !== activeId.current ){
            reset(note);
            activeId.current=note.id;
        }

    }, [note,reset]);
    
    useEffect(() => {

        dispatch(activeNote(formValues.id,{...formValues}));
    }, [formValues, dispatch]);
    
    const handleDelete= ()=>{
        dispatch(startDeleting(formValues.id));
    }

  return (
  <div className='notes__main-content animate__animated animate__fadeIn'>
      <NotesAppBar/>

      <div className='notes__content '>
            <input    
                type='text'
                placeholder='Some awesome title'
                className='notes__title-input'
                name='title'
                value={title}
                onChange={handleInputChange}
            />

            <textarea    
                placeholder='What happend today?'
                className='notes__textarea'
                name='body'
                value={body}
                onChange={handleInputChange}
            />

            {   
            note.url
            && <div className='notes__image'>
                    <img
                        src={note.url}
                        alt='Lanscape'/>
                </div>
            }

            <button className='btn btn-danger mt-1'
                    onClick={handleDelete}
            >
                Delete
            </button>
      </div>
  </div>);
};
