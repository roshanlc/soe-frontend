import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/home";
import Dashboard from "../components/dashboard";
import AuthUser from "../components/AuthUser";
import Schedule from "../components/Schedule";
import Issue from "../components/Issue";
import PostNotice from "../components/PostNotice";

function Auth() {
  const { token, logout, role } = AuthUser();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {role === "superuser" ? (
            <li className="nav-item">
              <Link className="nav-link" to="/postnotice">
                Post Notice
              </Link>
            </li>
          ) : null}

          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/schedule">
              Schedule
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/issue">
              Issues
            </Link>
          </li>

          <li className="nav-item">
            <span role="button" className="nav-link" onClick={logoutUser}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/issue" element={<Issue />} />
          <Route path="/postnotice" element={<PostNotice />} />
        </Routes>
      </div>
    </>
  );
}

export default Auth;
