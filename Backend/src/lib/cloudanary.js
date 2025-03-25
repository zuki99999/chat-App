import {v2 as cloudanary} from "cloudinary";

import {config} from "dotenv";
config();

cloudanary.config({
    cloud_name:process.env.CLOUDANARY_CLOUDE_NAME,
    api_key:process.env.CLOUDANARY_API_KEY,
    api_secret:process.env.CLOUDANARY_API_SECRET,
});

export default cloudanary;