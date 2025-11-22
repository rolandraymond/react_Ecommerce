import { NavLink } from "react-router-dom";


function Navbar() {
  return (
     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow">
      <NavLink to="/products" className="text-xl font-semibold tracking-wide">
        Products App
      </NavLink>

       <ul className="flex items-center gap-6">
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-medium": "text-gray-300 hover:text-white transition"} >
            Products List
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => isActive ? "text-blue-400 font-medium": "text-gray-300 hover:text-white transition"}>
         
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;