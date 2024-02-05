
import { authReducer, types } from "../../../src/auth";


describe('Pruebas en el authReducer.', () => {

    test('Retornando un estado por defecto.', () => {

        const state = authReducer({logged: false}, {});

        expect(state).toEqual({logged: false});

    });

    test('Debe de (login) llamar al login al autenticar y establecer el user.', () => {

        const action = {
            type: types.login,
            payload: {
                id: '123',
                name: 'Mendel Aguilar'
            }
        }

        const state = authReducer({logged: false}, action);

        expect(state).toEqual({
            logged: true,
            user: action.payload
        })

    });

    test('Debe de (logout) borrar el name del usuario y logged en false.', () => {

        const state = {
            logged: true,
            user: {id: '123', name: 'Mendel Aguilar'}
        }

        const action = {
            type: types.logout,
        }

        const newState = authReducer(state, action);

        expect(newState).toEqual({logged: false});

    });

})