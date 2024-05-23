import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/Users.entity';
import { Orders } from 'src/entity/Orders.entity';
import { Roles } from 'src/entity/Roles.entity';
import { Customers } from 'src/entity/Customers.entity';
import { Categories } from 'src/entity/Categories.entity';
import { Persons } from 'src/entity/Persons.entity';
import { Products } from 'src/entity/Products.entity';
import { OrdersDetails } from 'src/entity/OrdersDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Roles,/*
      Orders,
      Customers,
      Categories,
      Persons,
      Products,
      OrdersDetails,*/
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
