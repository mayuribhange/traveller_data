import { Request, Response } from "express";
import { validateToken } from "../../utilis/utilis";
import {
    categoryExist,
  insertCategoryValues,
} from "../../utilis/db_utilis";
import { addCategoriesValidator } from "../../utilis/validation";
export const addCategories = async (request: Request, response: Response) => {
  try {
    let { categoryName } = request?.body;
    if (!request?.headers?.authorization) {
      return response.status(422).json({ message: "Please provide token" });
    }
    let decode : any= await validateToken(request?.headers?.authorization);
    if (!decode) {
      return response.status(422).json({ message: "Invalid token" });
    }
    if(decode?.email != process.env.EMAIL){
      return response
      .status(400)
      .json({ message: "Invalid user" });
    }
    const VALID_SCHEMA = addCategoriesValidator();
    const VALIDATED_RESULT = await VALID_SCHEMA.validate(request.body);
    if(VALIDATED_RESULT?.error){
        return response.status(400).json({ message: VALIDATED_RESULT.error.details[0].message})
    }
    let alreadyExists = await categoryExist(categoryName);
    if (alreadyExists) {
      return response
        .status(200)
        .json({ message: "Categories already exists" });
    }
    let result: any = await insertCategoryValues(categoryName);
    if (result[0].affectedRows > 0) {
      return response
        .status(200)
        .json({ message: "Category successfully created" });
    } else {
      return response.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
