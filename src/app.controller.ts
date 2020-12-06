import {Controller, Delete, Get, Header, HttpCode, Options, Post, Put, Req} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthRequest, ImageCreateRequest} from './schemas';
import {Request} from 'express';
import {ApiBody, ApiParam, ApiResponse, ApiSecurity, ApiTags} from '@nestjs/swagger';
import {Image, ImageCreate} from './types';
import {ALLOW_CREDENTIALS, ALLOW_HEADERS, ALLOW_METHOD, ALLOW_ORIGIN_ALL, CONTENT_LENGTH} from './consts';
import {AUTH_ERROR, AUTH_SUCCESS, GET_IMAGE_LIST_SUCCESS, MANIPULATE_IMAGE_SUCCESS} from './api.responses';

@Controller()
@ApiTags('image-app')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Post('/auth')
    @ApiBody({
        type: AuthRequest,
        description: 'Объект с логином пользователя',
    })
    @Header(...ALLOW_ORIGIN_ALL)
    @ApiResponse(AUTH_SUCCESS)
    authUser(
        @Req() request: Request<null, {login: string}>
    ): Promise<string> {
        return this.appService.authUser(request.body.login);
    }

    @Get('/list')
    @ApiSecurity('apiKey')
    @Header(...ALLOW_ORIGIN_ALL)
    @ApiResponse(GET_IMAGE_LIST_SUCCESS)
    @ApiResponse(AUTH_ERROR)
    async getImageList(
        @Req() request: Request
    ): Promise<Image[]> {
        await this.appService.checkRequest(request.headers.authorization);
        return this.appService.getImageList();
    }

    @Get('/list/:id')
    @ApiSecurity('apiKey')
    @ApiParam({
        name: 'id',
        description: 'id картинки',
    })
    @Header(...ALLOW_ORIGIN_ALL)
    @ApiResponse(MANIPULATE_IMAGE_SUCCESS)
    @ApiResponse(AUTH_ERROR)
    async getImageById(
        @Req() request: Request<{id: string}>
    ): Promise<Image> {
        await this.appService.checkRequest(request.headers.authorization);
        return this.appService.getImageById(request.params.id);
    }

    @Post('/list')
    @ApiSecurity('apiKey')
    @ApiBody({
        type: ImageCreateRequest,
        description: 'Объект создания картинки',
    })
    @Header(...ALLOW_ORIGIN_ALL)
    @ApiResponse(MANIPULATE_IMAGE_SUCCESS)
    @ApiResponse(AUTH_ERROR)
    async createImage(
        @Req() request: Request<null, ImageCreate>
    ): Promise<Image> {
        const {login} = await this.appService.checkRequest(request.headers.authorization);
        return this.appService.addImage(login, request.body)
    }

    @Put('/list/:id')
    @ApiSecurity('apiKey')
    @ApiParam({
        name: 'id',
        description: 'id картинки',
    })
    @Header(...ALLOW_ORIGIN_ALL)
    @ApiResponse(MANIPULATE_IMAGE_SUCCESS)
    @ApiResponse(AUTH_ERROR)
    async toggleLike(
        @Req() request: Request<{id: string}>
    ): Promise<Image> {
        const {login} = await this.appService.checkRequest(request.headers.authorization);
        return this.appService.toggleLike(login, request.params.id);
    }

    @Delete('/list/:id')
    @ApiSecurity('apiKey')
    @ApiParam({
        name: 'id',
        description: 'id картинки',
    })
    @Header(...ALLOW_ORIGIN_ALL)
    @ApiResponse(MANIPULATE_IMAGE_SUCCESS)
    @ApiResponse(AUTH_ERROR)
    async deleteImage(
        @Req() request: Request<{id: string}>
    ): Promise<Image> {
        const {login} = await this.appService.checkRequest(request.headers.authorization);
        return this.appService.deleteImageById(login, request.params.id);
    }
    
    @Options([
        '', '/auth', '/list', '/list/:id'
    ])
    @Header(...ALLOW_ORIGIN_ALL)
    @Header(...ALLOW_METHOD)
    @Header(...ALLOW_CREDENTIALS)
    @Header(...CONTENT_LENGTH)
    @Header(...ALLOW_HEADERS)
    @HttpCode(204)
    async options(): Promise<string> {
        return '';
    }
}
