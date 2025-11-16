import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import Component from "./pages/Component";
import Todos from "./pages/Todos";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";  

import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* LOGIN ไม่ต้อง protect */}
          <Route path="/login" element={<Login />} />

          {/* ทุกหน้าในระบบต้องล็อกอินก่อน */}
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
            <Route path="product" element={<Product />} />
            <Route path="todos" element={<Todos />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
