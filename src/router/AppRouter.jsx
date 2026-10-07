//importamos BrowserRouter, Routes, Route y Navigate de react-router para manejar las rutas de la aplicación
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { Navbar } from "../components/Navbar";
//creamos el componente AppRouter que maneja las rutas de la aplicación
export const AppRouter = () => {
//retornamos el JSX que representa las rutas de la aplicación
    return (
//usamos BrowserRouter para envolver las rutas y permitir la navegación sin recargar la página
        <BrowserRouter>
{/* Definimos las rutas de la aplicación usando Routes y Route */}
            <Routes>
                {/* Rutas Públicas (Login y Registro) */}
                <Route path="/login" element={
                    <PublicRoutes>
                        <LoginPage />
                    </PublicRoutes>
                } />
                <Route path="/register" element={
                    <PublicRoutes>
                        <RegisterPage />
                    </PublicRoutes>
                } />

                {/* Rutas Privadas (Home y Navbar) */}
                <Route path="/*" element={
                    <PrivateRoutes>
                        <div className="min-h-screen bg-slate-50">
                            {/* La Navbar solo se ve en rutas privadas */}
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                {/* Ruta para URLs inexistentes */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </div>
                    </PrivateRoutes>
                } />
            </Routes>
        </BrowserRouter>
    );
};