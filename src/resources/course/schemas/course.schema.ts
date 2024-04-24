import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CourseDocument = HydratedDocument<Course>;

@Schema({ collection: "courses", timestamps: true })
export class Course {
  @Prop()
  slug: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  benefits: string[];

  @Prop()
  price: number;

  @Prop()
  imageUrl: string;

  @Prop({ default: true })
  isPublic: boolean;

  @Prop({ required: false, type: Types.ObjectId, ref: "User" })
  organizationId: { required: false; type: Types.ObjectId; ref: "User" };
}

export const CourseSchema = SchemaFactory.createForClass(Course);
