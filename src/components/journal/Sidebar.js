import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {

  const dispatch = useDispatch();
  const {name} = useSelector( state => state.auth );

  const handleLogout=()=>{
    dispatch(startLogout());
  };

  const handleAddNew = ()=>{
    dispatch( startNewNote() );
  };

  return (
  <aside className='journal__sidebar animate__animated animate__fadeInLeft'>
      <div className='journal__sidebar-navbar animate__animated animate__fadeInLeft'>
        <h3 className='mt-5'>
            <i className="far fa-moon"></i>
            <span> {name}</span>
        </h3>

        <button className='btn mt-4' onClick={handleLogout}>Log out</button>
      </div>

      <div className='journal__new-entry animate__animated animate__fadeInLeft'
            onClick={handleAddNew}
      >
          <i className='far fa-calendar-plus fa-4x'></i>
          <p className='mt-5'> New entry</p>
      </div>


      <JournalEntries/>
  </aside>);
};
