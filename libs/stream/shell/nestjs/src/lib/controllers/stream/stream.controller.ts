import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res
} from "@nestjs/common";
import { Response, Request } from "express";

import { StreamService } from "@smartsoft001/stream-shell-app-services";
import {
  IStreamCreate,
  IStreamUpdate,
  Stream
} from "@smartsoft001/stream-domain";

@Controller("")
export class StreamController {
  constructor(private service: StreamService) {}

  static getLink(req: Request): string {
    return req.protocol + "://" + req.headers.host + req.url;
  }

  @Get(":id")
  getById(@Param() params: { id: string }): Promise<Stream> {
    return this.service.getById(params.id);
  }

  @Post()
  async create(
    @Body() data: IStreamCreate,
    @Res() res: Response
  ): Promise<{ id: string }> {
    const id = await this.service.create(data);
    res.set("Location", StreamController.getLink(res.req) + "/" + id);
    return res.send({
      id
    });
  }

  @Patch(":id")
  async update(
    @Param() params: { id: string },
    @Body() data: IStreamUpdate
  ): Promise<void> {
    data.id = params.id;
    await this.service.update(data);
  }

  @Delete(":id")
  async delete(@Param() params: { id: string }): Promise<void> {
    await this.service.delete(params.id);
  }
}
