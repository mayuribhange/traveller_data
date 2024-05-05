import { Request, Response } from "express";
import { validateToken } from "../../utilis/utilis";
import {
  fetchCategoriesValues,
} from "../../utilis/db_utilis";
export const fetchCategories = async (request: Request, response: Response) => {
  try {
    if (!request?.headers?.authorization) {
      return response.status(422).json({ message: "Please provide token" });
    }
    let decode : any = await validateToken(request?.headers?.authorization);
    if (!decode) {
      return response.status(422).json({ message: "Invalid token" });
    }
    if(decode?.email != process.env.EMAIL){
      return response
      .status(400)
      .json({ message: "Invalid user" });
    }
    let result = await fetchCategoriesValues();
    if (result.length > 0) {
      return response.status(200).json({ data: result , message: "Categories fetched successfully"});
    } else {
      return response.status(200).json({ data: [], message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
