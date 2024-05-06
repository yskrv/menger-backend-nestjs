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

  @Prop({ type: Types.ObjectId, ref: "Course" })
  courseId: { required: false; type: Types.ObjectId; ref: "Course" };
}

export const LevelSchema = SchemaFactory.createForClass(Level);
