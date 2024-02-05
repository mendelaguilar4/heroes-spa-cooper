import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


describe('Pruebas en <SearchPage/>', () => {

    test('Debe mostrarse correctamente con valores por defecto.', () => {

        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );

        // screen.debug();

        expect(container).toMatchSnapshot();

    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');
        
        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

        // const alert = screen.getByLabelText('alert-danger');
        // expect( alert.style.display ).toBe('none');
        
    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        // const alert = screen.getByLabelText('alert-danger');
        // expect( alert.style.display ).toBe('');
        

    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        
        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: inputValue }})
        
        
        // const form = screen.getByRole('form');
        // fireEvent.submit( form );
        
        // expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`)

    });

});