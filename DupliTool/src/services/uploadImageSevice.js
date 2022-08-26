import axios from "axios"

export const uploadImageFromForm = async (formData) => {
    const config = {
        method: "post",
        url: "https://api.cloudinary.com/v1_1/debanftke/image/upload",
        headers: { 'content-type': 'multipart/form-data' },
        data: formData
    };

    try {
        const res = await axios(config);
        const uploadedImgUrl = res.data.secure_url;
        const public_id = res.data.public_id;
        return { uploadedImgUrl, public_id };
    } catch(error) {
        console.log(error);
        console.error("Couldn't upload image");
    }
};

export const uploadCoverPage = async (formData) => {
    const config = {
        method: "post",
        url: "https://api.cloudinary.com/v1_1/debanftke/image/upload",
        headers: { 'content-type': 'multipart/form-data' },
        data: formData
    };

    try {
        const res = await axios(config);
        const uploadedImgUrl = res.data.secure_url;
        const public_id = res.data.public_id;
        return { uploadedImgUrl, public_id };
    } catch(error) {
        console.log(error);
        console.error("Couldn't upload image");
    }
};