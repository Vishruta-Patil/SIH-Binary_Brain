import {
  GET_ALL_BOOKS,
  GET_BOOK_CLASS,
  GET_BOOK_EDITION,
  GET_BOOK_NAME,
  GET_BOOK_LANGUAGE,
  GET_BOOK_COVER_PAGE,
  GET_BOOK_DIMENSION,
  GET_TOTAL_SCORE,
  LOADER_STATUS,
  GET_LENGTH_WIDTH,
  GET_COVER_PAGE,
  GET_BARCODE_VALUE,
  GET_WATERMARK
} from "./bookDetailsConstant";

export const bookDetailsReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case GET_BOOK_NAME:
      return {
        ...state,
        bookName: action.payload,
      };

    case GET_BOOK_EDITION:
      return {
        ...state,
        edition: action.payload,
      };

    case GET_BOOK_CLASS:
      return {
        ...state,
        class: action.payload,
      };

    case GET_BOOK_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    case GET_BOOK_DIMENSION:
      return {
        ...state,
        bookLength: action.payload.length,
        bookHeight: action.payload.height,
      };

    case GET_BOOK_COVER_PAGE:
      return {
        ...state,
        coverPage: action.payload,
      };

      case GET_TOTAL_SCORE:
        return {
          ...state,
          totalScore: Number(state.totalScore + action.payload)
        }

        case LOADER_STATUS: 
          return {
            ...state,
            loader: !state.loader
          }


        case GET_LENGTH_WIDTH:
          return {
            ...state,
            lengthAndWidth: Number(state.lengthAndWidth + action.payload)
          }


          case GET_COVER_PAGE:
          return {
            ...state,
            bookCover: Number(state.bookCover + action.payload)
          }

          case GET_BARCODE_VALUE:
          return {
            ...state,
            barCode: Number(state.barCode + action.payload)
          }

          case GET_WATERMARK:
          return {
            ...state,
            isWatermark: action.payload
          }
  }
};

// https://res.cloudinary.com/debanftke/image/upload/v1661477388/brcd_yw11ut.jpg
