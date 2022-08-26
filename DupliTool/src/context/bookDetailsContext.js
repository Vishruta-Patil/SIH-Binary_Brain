const { createContext, useContext, useReducer } = require("react");
const { bookDetailsReducer } = require("reducer/bookDetailsReducer");

const BookDetailsContext = createContext()
const useBookDetails = () => useContext(BookDetailsContext)

const initialValue = {
    books: [],
    bookName:"",
    edition:"option 1",
    class: "option 1",
    language: "option 1",
    bookImageURL: "",
    bookLength: "",
    bookHeight: "",
    coverPage: "",
    totalScore: 0,
    loader: false,
    lengthAndWidth: 0,
    bookCover: 0,
    barCode: 0,
    isWatermark: ""
}

const BookDetailsProvider = ({children}) => {
    const [bookDetailState, bookDetailDispatch] = useReducer(bookDetailsReducer, initialValue)
    return (
        <BookDetailsContext.Provider value={{bookDetailState, bookDetailDispatch}}>
            {children}
        </BookDetailsContext.Provider>
    )
}

export {useBookDetails, BookDetailsProvider}

