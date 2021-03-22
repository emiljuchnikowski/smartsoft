import {HttpService, Injectable} from "@nestjs/common";

@Injectable()
export class GoogleService {
    constructor(private http: HttpService) { }

    async getUserId(token: string): Promise<string> {
        const { data } = await this.http
            .get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token).toPromise();

        return data.user_id;
    }
}