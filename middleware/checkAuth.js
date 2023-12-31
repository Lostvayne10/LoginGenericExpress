import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) =>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");

            return next();

        }catch(error){
            return res.status(404).json({
                msg: "El token no es valido"
            });
        }
    }

    if(!token){
        const error = new Error("El token no es valido");
        return res.status(403).json({msg: error.message});
    }

    next();

}

export default checkAuth;