class ValidationUtils {
    static validateEmail(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    static validateMobile(phone: string) {
        const re = /^[+]/g
        return re.test(phone);
    }

    static validateRegister({
        account, username
    }): string {
        let error = "";
        if (!account || !username) {
            error = "Missing username or/and email"
            // throw new Error("Missing username or/and email");
        }

        if (!this.validateEmail(account)) {
            error = "Email format is incorrect";
            // throw new Error("Email format is incorrect");
        }

        return error;
    }
}

export default ValidationUtils;