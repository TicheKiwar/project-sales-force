import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/domain/entity/Users';
import { Orders } from 'src/domain/entity/Orders';
import { Roles } from 'src/domain/entity/Roles';
import { Customers } from 'src/domain/entity/Customers';
import { Persons } from 'src/domain/entity/Persons';
import { OrdersDetails } from 'src/domain/entity/OrdersDetails';
import { Categories } from 'src/domain/entity/Categories';
import { Products } from 'src/domain/entity/Products';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Orders,
      Roles,
      Customers,
      Persons,
      OrdersDetails,
      Categories,
      Products,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
