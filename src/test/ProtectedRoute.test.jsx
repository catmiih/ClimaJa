import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import * as authService from "../services/authService";

function DummyPage() {
  return <div>Conteúdo protegido</div>;
}

test("ProtectedRoute: redireciona para /login se não há usuário", () => {
  jest.spyOn(authService, "currentUser").mockReturnValue(null);

  render(
    <MemoryRouter initialEntries={["/detalhes/2025-09-04"]}>
      <Routes>
        <Route
          path="/detalhes/:date"
          element={
            <ProtectedRoute>
              <DummyPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Página de Login</div>} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Página de Login/i)).toBeInTheDocument();
});

test("ProtectedRoute: renderiza conteúdo quando usuário está logado", () => {
  jest.spyOn(authService, "currentUser").mockReturnValue({ uid: "123" });

  render(
    <MemoryRouter initialEntries={["/detalhes/2025-09-04"]}>
      <Routes>
        <Route
          path="/detalhes/:date"
          element={
            <ProtectedRoute>
              <DummyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Conteúdo protegido/i)).toBeInTheDocument();
});
