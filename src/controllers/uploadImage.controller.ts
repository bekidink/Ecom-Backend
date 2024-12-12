import uploadImageClodinary from "../utils/uploadImageClodinary";
import { Request, Response, NextFunction } from "express";
const uploadImageController = async (request:any, response:Response) => {
  try {
    const file = request.file;

    const uploadImage = await uploadImageClodinary(file);

    return response.json({
      message: "Upload done",
      data: uploadImage,
      success: true,
      error: false,
    });
  } catch (error:any) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
