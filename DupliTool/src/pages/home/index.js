import "./home.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllBooks } from "services/booksService";
import { useBookDetails } from "context/bookDetailsContext";
import { GET_ALL_BOOKS } from "reducer/bookDetailsConstant";

export const Home = () => {
  const { bookDetailDispatch } = useBookDetails();

  useEffect(() => {
    (async () => {
      const res = await getAllBooks();
      bookDetailDispatch({ type: GET_ALL_BOOKS, payload: res });
      console.log(res)
    })();
  }, []);

  return (
    <div>
      {/* <div style={{textAlign: "right", fontSize: "1rem", marginRight: "1rem"}}>
      <a href="https://ncert.nic.in/pdf/publication/informationtocustomers/blacklisted_agents.pdf" target="_blank">
            <button className="btn outline-primary" style={{fontSize: "1.5rem"}}>Blacklisted Vendors</button>
          </a>
          <a href="https://ncert.nic.in/pdf/publication/informationtocustomers/NameofwholesaleAgentsnew.pdf" target="_blank">
            <button className="btn outline-primary" style={{marginLeft:"3rem", fontSize: "1.5rem"}}>Authorised Vendors</button>
          </a>
      </div> */}
    <div className="hero-container">
      <div className="content">
        <h1 className="title">
          Check How Much Authentic Is Your NCERT Book with DupliTool
        </h1>
        <p className="sub-title">
          DupiTool is the devtool which checks the authencity of the book with
          the help of piracy and plagarism tools.
        </p>

        <div className="">
          <Link to="/book-details">
            <button className="btn get-started-btn">Check Piracy</button>
          </Link>
          
        </div>
        {/* <div style={{textAlign: "center", fontSize: "1rem", marginRight: "1rem"}}>
      <a href="https://ncert.nic.in/pdf/publication/informationtocustomers/blacklisted_agents.pdf" target="_blank">
            <button className="btn outline-primary" style={{fontSize: "1.5rem"}}>Blacklisted Vendors</button>
          </a>
          <a href="https://ncert.nic.in/pdf/publication/informationtocustomers/NameofwholesaleAgentsnew.pdf">
            <button className="btn outline-primary" style={{marginLeft:"3rem", fontSize: "1.5rem"}}>Authorised Vendors</button>
          </a>
      </div> */}
      </div>

      <div className="hero-img">
        <img
          className="responsive-image"
          src="https://res.cloudinary.com/debanftke/image/upload/v1657799390/118_dpyfkz.png"
          alt=""
        />
      </div>
</div>
      
    </div>
  );
};
