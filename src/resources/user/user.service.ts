import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  create(dto: CreateUserDto) {
    const user = new this.userModel(dto);
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findByToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    return this.userModel.findById(decodedToken.id);
  }

  async activateUserByActivationCode(userId: string, activationCode: string) {
    const user = await this.userModel.findById(userId).exec();
    if (user.activationCode && user.activationCode.code === activationCode &&
      new Date() < user.activationCode.expiresIn) {
      user.isActivated = true;
      user.activationCode = undefined;
      await user.save();
      return user;
    }
  }
}
