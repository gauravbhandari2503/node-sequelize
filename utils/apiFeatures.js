class APIFeatures {
    constructor(queryString) {
        this.queryString = queryString;
        this.features = {};
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        let queryString = JSON.stringify(queryObj);
        this.features.filter = JSON.parse(queryString);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const querySort = this.queryString.sort.split(',');
            const sortBy = querySort.reduce((sorter, item, index) => {
                if (item.startsWith('-')) {
                    const removedSignItem = item.substring(1);
                    sorter[index] = [removedSignItem, 'DESC'];
                    return sorter
                } else {
                    sorter[index] = [item, 'ASC'];
                    return sorter;
                }
            }, [])
            this.features.sortBy = sortBy;
        } else {
            this.features.sortBy = ['id', 'DESC'];
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',');
            this.features.fields = fields;
        } else {
            this.features.fields = null;
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1 ;
        const limit = this.queryString.limit * 1 || 10 ;
        const offSet = (page - 1 ) * limit
        this.features.pagination = {
            offSet,
            limit
        }

        return this;
    }
}

module.exports = APIFeatures;
