import {Body, Controller, Param, Post, Put} from "@nestjs/common";

@Controller('internal')
export class InternalController {
    @Post()
    invoke(@Body() obj) {
        return {
            date: new Date(),
            req: obj
        }
    }

    @Put(':id')
    refresh(@Body() obj, @Param('id') id) {
        return {
            date: new Date(),
            req: obj,
            id: id
        }
    }
}
