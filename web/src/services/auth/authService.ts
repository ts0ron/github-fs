import { Api } from "@mui/icons-material";
import ApiService, { ApiError, handleError, UnAuthorizedHttpError } from "../apiservice";
import { get } from "http";
import axios, { AxiosResponse } from "axios";
import { RegisterFormValues } from "../../views/register";
import { User } from "../../model/users";

interface TokenResponse {
    access_token: string,
    token_type: string
}

interface UserLoginInput {
    username: string,
    password: string
}

interface RegistrationInput {
    email: string,
    password: string,
    first_name?: string,
    last_name?: string,
}

class authService extends ApiService {

    constructor() {
        super({ baseUrl: "/auth", "name": "authService" });
    }

    fetchToken(username: string, password: string, force: boolean = false): Promise<string> {
        console.log("Starting the fetchToken")
        const storedToken = localStorage.getItem('token');

        console.log("We are at the fetchToken")
        if (!!storedToken && !force) {
            console.log("We are at the fetchToken with token", storedToken)
            return Promise.resolve(storedToken);
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        console.log("Starting the request for token to url", this.buildUrl())

        return this.post<UserLoginInput, TokenResponse>(`/token`, formData, { headers: { 'Content-Type': 'multipart/form-data' }})
            .then((response: any) => {
                console.log("The response is", response)
                if (response instanceof ApiError) {
                    throw new UnAuthorizedHttpError
                }
                return response.data;
            }).then((data: TokenResponse) => {
                console.log("The token response is", data)
                window.sessionStorage.setItem('token', data.access_token);
                return data.access_token;
            });
    }

    register(body: RegistrationInput): Promise<User> {
        return this.post<RegistrationInput, User>(
            `/register`,
            body,
            { headers: { 'Content-Type': 'application/json' } }
        )
    }
}

const INSTANCE = new authService();
export default INSTANCE;
