const { render, screen } = require("@testing-library/react");
const { MemoryRouter, Routes, Route } = require("react-router-dom");

const { PublicRoute } = require("../../src/router/PublicRoute");
const { AuthContext } = require("../../src/auth");



describe('Pruebas en el <PublicRoute/>.', () => {

    test('Si no está autenticado, debe estar en children.', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Pública')).toBeTruthy();

    });

    test('Debe de navegar si está autenticado.', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Mendel', 
                id: '123',
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="/login" element={
                            <PublicRoute>
                                <h1>Ruta Pública</h1>
                            </PublicRoute>
                        } />
                        <Route path="/marvel" element={<h1>Página de Marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Página de Marvel')).toBeTruthy();

    });

})