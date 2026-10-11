
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

 const links = [
  { name: "Home", path: "/home" },
  { name: "Scholarships", path: "/scholarship" },
  { name: "Student Profile", path: "/profile" },
  { name: "AI Assistant", path: "/assistant" },
];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("scholarshipEmail");

    setMenuOpen(false);
    navigate("/register", { replace: true });
  };

  const linkStyle = ({ isActive }) =>
    `block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-teal-300/10 text-teal-300"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  const logoutStyle =
    "rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-400/20";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
       
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-300 to-cyan-400 text-xl font-black text-[#07111f] shadow-lg shadow-teal-500/10">
            S
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              Scholarship<span className="text-teal-300">Match</span>
            </h1>

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              AI · Pakistan
            </p>
          </div>
        </Link>

    
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className={`ml-2 ${logoutStyle}`}
          >
            Logout
          </button>
        </div>

        
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white transition hover:border-teal-300/40 hover:bg-white/5 lg:hidden"
        >
          {menuOpen ? (
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

     
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0b1727] px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={linkStyle}
              >
                {link.name}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className={`mt-2 w-full text-left ${logoutStyle}`}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
