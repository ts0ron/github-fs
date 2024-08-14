import axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from "axios";
import {RepositoryMetadata} from "../views/fileexplorer";
import {FileSystemItem} from "../model/repository";


enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_CONTENT = 422,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}


export class ApiError {
    private message?: string | string[];

    constructor(msg?: string | string[]) {
        this.message = msg;
    }

    getMessage() {
        return this.message;
    }
}

export class UnAuthorizedHttpError extends ApiError {
    constructor(msg?: string | string[]) {
        super(msg);
    }
}

export class UnprocessableContentHttpError extends ApiError {
    constructor(msg?: string | string[]) {
        super(msg);
    }
}

export class ConflictHttpError extends ApiError {
    constructor(msg?: string | string[]) {
        super(msg);
    }
}

export class GeneraltHttpError extends ApiError {
    constructor(msg?: string | string[]) {
        super(msg);
    }
}



export function handleError(error: any): ApiError {
    let msgs = undefined;

    if (error instanceof AxiosError) {
        msgs = error.response?.data.details?.map((detail: any) =>  detail.input + " " + detail.msg )
    }

    switch (error.response.status) {
        case HttpStatusCode.CONFLICT: {
            return new ConflictHttpError(msgs)
        }
        case HttpStatusCode.UNAUTHORIZED: {
            return new UnAuthorizedHttpError(msgs)
        }
        case HttpStatusCode.UNPROCESSABLE_CONTENT: {
            return new UnprocessableContentHttpError(msgs)
        }
        default: {
            return new GeneraltHttpError(msgs)
        }
    }
}

export default class ApiService {
    protected readonly baseUrl: string;
    protected readonly name: string;
    private abortControllersMap: Map<string, any>;
    private requestQueue: Map<string, any>;
    protected serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:8000";


    constructor({ baseUrl, name }: { baseUrl: string, name?: string }) {
        this.baseUrl = baseUrl;
        this.abortControllersMap = new Map();
        this.requestQueue = new Map();
        this.name = name || this.constructor.name;
    }

    buildUrl() {
        return `${this.serverUrl}${this.baseUrl}`;
    }


    fetchWithAuth<I, O>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<O>> {
        const currentToken = localStorage.getItem('token');

        if (!currentToken) {
            throw new UnAuthorizedHttpError("No token found")
        }

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${currentToken}`
        }

        return axios.get<I, AxiosResponse<O>>(`${this.buildUrl()}${url}`, config);
    }

    post<T, O>(urlSuffix: string, data: any, config: any): Promise<O> {
        return axios.post<any, any, T>(`${this.buildUrl()}${urlSuffix}`, data as T, config)
            .then((response: any) => {
                return response;
            })
            .catch(handleError);
    }
}
