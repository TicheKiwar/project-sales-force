
import { IsBoolean, IsDate, IsEmail, IsInt, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { Orders } from "src/entity/Orders.entity";
import { Persons } from "src/entity/Persons.entity";
import { Roles } from "src/entity/Roles.entity";


export class CreateUserDto {
  @IsString()
  @Length(4, 50, { message: 'El nombre de usuario no es válido' })
  username: string;

  @IsString()
  @Length(4, 100, { message: 'La contraseña no es válida' })
  password: string;

  @IsEmail({}, { message: 'El email proporcionado no es válido' })
  @Length(4, 100)
  email: string;

  @IsDate()
  registerDate: Date;

  person: Persons;
  
  orders: Orders[];

  role: Roles;

}
