import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ collection: "applications", timestamps: true })
export class Application {
  @Prop()
  fullName: string;

  @Prop()
  organizationName: string;

  @Prop({ unique: true, index: true, match: /.+\@.+\..+/ })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  text: string;

  @Prop()
  meetingStartUrl: string;

  @Prop()
  meetingJoinUrl: string;

  @Prop({ default: false })
  isAccepted: boolean;

  @Prop({ type: Date })
  meetingDate: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);