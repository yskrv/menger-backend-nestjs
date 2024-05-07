import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';

@Module({
  imports: [HttpModule],
  controllers: [GptController],
  providers: [GptService],
  exports: [GptService]
})
export class GptModule { }
