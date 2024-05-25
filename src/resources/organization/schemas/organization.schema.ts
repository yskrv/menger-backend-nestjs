import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({ collection: "organizations", timestamps: true })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: false, type: [Types.ObjectId], ref: "User" })
  managers: [Types.ObjectId];

  @Prop({ required: false, type: [Types.ObjectId], ref: "User" })
  students: [Types.ObjectId];

  @Prop({ required: false, type: [Types.ObjectId], ref: "Course" })
  courses: [Types.ObjectId];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
