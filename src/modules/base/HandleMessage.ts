import { UserInput } from "./UserInput";
import Util from "../../utils/Util";
import Json from "../../utils/ReturnJson";
import Response from "../../utils/Response";

export abstract class HandleMessage extends UserInput {
    async getListOfMessage(tableName:string, obj: any){
    }
}