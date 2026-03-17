import { useState } from "react";
import { Phone } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Why Us", path: "/#whyus" },
  { name: "Projects", path: "/projects" },
  { name: "Testimonials", path: "/#testimonials" }, // temporary
  { name: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const current = location.pathname + location.hash;

    const isActive = path === "/" ? location.pathname === "/" && location.hash === "" : current === path;

    return `transition-colors duration-200 ${isActive ? "text-blue-300 font-semibold" : "hover:text-blue-300"
      }`;
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-[#1e3a6d] text-white z-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <div className="w-11 h-11 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm sm:text-base lg:text-lg font-semibold">
              Pandarinath Vitthal
            </h1>
            <p className="text-[10px] sm:text-xs text-[#3999da]">
              Waterproofing Agency
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={getLinkClass(link.path)}
            >
              {link.name}
            </NavLink>
          ))}

          <a
            href="tel:+919867233817"
            className="flex items-center gap-2 bg-[#133267] hover:bg-[#29294e] px-4 lg:px-5 py-2 rounded-full text-sm transition"
          >
            <Phone size={16} />
            Call Now
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-9 h-9"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-2xl leading-none">
            {isOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#1e3a6d] px-6 pb-6 pt-4">
          <div className="flex flex-col items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={getLinkClass(link.path)
                }
              >
                {link.name}
              </NavLink>
            ))}

            <a
              href="tel:+919867233817"
              className="flex items-center gap-2 bg-[#133267] hover:bg-[#29294e] px-5 py-2 rounded-full transition"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}