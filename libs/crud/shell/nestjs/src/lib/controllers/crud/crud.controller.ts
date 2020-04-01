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
import { Parser } from 'json2csv';
import * as _ from 'lodash';

import { CrudService } from "@smartsoft001/crud-shell-app-services";
import { IUser } from "@smartsoft001/users";
import { User } from "@smartsoft001/nestjs";
import { IEntity } from "@smartsoft001/domain-core";
import {AuthJwtGuard} from "../../guards/auth/auth.guard";

@Controller("")
export class CrudController<T extends IEntity<string>> {
  constructor(private readonly service: CrudService<T>) {}

  static getLink(req: Request): string {
    return req.protocol + "://" + req.headers.host + req.url;
  }

  @UseGuards(AuthJwtGuard)
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

  @UseGuards(AuthJwtGuard)
  @Post('bulk')
  async createMany(
      @Body() data: T[],
      @User() user: IUser,
      @Res() res: Response
  ): Promise<Response> {
    const result = await this.service.createMany(data, user);
    return res.send(result);
  }

  @UseGuards(AuthJwtGuard)
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

  @UseGuards(AuthJwtGuard)
  @Get()
  async read(
    @User() user: IUser,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    const object = this.getQueryObject(req.query);

    const { data, totalCount } = await this.service.read(
      object.criteria,
      object.options,
      user
    );

    if (req.headers['content-type'] === 'text/csv') {
      res.set({
        'Content-Type': 'text/csv'
      });
      res.send(this.parseToCsv(data));
    }

    res.send({
      data,
      totalCount,
      links: object.links(CrudController.getLink(req).split('?')[0], totalCount)
    });
  }

  @UseGuards(AuthJwtGuard)
  @Put(":id")
  async update(
    @Param() params: { id: string },
    @Body() data: T,
    @User() user: IUser
  ): Promise<void> {
    await this.service.update(params.id, data, user);
  }

  @UseGuards(AuthJwtGuard)
  @Patch(":id")
  async updatePartial(
    @Param() params: { id: string },
    @Body() data: Partial<T>,
    @User() user: IUser
  ): Promise<void> {
    await this.service.updatePartial(params.id, data, user);
  }

  @UseGuards(AuthJwtGuard)
  @Delete(":id")
  async delete(
    @Param() params: { id: string },
    @User() user: IUser
  ): Promise<void> {
    await this.service.delete(params.id, user);
  }

  private getQueryObject(queryObject: any): { criteria, options, links} {
    let customCriteria = {} as any;
    let q = '';

    Object.keys(queryObject).forEach(key => {
      q += `&${key}=${queryObject[key]}`;
    });

    const result = q2m(q);

    if (result.criteria['$search']) {
      customCriteria = { $text: { $search: ' \"' + result.criteria['$search'].toString() + '\" ' } };

      delete result.criteria['$search'];

      result.criteria = {
        ...result.criteria,
        ...customCriteria
      }
    }

    return result;
  }

  private parseToCsv(data: T[]): string {
    if (!data || !data.length) {
      return ''
    }

    const fields = [];

    const execute = (item, baseKey, baseItem) => {
      Object.keys(item).forEach(key => {
        if (fields.some(f => f === baseKey + key)) return;

        const val = item[key];

        if (_.isArray(val)) {
          return;
        } else if (_.isObject(val) && Object.keys(val).length) {
          execute(val, baseKey + key + '_', baseItem);
        } else if (baseKey) {
          baseItem[baseKey + key] = val;
          fields.push(baseKey + key);
        } else {
          fields.push(key);
        }
      });
    };

    data.forEach(item => {
      execute(item, '', item);
    });

    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (!fields.some(f => f === key)) {
          delete item[key];
        }
      })
    });

    return new Parser(fields).parse(data);
  }
}
