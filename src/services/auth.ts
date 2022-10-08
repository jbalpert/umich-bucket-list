import { UserRefreshClient, OAuth2Client, GetTokenOptions } from "google-auth-library"
import jwt_decode from "jwt-decode"
import { IUser } from "../models/user";
import { IUserCredentials } from "../types";
import { getUserByEmailService, createUserService } from "./user";
export const oa2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');

export const googleAuthService = async (code: string) => {
    const response = await oa2Client.getToken(code);
    const decoded = jwt_decode<IUserCredentials>(response.tokens.id_token!);
    const userInDb = await getUserByEmailService(decoded.email);
    if (!userInDb) {
        const user = {
            google_id: decoded.sub,
            email: decoded.email,
            first_name: decoded.given_name,
            last_name: decoded.family_name,
            profile_picture: decoded.picture,
            username: decoded.name
        }
        const newUser = await createUserService(user);
        return { userFromDB: newUser, isNewUser: true };
    }
    else {
        return { userFromDB: userInDb, isNewUser: false };

    }
}

export const googleAuthRefreshService = async (refreshToken: any) => {
    const user = new UserRefreshClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, refreshToken);
    const { credentials } = await user.refreshAccessToken();
    return credentials;
}