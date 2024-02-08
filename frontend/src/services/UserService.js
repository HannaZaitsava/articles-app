import axios from "axios";

export default class UserService {
    static #BASE_URL = "http://localhost:3001";

    static async getAll(
        limitPerPage,
        pageNumber,
        expandWith,
        filter,
        abortFetchSignal
    ) {
        try {
            const response = await axios.get(`${this.#BASE_URL}/users/`, {
                signal: abortFetchSignal.signal,
                params: {
                    _expand: expandWith,
                    q: filter?.searchQuery, // Full-text search
                    _sort: filter.sort,
                    _order: filter.sortOrder === 1 ? "asc" : "desc",
                    _page: pageNumber,
                    _limit: limitPerPage,
                },
                // paramsSerializer: (params) => {
                //   return qs.stringify(params), { arrayFormat: "repeat" };
                // },
            });
            return response;
        } catch (error) {
            console.error("Error!", error);
        }
    }

    static async getById(id) {
        try {
            const response = await axios.get(`${this.#BASE_URL}/users/${id}`);
            return response;
        } catch (error) {
            console.error("Error!", error);
        }
    }
}
