import Cookies from "universal-cookie";

export function isSuccess(resCode) {
    // Validation http status code
    return [200, 201, 202].includes(resCode);
}