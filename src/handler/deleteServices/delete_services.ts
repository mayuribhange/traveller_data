import { Request, Response } from "express";
import { validateToken } from "../../utilis/utilis";
import {
    deleteCategoriesById,
  deleteServiceById,
  findCategoriesById,
  findServicesById,
} from "../../utilis/db_utilis";
export const deleteServices = async (
  request: Request,
  response: Response
) => {
  try {
    let { categoryId, serviceId} = request?.params;
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
    let serviceExists = await findServicesById(serviceId,categoryId);
    if (serviceExists.length <= 0) {
      return response.status(400).json({ message: "Service not exists" });
    }
    await deleteServiceById(serviceId,categoryId);
     return response
      .status(200)
      .json({ message: "Services deleted successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
