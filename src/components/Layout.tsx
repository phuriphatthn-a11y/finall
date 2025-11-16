import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8 px-6 text-center border-b-4 border-white">
        <h1 className="text-4xl font-bold mb-2">CSI 205 - Web Programming</h1>
        <p className="text-lg opacity-90">การเขียนโปรแกรมบนเว็บ</p>
      </header>

      {/* Navbar */}
      <nav className="bg-primary border-b-4 border-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4 justify-center">

            {[
              { to: "/", label: "Home" },
              { to: "/calculator", label: "Calculator" },
              { to: "/animation", label: "Animation" },
              { to: "/component", label: "Component" },
              { to: "/product", label: "Product" },
              { to: "/todos", label: "Todos" }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-8 py-3 rounded font-semibold text-lg transition-all ${
                  isActive(item.to)
                    ? "bg-secondary text-secondary-foreground shadow-lg scale-105"
                    : "bg-secondary/90 text-secondary-foreground hover:bg-secondary hover:scale-105"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Logout */}
            <button
              onClick={() => {
                sessionStorage.removeItem("isLogin");
                window.location.href = "/login";
              }}
              className="px-8 py-3 rounded font-semibold text-lg bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-white py-10">
        <div className="container mx-auto px-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-6 border-t-4 border-white">
        <div className="container mx-auto text-center">
          <p className="mt-4 text-sm opacity-75">งานล่าสุด</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
