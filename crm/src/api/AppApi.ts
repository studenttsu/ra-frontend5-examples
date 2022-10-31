import { AuthDataDto } from "../common/dto/AuthData";
import { TokenDto } from "../common/dto/TokenDto";
import { HttpService } from "../services/HttpService";

class AppApi extends HttpService {
    login(authData: AuthDataDto): Promise<TokenDto> {
        return this.post('login', authData);
    }
}

export default new AppApi();