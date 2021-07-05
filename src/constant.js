const HEAD_ADRESS = "http://";

const FINAL_IP = "34.126.92.44";
const FLOOD_SERVICE_ADDRESS = HEAD_ADRESS + FINAL_IP + ":8080/v1/api";
const LOGIN_SERVICE_ADDRESS = HEAD_ADRESS + FINAL_IP + ":8080/v1/api/auth";
const SEARCH_SERVICE_ADDRESS = HEAD_ADRESS + FINAL_IP + ":8082";


const WEB_SERVICE_ADRESS = HEAD_ADRESS + "127.0.0.1" + ":3000";

const address = {
    login_server : LOGIN_SERVICE_ADDRESS + "/signin",
    register_server : LOGIN_SERVICE_ADDRESS + "/signup",
    signup_server : LOGIN_SERVICE_ADDRESS + "/signup",
    validate_token: LOGIN_SERVICE_ADDRESS + "/validateToken",

    login_client: WEB_SERVICE_ADRESS + "/login",
    register_client: WEB_SERVICE_ADRESS + "/register",
    dashboard_client: WEB_SERVICE_ADRESS + "/dashboard",
    authority_client: WEB_SERVICE_ADRESS + "/dashboard/authorities",
    volunteer_client: WEB_SERVICE_ADRESS + "/dashboard/volunteers",

    user_registration: FLOOD_SERVICE_ADDRESS + "/registrations/AtLocation",
    auth_location_regis: FLOOD_SERVICE_ADDRESS + "/locationRegistrations/authorities",
    resc_location_regis: FLOOD_SERVICE_ADDRESS + "/locationRegistrations/rescuers",
    volu_location_regis: FLOOD_SERVICE_ADDRESS + "/locationRegistrations/volunteers",
    emergency_location_regis: FLOOD_SERVICE_ADDRESS + "/registrations/volunteers",
    accept_reject_user_regis : FLOOD_SERVICE_ADDRESS + "/registrations/authorities",
    get_ward_authority : FLOOD_SERVICE_ADDRESS + "/authorities",
    get_ward_volunteer : FLOOD_SERVICE_ADDRESS + "/volunteers",

    regis_cors_cors : FLOOD_SERVICE_ADDRESS + "/locationRegistrations/wards/",

    getMyRegis: FLOOD_SERVICE_ADDRESS + "/locationRegistrations/myRegistration/",

    floodNotification: FLOOD_SERVICE_ADDRESS + "/floodNotifications",

    userInformation: FLOOD_SERVICE_ADDRESS + "/accounts",

    image_service: SEARCH_SERVICE_ADDRESS + "/pythonService/registrations/images",

    python_service: SEARCH_SERVICE_ADDRESS,

    isTest: false
};

export default address;
