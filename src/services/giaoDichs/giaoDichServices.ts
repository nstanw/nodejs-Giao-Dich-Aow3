import http from "../http";

class GiaoDichServices {
    public async addGiaoDich(input) {
        let result = await http.post('api/giaoDichs', input);
        return result.data;
    }
    public async getGiaoDichByUser(userId) {
        let result = await http.get('api/giaoDichs/' + userId);
        return result.data;
    }
    public async getAllGiaoDichs(input) {
        let result = await http.get('api/giaoDichs', { params: input });
        return result.data;
    }
    public async updateGiaoDich(input) {
        let result = await http.put('api/giaoDichs', input);
        return result.data;
    }
    public async deleteGiaoDich(id) {
        let result = await http.delete(`api/giaoDichs`, { params: { id: id } });
        return result.data;
    }

}

export default new GiaoDichServices();
