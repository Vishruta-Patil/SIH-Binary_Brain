import "./index.css";
import { Link } from "react-router-dom";
import { useBookDetails } from "context/bookDetailsContext";
import {
  GET_BOOK_CLASS,
  GET_BOOK_COVER_PAGE,
  GET_BOOK_EDITION,
  GET_BOOK_LANGUAGE,
  GET_BOOK_NAME,
} from "reducer/bookDetailsConstant";

import { getAllBooks } from "services/booksService";
import { useEffect, useState } from "react";

export const BookDetails = () => {
  const { bookDetailState, bookDetailDispatch } = useBookDetails();
  const {books} = bookDetailState
  const [bookData, setBookData] = useState([])

  console.log(bookDetailState.books)

  useEffect(() => {
    const updatedBookArray = books.filter(book => book.bookname === "0854 - SCIENCE")
    console.log(updatedBookArray)
    setBookData(updatedBookArray[0])
  }, [])

  const bookDataUpdate = (e) => {
    bookDetailDispatch({
      type: GET_BOOK_NAME,
      payload: e.target.value,
    })
    
    const updatedBookArray = books.filter(book => book.bookname === e.target.value)
    console.log(updatedBookArray)
    setBookData(updatedBookArray[0])
  }

  const nextHandler = () => {
    
  }

  console.log("abc" + bookDetailState.books)

  return (
    <div className="piracy-form-container">
      <div className="banner-container">
        <img
          className="form-img"
          src="https://res.cloudinary.com/debanftke/image/upload/v1660913565/Blue_Gold_Rustic_Artisinal_Remote_Graduation_Yard_Sign_uxcj81.png"
          alt="Form-banner"
        />
      </div>
      <div className="form-content-container">
      <h1 className="font-header">ENTER THE BOOK DETAILS</h1>
        <div className="form-unit-box">
          <span className="material-icons icon right-arrow-icon">
            {" "}
            double_arrow{" "}
          </span>
          <label className="form-label">Name of book </label>
          <select
            className="font-sm"
            onChange={
              bookDataUpdate
            }
          >
            {books.map((book) => (
              <option value={book.bookname}>{book.bookname}</option>
            ))}
            
          </select>
        </div>
        <br />
        <div className="form-unit-box">
          <span className="material-icons icon right-arrow-icon">
            {" "}
            double_arrow{" "}
          </span>
          <label className="form-label">Edition of Selected Book</label>
          <select
            className="font-sm"
            onChange={(e) =>
              bookDetailDispatch({
                type: GET_BOOK_EDITION,
                payload: e.target.value,
              })
            }
          >
            {/* {bookData?.edition?.map((edition) => ( */}
              <option value={bookData?.edition}>{bookData?.edition}</option>
            {/* ))} */}
          </select>
        </div>{" "}
        <br />
        <div className="form-unit-box">
          <span className="material-icons icon right-arrow-icon">
            {" "}
            double_arrow{" "}
          </span>
          <label className="form-label">Class</label>
          <select
            className="font-sm"
            onChange={(e) =>
              bookDetailDispatch({
                type: GET_BOOK_CLASS,
                payload: e.target.value,
              })
            }
          >
            {/* {bookData?.classn?.map((bookclass) => ( */}
              <option value={bookData?.classn}>{bookData?.classn}</option>
            {/* ))} */}
          </select>
        </div>{" "}
        <br />
        <div className="form-unit-box">
          <span className="material-icons icon right-arrow-icon">
            {" "}
            double_arrow{" "}
          </span>
          <label className="form-label">Language</label>
          <select
            className="font-sm"
            onChange={(e) =>
              bookDetailDispatch({
                type: GET_BOOK_LANGUAGE,
                payload: e.target.value,
              })
            }
          >
            {/* {bookData?.langauage?.map((language) => ( */}
              <option value="English">"English"</option>
            {/* ))} */}
          </select>
        </div>
        <div className="form-btn">
          <Link to="/watermark">
            <button className="hero-btn" onClick={() => bookDetailDispatch({type: GET_BOOK_COVER_PAGE, payload: bookData?.coverpage})}>Next </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
