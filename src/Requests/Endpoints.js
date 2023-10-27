export const USER_HOST                  = "http://localhost:8081/api/users";
export const CREATE_USER_AND_PROFILE    = USER_HOST + "/createNewUserAndProfile";
export const AUTH_USER                  = USER_HOST + "/auth";
export const GET_USER_PROFILES          = USER_HOST + "/getAllUserProfiles";
export const DELETE_USER                = USER_HOST + "/deleteUser";
export const UPDATE_USER_PROFILE        = USER_HOST + "/updateUserProfile";
export const GET_USER_PROFILE_FOR_ID    = USER_HOST + "/getUserProfileForId";

export const DEVICE_HOST                = "http://localhost:8082/api/devices";
export const CREATE_DEVICE              = DEVICE_HOST + "/createDevice";
export const GET_DEVICES                = DEVICE_HOST + "/getAllDevices";
export const DELETE_DEVICE              = DEVICE_HOST + "/deleteDevice";
export const UPDATE_DEVICE              = DEVICE_HOST + "/updateDevice";
export const GET_DEVICES_FOR_USER       = DEVICE_HOST + "/getDevicesForUserReference";
