import { Module } from '@nestjs/common';
import { IdeaController } from './controller';
import { IdeaService } from './service';

@Module({
  controllers: [IdeaController],
  providers: [IdeaService]
})
export class IdeaModule {}
