import {Body, Controller, Post} from "@nestjs/common";

@Controller('internal')
export class InternalController {
    @Post()
    invoke(@Body() obj) {
        return {
            date: new Date(),
            req: obj
        }
    }
}
