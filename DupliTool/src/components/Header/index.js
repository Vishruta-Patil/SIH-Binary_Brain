import "./header.css";
import "./collapseNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "services/authService";

export const Header = () => {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("auth_Token");

  return (
    <div className="container">
      <div className="header-container">
        <div className="header">
          <div className="logo">
            <Link to="/" className="primary-color">
              <h2 className="main-title">
                Dupli
                <span className="secondary-color bold-main-title">T</span>ool
              </h2>
            </Link>
          </div>

          <div className="header-main-content desktop-header-icons">
            <div className="flex header-inner-container">
              <Link to="/" className="secondary-color">
                <p className="header-item">Home</p>
              </Link>
              <a href="https://youtu.be/YH3QYV97rj4" className="secondary-color" target="_blank">
                <p className="header-item primary-color">Tutorial</p>
              </a>
            </div>
          </div>

          

          <div className="flex icon-container">
          <div className="header-main-content mobile-view-header-icons">
            <div className="flex header-inner-container">
              <Link to="/" className="secondary-color">
                <span className="material-icons icon header-icons"> home </span>
              </Link>
              <p href="https://youtu.be/YH3QYV97rj4">
                <span className="material-icons icon header-icons"> dashboard </span>
              </p>
            </div>
          </div>
            {authToken ? (
              <div className="icon-unit">
                <p
                  className="flex-column flex-center secondary-color header-icon"
                  onClick={() => logout(navigate)}
                >
                  <span className="material-icons icon"> logout </span>
                  <p>Logout</p>
                </p>
              </div>
            ) : (
              <div className="icon-unit">
                <p
                  className="flex-column flex-center secondary-color header-icon"
                  onClick={() => navigate("/login")}
                >
                  <span className="material-icons icon"> login </span>
                  <p>Login</p>
                </p>
              </div>
            )}
          </div>
          {/* <span className="material-icons icon hide-menu menu-logo">
            {" "}
            menu{" "}
          </span> */}
        </div>
      </div>

      <div id="empty-box"></div>

      <nav className="collape-navbar-container hide-nav">
        <div className="header-navbar flex justify-between">
          <h2>
            magni
            <span className="secondary-color highlight-letter-header">Z</span>
            ent
          </h2>
          <button className="nav-close-btn">
            <span className="material-icons icon"> close </span>
          </button>
        </div>
        <hr className="hr-line" />
        <div className="navbar-item-container secondary-color">
          <div className="hide-mini-desktop">
            <p className="secondary-color">
              <div className="navbar-unit flex">
                <span className="material-icons nav-icon"> home </span>
                <div className="navbar-unit-title">Home</div>
              </div>
            </p>
            <p className="secondary-color">
              <div className="navbar-unit flex">
                <span className="material-icons nav-icon"> dashboard </span>
                <div className="navbar-unit-title">Dashboard</div>
              </div>
            </p>
          </div>

          <p className="secondary-color">
            <div className="navbar-unit flex">
              <span className="material-icons nav-icon"> account_circle </span>
              <div className="navbar-unit-title">Login</div>
            </div>
          </p>
          <p className="secondary-color">
            <div className="navbar-unit flex">
              <span className="material-icons nav-icon"> equalizer </span>
              <div className="navbar-unit-title">LeaderBoard</div>
            </div>
          </p>
        </div>
      </nav>
    </div>
  );
};
