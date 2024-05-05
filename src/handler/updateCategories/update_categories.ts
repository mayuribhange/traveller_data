import { Request, Response } from "express";
import { validateToken } from "../../utilis/utilis";
import {
  findCategoriesById,
  updateCategoriesById,
} from "../../utilis/db_utilis";
import { upadteCategoriesValidator } from "../../utilis/validation";
export const updateCategories = async (
  request: Request,
  response: Response
) => {
  try {
    let { categoryName } = request?.body;
    let { categoryId } = request?.params;
    if (!request?.headers?.authorization) {
      return response.status(422).json({ message: "Please provide token" });
    }
    let decode: any = await validateToken(request?.headers?.authorization);
    if (!decode) {
      return response.status(422).json({ message: "Invalid token" });
    }
    if(decode?.email != process.env.EMAIL){
      return response
      .status(400)
      .json({ message: "Invalid user" });
    }
    const VALID_SCHEMA = upadteCategoriesValidator();
    const VALIDATED_RESULT = await VALID_SCHEMA.validate(request.body);
    if(VALIDATED_RESULT?.error){
        return response.status(400).json({ message: VALIDATED_RESULT.error.details[0].message})
    }
    let categoryExists = await findCategoriesById(categoryId);
    if (categoryExists.length <= 0) {
      return response.status(400).json({ message: "Categories not exists" });
    }
    await updateCategoriesById(categoryName, categoryId);
     return response
      .status(200)
      .json({ message: "Categories Modified successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
