import {HttpService, Injectable} from "@nestjs/common";

@Injectable()
export class FbService {
    constructor(private http: HttpService) { }

    async getUserId(token: string): Promise<string> {
        const { data } = await this.http
            .get('https://graph.facebook.com/me?access_token=' + token).toPromise();

        return data.id;
    }
}