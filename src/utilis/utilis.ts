import jwt from 'jsonwebtoken';
const secret = process.env.SECRET_KEY || 'default_secret';

export const generateToken = (payload: any)=>{
    try {
        const accessToken = jwt.sign(payload, secret, { expiresIn: '9h' });  // Access token expires in 9 hours
    
    // Generating the refresh token
    const refreshToken = jwt.sign(payload, secret, { expiresIn: '7d' });  // Refresh token expires in 7 days

    return { accessToken, refreshToken }; 
    } catch (error) {
        return {};
    } 
}

export const validateToken = (token: any)=>{
    try {
        if('Bearer'== token.split(' ')[0]){
        const decode = jwt.verify(token.split(' ')[1], secret);
        return decode;
        }
    } catch (error) {
        console.error(error);
        return {}
    }
}