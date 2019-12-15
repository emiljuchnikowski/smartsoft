import {Module} from "@nestjs/common";

import {CONTROLLERS} from "./controllers";
import {SERVICES} from "@smartsoft001/auth-shell-app-services";

@Module({
    controllers: CONTROLLERS,
    providers: SERVICES
})
export class AuthShellNestjsModule { }
