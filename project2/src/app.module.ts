import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entity/user.entity';
import { UniversityModule } from './university/university.module';
import { CourseModule } from './course/course.module';
import { University } from './typeorm/entity/university.entity';
import { NIC } from './typeorm/entity/nic.entity';
import { Course } from './typeorm/entity/course.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "20011112",
      database: "nest",
      entities:[User,University,NIC,Course],
      synchronize: true
    }),
    UserModule,
    UniversityModule,
    CourseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
