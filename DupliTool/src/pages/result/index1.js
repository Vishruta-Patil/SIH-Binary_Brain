import Loader from "components/Loader";
import { useBookDetails } from "context/bookDetailsContext";
import { useEffect, useState } from "react";
import "./index.css";

export const Result1 = () => {
  const { bookDetailState, bookDetailDispatch } = useBookDetails();
  let { books, bookName, bookLength, bookHeight, totalScore, loader, lengthAndWidth, bookCover, barCode, isWatermark} =
    bookDetailState;

  const [percent, setPercent] = useState(0);
  const [widthlength, setWidthlength] = useState(0)
 const [coverPage, setCoverPage] = useState(0)
 const [barCodeValue, setBarCodeValue] = useState(0)
 const [waterMarkValue, setWaterMarkValue] = useState(0)

  useEffect(() => {
    if(isWatermark === "Yes") {
      setWaterMarkValue(100)
      totalScore = totalScore + 10
    } else {
      setWaterMarkValue(0)
    }
    setPercent((totalScore * 100) / 40);
    console.log(lengthAndWidth)
    setWidthlength(lengthAndWidth * 100 / 10)
    setCoverPage(bookCover * 100 / 10)
    setBarCodeValue(barCode * 100 / 10)
    console.log(isWatermark)
    


  }, [totalScore, lengthAndWidth, bookCover, barCode, isWatermark]);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <h1 className="font-header">Results</h1>

        <div className="res-desc font-md">
          <p>Step 1 - WaterMark detection --- {waterMarkValue.toFixed(2)}%</p>
          <p>Step 2 - Length and Width Detection --- {widthlength.toFixed(2)}%</p>
          <p>Step 3 - Book Cover Detection --- {coverPage.toFixed(2)}%</p>
          <p>Step 4 - Barcode Detection --- {barCodeValue.toFixed(2)}%</p>
          </div>
          
          <p className="piracy-percentage">
            The Book is Authentic by {percent.toFixed(2)} %
          </p>

          {percent > 50 ? (
            <p className="font-md">
              Book is NOT Pirated, so vendor will be in authenticated list
            </p>
          ) : (
            <p className="font-md">
              Book is Pirated, therefore vendor will be removed from
              authenticated list and added in blacklist
            </p>
          )}
        </div>
      )}
    </div>
  );
};
