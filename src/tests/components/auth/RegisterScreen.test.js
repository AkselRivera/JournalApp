import React from 'react';
import {mount} from 'enzyme';

/**
 * @jest-environment node
 */

 import configureStore from 'redux-mock-store' //ES6 modules
 import thunk from 'redux-thunk'


 import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
 import { Provider } from 'react-redux';
 import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState= {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    }
};

let store= mockStore( initState );


const wrapper = mount( 
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen/> 
        </MemoryRouter>
    </Provider>
    );


describe('Pruebas al componente RegisterScreen', () => {
  

    test('Debe hacer match con el snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de hacer el dispatch de la accion', () => {
    
        const email=wrapper.find('input[name="email"]');

        email.simulate('change',{
            target:{
                value:'',
                name:'email'
            }
        });

        wrapper.find('form').simulate('submit',{preventDefault(){} });

        const actions= store.getActions();
        expect(actions[0]).toEqual({
            type:types.uiSetError,
            payload:'Email incorrecto'
        })
    });

    test('Debe mostrar la caja de error', () => {
    
const initState= {
    auth:{},
    ui:{
        loading:false,
        msgError:'Email incorrecto'
    }
};

const store= mockStore( initState );


const wrapper = mount( 
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen/> 
        </MemoryRouter>
    </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);

    });
    
    
});
