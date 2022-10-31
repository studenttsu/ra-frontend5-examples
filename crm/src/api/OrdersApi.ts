import { API_PATH } from "../constants";
import { HttpService } from "../services/HttpService";

class OrdersApi extends HttpService {
    constructor() {
        super(`${API_PATH}/orders`);
    }

    getAll() {
        return this.get('');
    }

    create() {
        return this.post('', {});
    }

    closeOrder(orderId: number) {
        // return this.patch(`close/${orderId}`);
    }
}

export default new OrdersApi();;