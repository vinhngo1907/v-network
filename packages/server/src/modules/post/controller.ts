import { Controller, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './service';

@Injectable()
@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }
}
