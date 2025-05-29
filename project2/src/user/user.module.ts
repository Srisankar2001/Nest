import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entity/user.entity';
import { University } from 'src/typeorm/entity/university.entity';
import { Course } from 'src/typeorm/entity/course.entity';
import { NIC } from 'src/typeorm/entity/nic.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,University,Course,NIC])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
