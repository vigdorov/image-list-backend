import {ApiProperty} from '@nestjs/swagger/dist/decorators';
import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Author, Image} from './types';

export class AuthRequest {
    @ApiProperty()
    login: string;
}

export class ImageCreateRequest {
    @ApiProperty()
    url: string;
}

export class AuthorResponse implements Author {
    @ApiProperty()
    login: string;

    @ApiProperty()
    token: string;
}

export class ImageResponse implements Image {
    @ApiProperty()
    url: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    likes: string[];

    @ApiProperty()
    id: string;
}

@Schema()
export class AuthorDocument extends Document {
    @Prop({
        type: String,
        required: true,
    })
    login: string;

    @Prop({
        type: String,
        required: true,
    })
    token: string;
}

@Schema()
export class ImageDocument extends Document {
    @Prop({
        type: String,
        required: true,
    })
    url: string;

    @Prop({
        type: String,
        required: true,
    })
    author: string;

    @Prop({
        type: [String],
        required: true,
    })
    likes: string[];
}

export const ImageScheme = SchemaFactory.createForClass(ImageDocument);
export const AuthorScheme = SchemaFactory.createForClass(AuthorDocument);
