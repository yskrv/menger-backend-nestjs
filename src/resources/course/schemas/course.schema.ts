import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CourseDocument = HydratedDocument<Course>;

@Schema({ collection: "courses", timestamps: true })
export class Course {
  @Prop({ unique: true })
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

  @Prop({ required: false, type: Types.ObjectId, ref: "Organization" })
  organizationId: { required: false; type: Types.ObjectId; ref: "Organization" };

  @Prop({ required: false, type: [Types.ObjectId], ref: "Level" })
  levels: { required: false, type: Types.ObjectId[], ref: "Level" };
}

export const CourseSchema = SchemaFactory.createForClass(Course);
