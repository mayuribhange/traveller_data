import { Request, Response } from "express";
import { validateToken } from "../../utilis/utilis";
import {
  findCategoriesById,
  findServicesById,
  updateCategoriesById,
  updateServiceById,
} from "../../utilis/db_utilis";
import { updateServicesValidator } from "../../utilis/validation";
export const updateServices = async (
  request: Request,
  response: Response
) => {
  try {
    let { categoryId, serviceId} = request?.params;
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
    const VALID_SCHEMA = updateServicesValidator();
    const VALIDATED_RESULT = await VALID_SCHEMA.validate(request.body);
    console.log(VALIDATED_RESULT);
    
    if(VALIDATED_RESULT?.error){
        return response.status(400).json({ message: VALIDATED_RESULT.error.details[0].message})
    }
    let {serviceName, type, priceOptions} = request?.body;
    let servicesExists = await findServicesById(serviceId,categoryId);
    if (servicesExists.length <= 0) {
      return response.status(400).json({ message: "Service not exists" });
    }
    await updateServiceById(serviceId, categoryId, serviceName, type, priceOptions);
     return response
      .status(200)
      .json({ message: "Services Modified successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
