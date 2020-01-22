import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import * as q2m from "query-to-mongo";
import { Response, Request } from "express";
import { AuthGuard } from "@nestjs/passport";

import { CrudService } from "@smartsoft001/crud-shell-app-services";
import { IUser } from "@smartsoft001/users";
import { User } from "@smartsoft001/nestjs";
import { IEntity } from "@smartsoft001/domain-core";

@Controller("")
export class CrudController<T extends IEntity<string>> {
  constructor(private readonly service: CrudService<T>) {}

  static getLink(req: Request): string {
    return req.protocol + "://" + req.headers.host + req.url;
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  async create(
    @Body() data: T,
    @User() user: IUser,
    @Res() res: Response
  ): Promise<Response> {
    const id = await this.service.create(data, user);
    res.set("Location", CrudController.getLink(res.req) + '/' + id);
    return res.send();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  async readById(
    @Param() params: { id: string },
    @User() user: IUser
  ): Promise<T> {
    const result = await this.service.readById(params.id, user);

    console.log(params);

    if (!result) {
      throw new NotFoundException("Invalid id");
    }

    return result;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async read(
    @User() user: IUser,
    @Req() req: Request
  ): Promise<{
    data: T[];
    totalCount: number;
    links: { prev: string; first: string; next: string; last: string };
  }> {
    const object = q2m(req.query);
    const { data, totalCount } = await this.service.read(
      object.criteria,
      object.options,
      user
    );

    return {
      data,
      totalCount,
      links: object.links(CrudController.getLink(req).split('?')[0], totalCount)
    };
  }

  @UseGuards(AuthGuard("jwt"))
  @Put(":id")
  async update(
    @Param() params: { id: string },
    @Body() data: T,
    @User() user: IUser
  ): Promise<void> {
    await this.service.update(params.id, data, user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  async updatePartial(
    @Param() params: { id: string },
    @Body() data: Partial<T>,
    @User() user: IUser
  ): Promise<void> {
    await this.service.updatePartial(params.id, data, user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  async delete(
    @Param() params: { id: string },
    @User() user: IUser
  ): Promise<void> {
    await this.service.delete(params.id, user);
  }
}
