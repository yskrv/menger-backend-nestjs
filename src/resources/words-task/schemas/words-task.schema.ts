import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type WordsTasksDocument = HydratedDocument<WordsTask>;

@Schema({ collection: "wordsTasks", timestamps: false })
export class WordsTask {
  @Prop({ required: true, type: Types.ObjectId, ref: "Word" })
  wordId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: "Level" })
  levelId: Types.ObjectId;

  @Prop()
  wrongOptions: string[];

  @Prop()
  points: number;

  @Prop()
  diamonds: number;

  @Prop()
  isKazakh: boolean;
}

export const WordsTaskSchema = SchemaFactory.createForClass(WordsTask);
