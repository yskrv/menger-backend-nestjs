import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type LevelDocument = HydratedDocument<Level>;

@Schema({ collection: "levels", timestamps: false })
export class Level {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  order: number;

  @Prop({ required: true, type: Types.ObjectId, ref: "Course" })
  courseId: Types.ObjectId;

  @Prop({ required: true, type: [Types.ObjectId], ref: "WordsTask", default: [] })
  wordsTasks: Types.ObjectId[];
}

export const LevelSchema = SchemaFactory.createForClass(Level);
