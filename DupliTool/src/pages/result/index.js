import { useBookDetails } from "context/bookDetailsContext";
import { connectFirestoreEmulator } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GET_TOTAL_SCORE } from "reducer/bookDetailsConstant";
import "./index.css"

export const Result = () => {
    const { bookDetailState, bookDetailDispatch } = useBookDetails();
    const {books, bookName, bookLength, bookHeight, totalScore} = bookDetailState
    console.log(bookName)

    const [points, setPOints] = useState(0)


    const lengthWidthResult = () => {
        const getBookDetail =  books.filter(book => book.bookname === bookName)
        let score = 0
        const width = Math.abs(bookHeight - getBookDetail[0]?.width)
        const length = Math.abs(bookLength - getBookDetail[0]?.length)

        if(width < 1.5) {
            setPOints(points => points + 5)
            score  += 5
            console.log("yes")
        } else if(width < 3) {
            setPOints(points => points + 4)
            score  += 4
        } else if(width < 5) {
            setPOints(points => points + 3)
            score  += 3
        } else {
            setPOints(points => points + 2)
            score += 2
        }

        if(length < 1.5) {
            setPOints(points => points + 5)
            score  += 5
            console.log("yeah")
        } else if(length < 3) {
            setPOints(points => points + 4)
            score  += 4
        } else if(length < 5) {
            setPOints(points => points + 3)
            score  += 3
        } else {
            setPOints(points => points + 2)
            score += 2
        }

        console.log(score)
        bookDetailDispatch({type: GET_TOTAL_SCORE, payload: Number(score)}) 

        console.log({bookHeight, width1:getBookDetail[0]?.width,  width})
    }

    

    useEffect(() => {
       
         lengthWidthResult()
        
    }, [])
    return (
        <div>
            <h1 className="font-header">{totalScore}</h1>

            <div>
                
            </div>

        </div>
    )
}