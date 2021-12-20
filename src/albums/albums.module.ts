import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumDocument, AlbumSchema } from './album.model';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        inject: [ConfigService],
        name: 'Album',
        useFactory(configService: ConfigService) {
          const schema = AlbumSchema;
          const appRootURL = configService.get<string>('APP_ROOT_URL');
          const appName = configService.get<string>('APP_NAME').toLowerCase();

          schema.pre('save', function (this: AlbumDocument, next) {
            this.uri = `${appName}:album:${this.id}`;
            this.set(
              `external_urls.${appName}`,
              `${appRootURL}/album/${this.id}`,
            );

            next();
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
