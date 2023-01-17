import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}

export function isAuthenticated (
    req: Request,
    res: Response,
    next: NextFunction
){
  //  console.log("Chamou esse middleware")

    // Receber token
   // return next();

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")
  
    try {
// validar esse token 
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
         ) as Payload;
        
         // Recuprar o Id do token e colocar dentro de uma varival ...
            req.user_id = sub;

         return  next();
  
        }catch(err){
        return res.status(401).end();
    }
   
   
}