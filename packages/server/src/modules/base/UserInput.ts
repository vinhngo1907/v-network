import Util from "../../utils/Util";
import Json from "../../utils/ReturnJson";
import Response from "../../utils/Response";

export abstract class UserInput {
    async isUndefined(data: unknown) {
        if (Util.isUndefined(data)) {
            return Json.builder(Response.HTTP_BAD_REQUEST);
        }
    }
}