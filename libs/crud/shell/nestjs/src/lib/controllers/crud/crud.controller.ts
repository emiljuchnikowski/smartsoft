import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UseGuards} from "@nestjs/common";
import {Response } from 'express';
import {AuthGuard} from "@nestjs/passport";

import {CrudService} from "@smartsoft001/crud-shell-app-services";
import {IUser} from "@smartsoft001/users";
import {User} from "@smartsoft001/nestjs";
import {IEntity} from "@smartsoft001/domain-core";

@Controller('')
export class CrudController<T extends IEntity<string>> {
    constructor(private readonly service: CrudService<T>) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() data: T, @User() user: IUser, @Res() res: Response): Promise<Response> {
        const id = await this.service.create(data, user);
        res.set('Location', res.req.protocol + "://" + res.req.headers.host + res.req.url + id);
        return res.send();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async readById(@Param() params: { id: string }, @User() user: IUser): Promise<T> {
        return this.service.readById(params.id, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async read(@User() user: IUser): Promise<T[]> {
        return this.service.read(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param() params: { id: string }, @Body() data: T, @User() user: IUser): Promise<void> {
        await this.service.update(params.id, data, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updatePartial(@Param() params: { id: string }, @Body() data: Partial<T>, @User() user: IUser): Promise<void> {
        await this.service.updatePartial(params.id, data, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param() params: { id: string }, @User() user: IUser): Promise<void> {
        await this.service.delete(params.id, user);
    }
}
