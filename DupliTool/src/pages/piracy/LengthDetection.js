import "./index.css";
import { useState, useEffect } from "react";
import { uploadImageFromForm } from "services/uploadImageSevice";
import { toast } from "react-toastify";
import {
  covePageSimilarity,
  getBarCode,
  getLengthWidth,
} from "services/lengthWidthService";
import { useBookDetails } from "context/bookDetailsContext";
import { GET_BARCODE_VALUE, GET_BOOK_DIMENSION, GET_COVER_PAGE, GET_LENGTH_WIDTH } from "reducer/bookDetailsConstant";
import { Link } from "react-router-dom";
import { GET_TOTAL_SCORE } from "reducer/bookDetailsConstant";

export const LengthDetection = () => {
  // let arr = []
  const { bookDetailState, bookDetailDispatch } = useBookDetails();

  const [selectedFile, setSelectedFile] = useState("");
  const [imagePath, setImagePath] = useState("");

  // co-ordinate points
  const [leftOffset, setLeftOffset] = useState("");
  const [topOffset, setTopOffset] = useState("");
  const [xCoordinatePoint, setXcoordinatePoint] = useState("");
  const [yCoordinatePoint, setYcoordinatePoint] = useState("");

  const [firstpoint, setFirstpoint] = useState();
  const [secondpoint, setSecondpoint] = useState();
  const [thirdpoint, setThirdpoint] = useState();
  const [fourthpoint, setFourthpoint] = useState();

  const [whichpoint, setWhichpoint] = useState(0);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePath(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const imgSimilarity = async () => {};

  const uplaodImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "qqmoyvsb");
    const { uploadedImgUrl, public_id } = await uploadImageFromForm(formData);

    const imgUrl = uploadedImgUrl;
    const coOrdinates = [firstpoint, secondpoint, thirdpoint, fourthpoint];

    const res = await getLengthWidth(imgUrl, bookDetailDispatch);
    console.log(res)
    const dataimgUrl2 = bookDetailState.coverPage;
    bookDetailDispatch({
      type: GET_BOOK_DIMENSION,
      payload: {
        length: Number(res.data.length),
        height: Number(res.data.width),
      },
    });

    console.log({imgUrl, dataimgUrl2})
    const imgSimilarity = await covePageSimilarity(imgUrl, dataimgUrl2);
    console.log(imgSimilarity)
    const brute = imgSimilarity.data.Brute
    const getBookDetail = books.filter((book) => book.bookname === bookName);

    const getWidth = Number(res.data.width) - Number(getBookDetail[0]?.width);
    const getHeight = Math.abs(
      Number(res.data.length) - Number(getBookDetail[0]?.length)
    );

    if (getHeight < 1.5) {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 5 });
      bookDetailDispatch({ type: GET_LENGTH_WIDTH, payload: 5 });
    } else if (getHeight < 3) {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 4 });
      bookDetailDispatch({ type: GET_LENGTH_WIDTH, payload: 4 });
    } else {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 3 });
      bookDetailDispatch({ type: GET_LENGTH_WIDTH, payload: 3 });
    }
    

    if (getWidth < 1.5) {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 5 });
      bookDetailDispatch({ type: GET_LENGTH_WIDTH, payload: 5 });
    } else if (getWidth < 3) {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 4 });
      bookDetailDispatch({ type: GET_LENGTH_WIDTH, payload: 4 });
    } else {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 3 });
      bookDetailDispatch({ type: GET_LENGTH_WIDTH, payload: 3 });
    }

     
    if (brute > 0.6) {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 10 });
      bookDetailDispatch({ type: GET_COVER_PAGE, payload: 10 })
    } else if (brute > 0.4) {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 8 });
      bookDetailDispatch({ type: GET_COVER_PAGE, payload: 8 })
    } else if (brute > 0.3) {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 6 });
      bookDetailDispatch({ type: GET_COVER_PAGE, payload: 6 })
    } else {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 0 });
      bookDetailDispatch({ type: GET_COVER_PAGE, payload: 0 })
    }


    const barCodeDetection = await getBarCode(bookDetailDispatch);
    console.log(barCodeDetection);
    const barCode = barCodeDetection.data.data 
    if (barCode === 10) {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 10 });
      bookDetailDispatch({ type: GET_BARCODE_VALUE, payload: 10 });
    } else {
      bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: 0 });
      bookDetailDispatch({ type: GET_BARCODE_VALUE, payload: 10 });
    }
  };

  const handleImagepreview = (e) => {
    // console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const getCordinatePoints = (e) => {
    let localArr = [];
    setLeftOffset(e.target.offsetLeft);
    setTopOffset(e.target.offsetTop);

    console.log(e.clientX - leftOffset);

    localArr = [e.clientX - leftOffset, e.clientY - topOffset];

    if (whichpoint === 0) {
      setFirstpoint(localArr);
    } else if (whichpoint === 1) {
      setSecondpoint(localArr);
    } else if (whichpoint === 2) {
      setThirdpoint(localArr);
    } else if (whichpoint === 3) {
      setFourthpoint(localArr);
    }

    setWhichpoint(whichpoint + 1);
    toast.success(`Point ${whichpoint + 1} is alloted`);
    localArr = [];
  };

  const { books, bookName, bookLength, bookHeight, totalScore } =
    bookDetailState;

  const lengthWidthResult = async () => {
    const getBookDetail = await books.filter(
      (book) => book.bookname === bookName
    );
    console.log(getBookDetail);
    let score = 0;
    const width = Math.abs(bookLength - Number(getBookDetail[0]?.width));
    const length = Math.abs(bookHeight - Number(getBookDetail[0]?.length));

    console.log({ bookHeight, width1: getBookDetail[0]?.width, width });

    if (width < 1.5) {
      score += 5;
      console.log("yes");
    } else if (width < 3) {
      score += 4;
    } else if (width < 5) {
      score += 3;
    } else {
      score += 2;
    }

    if (length < 1.5) {
      score += 5;
      console.log("yeah");
    } else if (length < 3) {
      score += 4;
    } else if (length < 5) {
      score += 3;
    } else {
      score += 2;
    }

    console.log(bookDetailState.isWatermark);
    bookDetailDispatch({ type: GET_TOTAL_SCORE, payload: Number(score) });
  };

  return (
    <div className="piracy-form-container">
      <div className="banner-container">
        <img
          className="form-img"
          src="https://res.cloudinary.com/debanftke/image/upload/v1660913565/Blue_Gold_Rustic_Artisinal_Remote_Graduation_Yard_Sign_uxcj81.png"
          alt=""
        />
      </div>
      <div className="form-content-container">
        <h1 className="font-header">STEP 2: PIRACY DETECTION</h1>
        
        <div className="flex desc-box">
        <span className="material-icons icon right-arrow-icon">
            {" "}
            double_arrow{" "}
          </span>
        <h3 className="font-sm desc-header">This is the 3 Technique Solution -</h3>
        </div>

        <ul className="feat-list">
          <li className="feat-unit">A.) Length and Width Detection</li>
          <li className="feat-unit">B.) Book Cover Detection</li>
          <li className="feat-unit">C.) Barcode Detection</li>
        </ul>

<div className="desc-box">
        <span className="material-icons icon right-arrow-icon">
            {" "}
            double_arrow{" "}
          </span>
        <h2 className="font-sm file-upload">Choose The File</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
          <input type="file" onChange={(e) => handleImagepreview(e)} />
          
          <Link to="/result">
            <button className="hero-btn" onClick={uplaodImage}>
              Submit{" "}
            </button>
          </Link>
        
        </div>

          {imagePath && (
            <img
              style={{ width: 300 }}
              src={imagePath}
              alt="Form-bannner"
              onClick={getCordinatePoints}
            />
          )}
        </div>
        
      </div>
    </div>
  );
};
