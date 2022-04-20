import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas a authReducer', () => {
  
    test('Debe de retornar un objeto con valores', () => {
    
        const action= {type:types.login, payload: { uid:1, displayName:'aksel'}}
        const resp= authReducer({}, action);

        expect(resp).toEqual({ uid:1, name:'aksel'});

    });

    test('Debe retornar un objeto vacio', () => {
        const action= {type:types.logout, payload: { uid:1, displayName:'aksel'}}
        const resp= authReducer({uid:1, displayName:'aksel'}, action);

        expect(resp).toEqual({});
    });
    
    test('Debe regresasr el estado incial', () => {
        const action= {type:'Provocar default', payload: {}}
        const resp= authReducer({uid:1, displayName:'aksel'}, action);

        expect(resp).toEqual({uid:1, displayName:'aksel'});
    });
    
    
});
