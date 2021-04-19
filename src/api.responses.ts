import {ApiProperty, ApiResponseOptions} from '@nestjs/swagger';
import {ImageResponse} from './schemas';

class Error {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;
}

export const AUTH_ERROR: ApiResponseOptions = {
    status: 406,
    description: 'Ошибка, при попытке получить доступ к данным без токена или с не корректным токеном',
    type: Error,
};

export const GET_IMAGE_LIST_SUCCESS: ApiResponseOptions = {
    status: 200,
    description: 'Список всех картинок',
    type: ImageResponse,
    isArray: true
};

export const GET_USER_LIST_SUCCESS: ApiResponseOptions = {
    status: 200,
    description: 'Список всех пользователей',
    type: String,
    isArray: true
};

export const MANIPULATE_IMAGE_SUCCESS: ApiResponseOptions = {
    status: 200,
    description: 'Картинка',
    type: ImageResponse,
};

export const AUTH_SUCCESS: ApiResponseOptions = {
    status: 200,
    description: 'Токен пользователя',
    type: String,
};