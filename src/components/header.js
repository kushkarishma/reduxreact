import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, LogIn } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../reduxfeatures/loginslice/authReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg shadow sticky-top custom-header">
      <div className="container-fluid">

        {/* ✅ Left Side - Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          MyShop
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Right Side - Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3 ms-auto">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/adminpage">
                admin
              </Link>
            </li>

            <li className="nav-item position-relative">
              <Link className="nav-link" to="/addtocart">
                <ShoppingCart size={22} />
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-0 translate-middle">
                  4
                </span>
              </Link>
            </li>

            <li className="nav-item">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-dark btn-sm d-flex align-items-center"
                >
                  <LogOut size={16} className="me-1" /> Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline-dark btn-sm d-flex align-items-center"
                >
                  <LogIn size={16} className="me-1" /> Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
