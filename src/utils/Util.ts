export default {
    isUndefined(data: any): Boolean {
        if (typeof data === 'object' && Array.isArray(data)) {
            return data?.length < 1;
        }

        if (typeof data === 'object') {
            return false;
        }
        return !data;
    },

    isNotEmptyArr(data: any): boolean {
        return data?.length > 0;
    },
}