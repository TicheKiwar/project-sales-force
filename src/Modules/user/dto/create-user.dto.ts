
import { IsBoolean, IsDate, IsEmail, IsInt, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { Orders } from "src/entities/Orders.entity";

export class CreateUserDto {
  @IsInt()
  @IsOptional()
  userId: number;

  @IsString()
  @Length(1, 50)
  username: string;

  @IsString()
  @Length(1, 100)
  password: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsDate()
  registerDate: Date;

  @IsOptional()
  @IsBoolean()
  deletedStatus: boolean | null;

  orders: Orders[];



}
