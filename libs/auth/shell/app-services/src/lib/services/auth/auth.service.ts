import {Injectable} from "@nestjs/common";
import {IAuthToken, IAuthTokenRequest} from "../../models";

@Injectable()
export class AuthService {
    create(req: IAuthTokenRequest): Promise<IAuthToken> {
        return {} as Promise<IAuthToken>;
    }
}
