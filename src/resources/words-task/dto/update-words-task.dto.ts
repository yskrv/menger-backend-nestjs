import { PartialType } from '@nestjs/swagger';
import { CreateWordsTaskDto } from './create-words-task.dto';

export class UpdateWordsTaskDto extends PartialType(CreateWordsTaskDto) {}
