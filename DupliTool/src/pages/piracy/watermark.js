import "./index.css";
import { Link } from "react-router-dom";
import { useBookDetails } from "context/bookDetailsContext";
import {
  GET_BOOK_CLASS,
  GET_BOOK_COVER_PAGE,
  GET_BOOK_EDITION,
  GET_BOOK_LANGUAGE,
  GET_BOOK_NAME,
  GET_WATERMARK,
} from "reducer/bookDetailsConstant";

import { getAllBooks } from "services/booksService";
import { useEffect, useState } from "react";

export const Watermark = () => {
  const { bookDetailState, bookDetailDispatch } = useBookDetails();
  const { books } = bookDetailState;
  const [bookData, setBookData] = useState([]);

  console.log(bookDetailState.books);

  useEffect(() => {
    const updatedBookArray = books.filter(
      (book) => book.bookname === "0854 - SCIENCE"
    );
    console.log(updatedBookArray);
    setBookData(updatedBookArray[0]);
  }, []);

  const bookDataUpdate = (e) => {
    bookDetailDispatch({
      type: GET_BOOK_NAME,
      payload: e.target.value,
    });

    const updatedBookArray = books.filter(
      (book) => book.bookname === e.target.value
    );
    console.log(updatedBookArray);
    setBookData(updatedBookArray[0]);
  };

  console.log("abc" + bookDetailState.books);

  return (
    <div className="piracy-form-container">
      <div className="banner-container">
        
        <img
          className="watermark-img"
          src="https://res.cloudinary.com/debanftke/image/upload/v1661489964/ncert_bblbit.jpg"
          alt="Form-banner"
        />
      </div>
      <div className="form-content-container">
      <h1 className="font-header  " style={{marginBottom: "2rem"}}>STEP 1: WATERMARK DETECTION</h1>
        <div className="form-unit-box">
          <span className="material-icons icon right-arrow-icon">
            {" "}
            double_arrow{" "}
          </span>
          <label className="form-label font-sm watermark-label">Is Watermark Present</label>
          <select className="font-sm" onClick={(e) => bookDetailDispatch({type:GET_WATERMARK, payload: e.target.value})}>
          <option value="">-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-btn">
          <Link to="/length-width-detection">
            <button
              className="hero-btn"
              // onClick={() =>
              //   bookDetailDispatch({
              //     type: GET_BOOK_COVER_PAGE,
              //     payload: bookData?.coverpage,
              //   })
              // }
            >
              Next{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
