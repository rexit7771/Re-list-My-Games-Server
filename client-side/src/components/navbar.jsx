import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-sky-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
            <li>
              <Link to={"/"} className="text-sky-300 text-xl">
                Homepage
              </Link>
            </li>
            <li>
              <Link to={"/fav-games"} className="text-sky-300 text-xl">
                My Games
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to={"/"} className="btn btn-ghost text-sky-500 text-2xl">
          Re-List My Games
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-sky-500">
              <img
                alt="Tailwind CSS Navbar component"
                src="../../public/images/gamer.png"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to={"/profile"} className="text-xl text-sky-300">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={logout} className="text-xl text-red-500">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
