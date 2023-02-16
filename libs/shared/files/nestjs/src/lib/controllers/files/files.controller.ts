import {Controller, Delete, Get, Param, Post, Put, Req, Res} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from 'fastify'
import { Http2ServerResponse } from 'http2'
import {
    ApiOperation,
    ApiConsumes,
    ApiParam
} from '@nestjs/swagger';

import {ApiService} from "../../services/api/api.service";

type Request = FastifyRequest;
type Response = FastifyReply<any>;

@Controller()
export class FilesController {
    constructor(private readonly service: ApiService) {
    }

    @ApiOperation({
        summary: 'Upload a file.',
        requestBody: {
            content: {
                'multipart/form-data': {
                    schema: {
                        type: 'object',
                        properties: { file: { type: 'string', format: 'binary' } },
                    },
                },
            },
        },
    })
    @ApiConsumes('multipart/form-data')
    @Post("")
    async create(@Req() request: Request, @Res() response: Response): Promise<void> {
        const result = await this.service.create(request, response);
        response.code(200).send(result);
    }

    @ApiOperation({
        summary: 'Upload a file.',
        requestBody: {
            content: {
                'multipart/form-data': {
                    schema: {
                        type: 'object',
                        properties: { file: { type: 'string', format: 'binary' } },
                    },
                },
            },
        },
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'file id'
    })
    @ApiConsumes('multipart/form-data')
    @Put(":id")
    async update(@Req() request: Request, @Res() response: Response, @Param() params: { id: string }, @Res() res: Response) {
        await this.service.update(params.id, request, response);
        response.code(201).send();
    }

    @ApiOperation({
        summary: 'Delete a file.'
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'file id'
    })
    @Delete(":id")
    async delete(@Param() params: { id: string }, @Res() response: Response): Promise<void> {
        console.log(params);

        response.code(201).send();
    }

    @ApiOperation({ summary: 'Download a file.' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'file id'
    })
    @Get(':id')
    downloadFile(
        @Param('id') id: string,
        @Req() request: Request,
        @Res() response: Response,
    ) {
        return this.service.read(id, request, response);
    }
}
