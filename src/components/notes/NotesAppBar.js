import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector( state => state.notes );

    const handleSave= ()=>{
        dispatch(saveNote(active));
    }

    const handlePicture =()=>{
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange=(e)=>{
        const file= e.target.files[0];

        if( file){
            dispatch(startUploading(file))
        }
    }

  return (
  <div className='notes__appbar'>
      <span>01 de abril 2020</span>

        <input 
            id='fileSelector'
            type='file'
            style={{display:'none'}}
            onChange={handleFileChange}
        />

      <div>
          <button className='btn'
                    onClick={handlePicture}>
                Picture
          </button>
          <button className='btn'
                    onClick={handleSave}>
              Save
          </button>
      </div>
  </div>);
};
