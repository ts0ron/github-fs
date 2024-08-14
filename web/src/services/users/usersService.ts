import ApiService from "../apiservice";


class usersService extends ApiService {

    constructor() {
        super({ baseUrl: "/user", "name": "usersService" });
    }

}

const INSTANCE = new usersService();
export default INSTANCE;