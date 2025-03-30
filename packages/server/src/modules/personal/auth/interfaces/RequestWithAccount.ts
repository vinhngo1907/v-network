import { Account } from "@prisma/client";

interface RequestWithAccount extends Request {
    account: Account;
}

export default RequestWithAccount;