import "./PageNotFound.css";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="wishlist-empty-box flex-center">
      <div className="wishlist-empty-box">
        <img className="not-found-img " src="https://res.cloudinary.com/debanftke/image/upload/v1655548358/undraw_Page_not_found_re_e9o6_nk4v7p.png" alt="404 Not Found" />
      </div>
      <div>
        <h2 className="wishlist-title lg-font">
          We couldn't find any matches!
        </h2>
        {/* <div className="btn-container"> */}
          <Link to="/">
            <button className="btn hero-btn md-font not-found-btn">Go back to Home</button>
          </Link>
        {/* </div> */}
      </div>
    </div>
  );
};
