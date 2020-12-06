import {BadRequestException, Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {v4} from 'uuid';
import {AuthorDocument, ImageDocument} from './schemas';
import {Author, Image, ImageCreate} from './types';

@Injectable()
export class AppService {
    constructor(
        @InjectModel(AuthorDocument.name) private authorModel: Model<AuthorDocument>,
        @InjectModel(ImageDocument.name) private imageModel: Model<ImageDocument>,
    ) { }

    async checkRequest(token?: string): Promise<Author> {
        const authorList = await this.authorModel.find().exec();
        const searchAuthor = authorList.find((author) => author.token === token);
        if (searchAuthor) {
            return {
                login: searchAuthor.login,
                token: searchAuthor.token,
            };
        }
        throw new NotAcceptableException(`Доступ запрещен`);
    }

    async getImageList(): Promise<Image[]> {
        const imageList = await this.imageModel.find().exec();
        return imageList.map(({url, author, likes, id}) => ({
            url,
            author,
            likes,
            id,
        }));
    }

    async authUser(login: string): Promise<string> {
        const authorList = await this.authorModel.find().exec();
        const searchAuthor = authorList.find((author) => author.login === login);
        if (searchAuthor) {
            return searchAuthor.token;
        }
        const Model = await this.authorModel;
        const userModel = new Model({
            login,
            token: v4(),
        });
        const newUser = await userModel.save();
        return newUser.token;
    }

    async addImage(login: string, image: ImageCreate): Promise<Image> {
        const Model = await this.imageModel;
        const imageModel = new Model({
            url: image.url,
            likes: [],
            author: login,
        });
        try {
            await imageModel.validate();
        } catch (e) {
            throw new BadRequestException(e.message);
        }

        const newImage = await imageModel.save();
        return {
            url: newImage.url,
            author: newImage.author,
            likes: [],
            id: newImage.id,
        };
    }

    async getImageById(id: string): Promise<Image> {
        const searchImage = await this.imageModel.findById(id);
        if (searchImage) {
            return {
                url: searchImage.url,
                author: searchImage.author,
                likes: searchImage.likes,
                id: searchImage.id,
            };
        }
        throw new BadRequestException(`Картинка с id - "${id}" не найдена`);
    }

    async deleteImageById(login: string, id: string): Promise<Image> {
        const searchImage = await this.imageModel.findById(id);
        if (!searchImage) {
            throw new BadRequestException(`Картинка с id - "${id}" не найдена`);
        }
        if (searchImage.author !== login) {
            throw new NotAcceptableException(`Нельзя удалить чужую картинку`);
        }
        const Model = await this.imageModel;

        await Model.findByIdAndDelete(id);
        return {
            url: searchImage.url,
            author: searchImage.author,
            likes: searchImage.likes,
            id: searchImage.id,
        };
    }

    async toggleLike(login: string, id: string): Promise<Image> {
        const searchImage = await this.imageModel.findById(id);
        if (!searchImage) {
            throw new BadRequestException(`Картинка с id - "${id}" не найдена`);
        }
        const updatedLikes = searchImage.likes.includes(login)
            ? searchImage.likes.filter(userLogin => userLogin !== login)
            : searchImage.likes.concat(login);
        await searchImage.updateOne({
            likes: updatedLikes,
        });

        return {
            url: searchImage.url,
            author: searchImage.author,
            likes: updatedLikes,
            id: searchImage.id,
        };
    }
}
