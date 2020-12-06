import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose/dist/mongoose.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DB_IMAGES, DB_AUTHORS, MONGO_URL} from './consts';
import {AuthorDocument, AuthorScheme, ImageDocument, ImageScheme} from './schemas';

@Module({
    imports: [
        MongooseModule.forRoot(`${MONGO_URL}/${DB_AUTHORS}`, {
            connectionName: DB_AUTHORS,
        }),
        MongooseModule.forRoot(`${MONGO_URL}/${DB_IMAGES}`, {
            connectionName: DB_IMAGES,
        }),
        MongooseModule.forFeature([
            {name: AuthorDocument.name, schema: AuthorScheme},
        ], DB_AUTHORS),
        MongooseModule.forFeature([
            {name: ImageDocument.name, schema: ImageScheme},
        ], DB_IMAGES),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
