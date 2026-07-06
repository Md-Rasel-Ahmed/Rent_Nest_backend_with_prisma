import  jwt, { type JwtPayload }  from "jsonwebtoken"
import config from "../config"

const createToken=(payload:JwtPayload)=>{
    const accessToken=jwt.sign(payload,config.jwt_access_secret as string,{
        expiresIn:"3d"
    })
    const refreshToken=jwt.sign(payload,config.jwt_refresh_secret as string,{
        expiresIn:"10d"
    })
    return{
        accessToken,
        refreshToken
    }
}
export const jwtUtils={
    createToken
}