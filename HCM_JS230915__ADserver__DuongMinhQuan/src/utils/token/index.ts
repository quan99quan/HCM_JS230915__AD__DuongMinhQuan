import {sign, verify} from 'jsonwebtoken'
export default {
    createToken: (data: any, time: string = String(5*60*1000)) => {
        return sign({...data}, process.env.JWT_KEY, {expiresIn: time})
    },
    decodeToken: (token: string) => {
        return verify(token, process.env.JWT_KEY)
    }
}