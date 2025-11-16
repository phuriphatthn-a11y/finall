import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../Layout";
import Home from "../../pages/Home";
import Calculator from "../../pages/Calculator";
import Animation from "../../pages/Animation";
import Component from "../../pages/Component";
import Todos from "../../pages/Todos";
import NotFound from "../../pages/NotFound";

import Loginjsx from "./pages/Loginjsx";
import ProtectedRoute from "./ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* ========== หน้า Login ========== */}
          <Route path="/login" element={<Loginjsx />} />

          {/* ========== เส้นทางที่ต้อง Login ก่อนเข้า ========== */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="animation" element={<Animation />} />
            <Route path="component" element={<Component />} />
            <Route path="todos" element={<Todos />} />
          </Route>

          {/* ========== หน้า 404 (ต้องอยู่ล่างสุด) ========== */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </QueryClientProvider>
  );
};

export default App;
