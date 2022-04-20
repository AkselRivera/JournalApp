import { types } from "../../types/types";


describe('Pruebas al objecto types', () => {
  test('Debe ser igual al objeto', () => {
    
    expect(types).toEqual({
        login:'[Auth] Login',
        logout: '[Auth] Logout', 
    
    
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
    
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        notesAddNew: '[Notes] new note',
        notesActive: '[Notes] Set active notes',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Update notes',
        notesFileUrl: '[Notes] Update image url',
        notesDeleted: '[Notes] Delete notes',
        notesLogoutCleaning: '[Notes] Logout Cleaning'
    });
    
  });
  
});
