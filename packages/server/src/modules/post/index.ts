import { Logger, Module } from '@nestjs/common';
import { PostController } from './controller';
import { PostService } from './service';
import { DatabaseService } from '@modules/database/service';

@Module({
  controllers: [PostController],
  providers: [PostService, DatabaseService, Logger]
})
export class PostModule {}
