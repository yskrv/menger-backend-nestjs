import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type WordDocument = HydratedDocument<Word>;

@Schema({ collection: "words", timestamps: false })
export class Word {
  @Prop()
  kaz: string;

  @Prop()
  eng: string;

  @Prop()
  transcription: string;

  @Prop()
  imageUrl: string;

  @Prop()
  audioUrl: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);
