import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./auth/ProtectedRoute";

import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Sobre from "./pages/Sobre";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Favoritos from "./pages/Favoritos";
import FavoritoForm from "./pages/FavoritoForm";
import FavoritoDetalhe from "./pages/FavoritoDetalhe";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                forecast={forecast}
                setForecast={setForecast}
                city={city}
                setCity={setCity}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sobre"
          element={
            <ProtectedRoute>
              <Sobre />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detalhes/:date"
          element={
            <ProtectedRoute>
              <Detalhes forecast={forecast} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favoritos"
          element={
            <ProtectedRoute>
              <Favoritos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favoritos/novo"
          element={
            <ProtectedRoute>
              <FavoritoForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favoritos/:id"
          element={
            <ProtectedRoute>
              <FavoritoDetalhe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favoritos/:id/editar"
          element={
            <ProtectedRoute>
              <FavoritoForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
