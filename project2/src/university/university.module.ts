import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from 'src/typeorm/entity/university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([University])],
  controllers: [UniversityController],
  providers: [UniversityService]
})
export class UniversityModule {}
