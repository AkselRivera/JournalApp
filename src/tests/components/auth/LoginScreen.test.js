import React from 'react';
import {mount} from 'enzyme';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { Provider } from 'react-redux';


/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth',()=>({
    
    startGoogleLogin:jest.fn(),
    startLoginEmailPassword:jest.fn()

}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState= {
    auth:{},
    ui:{
        loading:false,
        msgErrpr:null
    }
};

let store= mockStore( initState );
store.dispatch= jest.fn();

const wrapper = mount( 
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>    
);

describe('Pruebas a LoginScreen', () => {

    beforeEach(()=>{
        store= mockStore( initState );
        jest.clearAllMocks();
    });


    test('Debe hacer match con el snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe disparar la accion startGoogleLogin', () => {

        wrapper.find('.google-btn').simulate('click');
        expect(startGoogleLogin).toHaveBeenCalled();
    });
    
    test('Debe disparar el starLogin con sus arguementos', () => {
      
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect(startLoginEmailPassword).toHaveBeenCalledWith('aksel.rivera@softtek.com','123456');
        // startLoginEmailPassword
    });
    
});
