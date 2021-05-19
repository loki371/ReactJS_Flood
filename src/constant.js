const HEAD_ADRESS = "http://";

const FLOOD_SERVICE_ADDRESS = HEAD_ADRESS + "127.0.0.1:8080/v1/api";
const LOGIN_SERVICE_ADDRESS = HEAD_ADRESS + "127.0.0.1:8080/v1/api/auth";
// const SEARCH_SERVICE_ADDRESS = HEAD_ADRESS + "127.0.0.1:8000";
const WEB_SERVICE_ADRESS = HEAD_ADRESS + "127.0.0.1:3000";

const address = {
    login_server : LOGIN_SERVICE_ADDRESS + "/signin",
    signup_server : LOGIN_SERVICE_ADDRESS + "/signup",
    user_registration: FLOOD_SERVICE_ADDRESS + "/registrations/AtLocation",
    validate_token: LOGIN_SERVICE_ADDRESS + "/validateToken",

    login_client: WEB_SERVICE_ADRESS + "/login",
    dashboard_client: WEB_SERVICE_ADRESS + "/dashboard"
};

export default address;