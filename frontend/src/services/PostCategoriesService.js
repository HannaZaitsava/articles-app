import axios from "axios";

export default class PostCategoriesService {
    static #BASE_URL = "http://localhost:3001";

    static async getAll() {
        try {
            const response = await axios.get(
                `${this.#BASE_URL}/postCategories/`
            );
            return response;
        } catch (error) {
            console.error("Error!", error);
        }
    }
}
