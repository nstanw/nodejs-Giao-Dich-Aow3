import http from "../http";

class UserService {
    public async addUsers(input) {
        let result = await http.post('api/users', input);
        return result.data;
    }
    public async getUsersByUser(userId) {
        let result = await http.get('api/users/' + userId);
        return result.data;
    }
    public async getAllUsers(input) {
        let result = await http.get('api/users', { params: input });
        return result.data;
    }
    public async updateUsers(input) {
        let result = await http.put('api/users', input);
        return result.data;
    }
    public async deleteUsers(id) {
        let result = await http.delete(`api/users`, { params: { id: id } });
        return result.data;
    }

}

export default new UserService();
