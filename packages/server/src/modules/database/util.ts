export class PrismaFeatures {
    private page: number;
    private limit: number;
    private skip: number;
    private sort: any;
    private filters: any;

    constructor(private queryString: any) {
        this.page = parseInt(this.queryString?.page) || 1;
        this.limit = parseInt(this.queryString?.limit) || 9;
        this.skip = (this.page - 1) * this.limit;
    }

    paginating() {
        return {
            skip: this.skip,
            take: this.limit,
        };
    }

    sorting() {
        if (this.queryString?.sort) {
            const sortFields = this.queryString.sort.split(",").map((field: string) => {
                if (field.startsWith("-")) {
                    return { [field.substring(1)]: 'desc' };
                }
                return { [field]: 'asc' };
            });
            return {
                orderBy: sortFields,
            };
        }
        return {
            orderBy: { createdAt: 'desc' },
        };
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((field) => delete queryObj[field]);

        const orConditions = [];

        if (queryObj.name) {
            orConditions.push(
                { username: { contains: queryObj.name, mode: 'insensitive' } },
                { user: { fullName: { contains: queryObj.name, mode: 'insensitive' } } }
            );
        }

        if (orConditions.length > 0) {
            queryObj.where = { OR: orConditions };
        }

        return {
            queryString: queryObj,
        };
    }
}
