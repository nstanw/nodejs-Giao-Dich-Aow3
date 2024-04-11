import http from "../http";

class GiaoDichServices {
    public async addGiaoDich(input) {
        let result = await http.post('api/giaoDichs', input);
        return result.data;
    }
    public async getGiaoDichs() {
        let result = await http.get('api/giaoDichs');
        return result.data;
    }
    public async updateGiaoDich(input) {
        let result = await http.put('api/giaoDichs', input);
        return result.data;
    }
    public async deleteGiaoDich(id) {
        let result = await http.delete(`api/giaoDichs`);
        return result.data;
    }

}

export default new GiaoDichServices();
