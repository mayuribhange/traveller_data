import { Request, Response } from "express";
import { validateToken } from "../../utilis/utilis";
import {
  insertServicesValues,
  serviceExist,
} from "../../utilis/db_utilis";
import { addServicesValidator } from "../../utilis/validation";
export const addServices = async (request: Request, response: Response) => {
  try {
    let { serviceName, type, priceOptions } = request?.body;
    let { categoryId } = request?.params;
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
    const VALID_SCHEMA = addServicesValidator();
    const VALIDATED_RESULT = await VALID_SCHEMA.validate(request.body);
    if(VALIDATED_RESULT?.error){
        return response.status(400).json({ message: VALIDATED_RESULT.error.details[0].message})
    }
    let alreadyExists = await serviceExist(serviceName);

    if (alreadyExists) {
      return response
        .status(200)
        .json({ message: "ServiceName already exists" });
    }
    let result: any = await insertServicesValues(serviceName, categoryId, type, priceOptions);
    if (result) {
       return response
        .status(200)
        .json({ message: "Services successfully created" });
    } else {
      return response.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
