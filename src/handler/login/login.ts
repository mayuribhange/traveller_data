import { Request, Response } from "express";
import { generateToken } from "../../utilis/utilis";
import { loginValidator } from "../../utilis/validation";
export const login = async (request: Request, response: Response) => {
  try {
    const VALID_SCHEMA = loginValidator();
    const VALIDATED_RESULT = await VALID_SCHEMA.validate(request.body);
    if(VALIDATED_RESULT?.error){
        return response.status(400).json({ message: VALIDATED_RESULT.error.details[0].message})
    }
    const { email, password } = request?.body;
    if (email == process.env.EMAIL) {
      if (process.env.PASSWORD == password) {
        let token = await generateToken({ email: process.env.EMAIL });
        return response
          .status(200)
          .json({
            email: email,
            access_token: token?.accessToken,
            refresh_token: token?.refreshToken,
            message: "Sign in Successfully.",
          });
      } else {
        return response.status(422).json({ message: "Password mismatch" });
      }
    } else {
      return response.status(422).json({ message: "Invalid User" });
    }
  } catch (error) {
    console.error(error);
  }
};
