import http from "../http-common";

class MakerDataService {
    getAll(page = 0) {
        return http.get(`?page?${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return http.post("/review", data);
    }

    updateReview(data) {
        return http.put("/review", data);
    }

    deleteReview(id) {
        return http.delete(`/review?id=${id}`);
    }

    getClothes(id) {
        return http.get(`/clothes`);
    }
    
}

export default new MakerDataService();