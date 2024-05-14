import { Injectable, NotFoundException } from "@nestjs/common";
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
    return await this.userModel.findOne({ email }).populate([{ path: "cart" }, { path: "courses" }]);
  }

  async findByToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    return await this.userModel.findById(decodedToken.id).populate("cart").populate("courses");
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

  async addCourseToCart(token: string, courseId: string) {
    const decodedToken = this.jwtService.decode(token);
    return await this.userModel.findByIdAndUpdate(decodedToken.id, { $addToSet: { cart: courseId } }, { new: true }).populate("cart");
  }

  async removeCourseToCart(token: string, courseId: string) {
    const decodedToken = this.jwtService.decode(token);
    return await this.userModel.findByIdAndUpdate(decodedToken.id, { $pull: { cart: courseId } }, { new: true }).populate("cart");
  }

  async transferCoursesFromCartToCourses(token: string) {
    const userId = this.jwtService.decode(token).id;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cartItems = Array.isArray(user.cart) ? user.cart : [];
    const courseItems = Array.isArray(user.courses) ? user.courses : [];

    if (cartItems.length > 0) {
      user.courses = Array.from(new Set([...courseItems, ...cartItems]));
      user.cart = [];
      await user.save();
    }

    return user;
  }
}
