/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'

import { type } from '@testing-library/user-event/dist/type';
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState= {};

let store= mockStore( initState );


describe('Pruebas a auth', () => {
  
    beforeEach(()=>{
        store= mockStore( initState );
    });


    test('Deben de crear un objeto', () => {
        const state={
            type: types.login,
            payload:{
                uid:'1234',
                displayName:'atsel'
            }
        }
        expect(login('1234','atsel')).toEqual(state);
        expect(logout()).toEqual({ type:types.logout })
    });

    test('Debe de ejecutar starLogout',async () => {
    
        await store.dispatch(startLogout());
        const actions=store.getActions();

        expect(actions[0]).toEqual({
            type:types.logout
        });

        expect(actions[1]).toEqual({
            type:types.notesLogoutCleaning
        })

    });

    test('Debe iniciar el startLoginWithEmail', async() => {
      await store.dispatch(startLoginEmailPassword('test@testing.com','123456'));
      const actions= store.getActions();

    expect(actions[0]).toEqual({ type:types.uiStartLoading})

    });
    
    
    
    
    
});
