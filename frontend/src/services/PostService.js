import axios from "axios";
//import * as qs from 'qs';
import qs from 'qs';

export default class PostService {
    static #BASE_URL = "http://localhost:3001";

    static async getAll({ mainArgs, additionalArgs }) {
        //limitPerPage, pageNumber, expandWith, filter, abortFetchSignal) {
        try {
            const response = await axios.get(
                `${this.#BASE_URL}/posts/`,
                //`https://jsonplaceholder.typicode.com/posts/`,
                {
                    signal: additionalArgs.abortFetchSignal, //.signal,
                    params: {
                        ...mainArgs,
                        ...additionalArgs.filter?.selectedFilters,
                        _expand: additionalArgs.expandWith,
                        q: additionalArgs.filter?.searchQuery, // Full-text search
                        _sort: additionalArgs.filter?.sort,
                        _order:
                            additionalArgs.filter?.sortOrder === 1
                                ? "asc"
                                : "desc",
                        _page: additionalArgs.pageNumber,
                        _limit: additionalArgs.limitPerPage,
                    },
                    paramsSerializer: function (params) {
                        return qs.stringify(params, {arrayFormat: 'repeat', skipNulls: true})
                    },
                }
            );
            return response;
        } catch (error) {
            console.error("Error!", error);
        }
    }

    static async getById(id, additionalArgs, abortControllerSignal) {
        try {
            const response = await axios.get(`${this.#BASE_URL}/posts/${id}`, {
                signal: abortControllerSignal,
                params: {
                    _expand: additionalArgs?.expand,
                },
            });
            return response;
        } catch (error) {
            console.error("Error!", error);
        }
    }

    static async getCommentsByPostId(id) {
        try {
            const response = await axios.get(
                `${this.#BASE_URL}/posts/${id}/comments`
            );
            return response;
        } catch (error) {
            console.error("Error!", error);
        }
    }

    static async deletePost(id) {
        let resultError = "";
        try {
            await axios.delete(`${this.#BASE_URL}/posts/${id}`);
        } catch (error) {
            resultError = error;
            console.error("DELETE error!", error);
        }
        console.log();
        return resultError;
    }

    static async createPost(post) {
        let resultError = "";
        try {
            await axios.post(`${this.#BASE_URL}/posts/`, post);
        } catch (error) {
            resultError = error;
            console.error("CREATE Post error!", error);
        }
        return resultError;
    }

    static async editPost(post) {
        let resultError = "";
        try {
            await axios.patch(`${this.#BASE_URL}/posts/${post.id}`, post);
        } catch (error) {
            resultError = error;
            console.error("CREATE Post error!", error);
        }
        return resultError;
    }
}
