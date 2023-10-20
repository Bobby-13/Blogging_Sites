import axios from "axios"
import { API_LINKS } from "../constants/apiLinks"

export const publishPic = async (file) => {
    const imgData = new FormData();
    imgData.append("image",file);
    try {
        const response = await axios({
            method : "post",
            url: API_LINKS.PUBLISH_PIC, 
            data: imgData,
            headers: {
                Authorization: "Client-ID 0308ceb25245046"
            }
        })
        // console.log("response",response.data.data.link);
        return response.data.data.link;
    } catch (error) {
        return error;
    }
}