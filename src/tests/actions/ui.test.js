import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Pruebas en UI actions', () => {
  test('Todas las acciones deben crearse', () => {
    

    const action= setError('Ayodaaaa');
    expect(action).toEqual({
        type:types.uiSetError,
        payload:'Ayodaaaa'
    });

    const removeerror=removeError();
    const startloading=startLoading();
    const finishloading=finishLoading();

    expect(removeerror).toEqual({
        type:types.uiRemoveError
    });
    expect(startloading).toEqual({
        type:types.uiStartLoading
    });
    expect(finishloading).toEqual({
        type:types.uiFinishLoading
    });




  });
  
});
