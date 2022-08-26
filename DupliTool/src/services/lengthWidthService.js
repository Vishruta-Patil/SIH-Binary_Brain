import axios from "axios"
import { LOADER_STATUS } from "reducer/bookDetailsConstant"

export const getLengthWidth = async(imgUrl, bookDetailDispatch) => {
    try {
        bookDetailDispatch({type: LOADER_STATUS})
        const res = await axios.post("http://127.0.0.1:5000/dimension", {imgURL: imgUrl, coOrds: ""})
        console.log(res)
        return res
    } catch(err) {
        console.log(err)
    }
}


export const covePageSimilarity = async(imgUrl, dataimgUrl2) => {
    try {
        const res = await axios.post("http://127.0.0.1:5000/sift", {"img1":{"url":imgUrl,"coord":""},"img2":{"url":dataimgUrl2,"coord":""}})
        console.log(res)
        return res
    } catch(err) {
        console.log(err)
    }
}


export const getBarCode = async(bookDetailDispatch) => {
    try {
        const res = await axios.post("http://127.0.0.1:5000/barcode", {"imgURL1":{"url": "https://i.ibb.co/wB3dm8B/test-Copy.jpg"}})
        console.log(res)
        bookDetailDispatch({type: LOADER_STATUS})
        return res
    } catch(err) {
        console.log(err)
    }
}