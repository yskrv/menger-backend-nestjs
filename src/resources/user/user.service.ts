import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model, Types } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async create(dto: CreateUserDto) {
    return await new this.userModel(dto).save();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findByToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    return await this.userModel.findById(decodedToken.id);
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

  async addWordToDictionary(token: string, wordId: string) {
    const decodedToken = this.jwtService.decode(token);
    return await this.userModel.findByIdAndUpdate(decodedToken.id, { $addToSet: { dictionary: wordId } }, { new: true });
  }

  async getDictionaryOfUser(token: string) {
    const decodedToken = this.jwtService.decode(token);
    return await this.userModel.findById(decodedToken.id).populate("dictionary");
  }
}
