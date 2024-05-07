import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { UserRole } from "src/utils/enums";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "users", timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true, index: true, match: /.+\@.+\..+/ })
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Prop({ required: false, type: [Types.ObjectId], ref: "Word" })
  dictionary: { required: false, type: Types.ObjectId[], ref: "Word" };

  @Prop({ required: false })
  profilePictureUrl: string;

  @Prop({ default: 0 })
  points: number;

  @Prop({ default: 0 })
  diamonds: number;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop({
    type: {
      code: { type: String, match: /^\d{6}$/ },
      expiresIn: { type: Date },
    },
    _id: false,
    required: false,
  })
  activationCode?: {
    code: string;
    expiresIn: Date;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
