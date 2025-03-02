import { Module } from '@nestjs/common';
import { PostController } from './controller';
import { PostService } from './service';

@Module({
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
