import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/dto/createCourse.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { Course } from 'src/typeorm/entity/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(
            @InjectRepository(Course)
            private readonly courseRepo:Repository<Course>
        ){}
    
        async create(createCourseDto: CreateCourseDto): Promise<ResponseDto<any>> {
            const existingCourse = await this.courseRepo.findOne({where:{name:createCourseDto.name}})
            if(existingCourse){
                return new ResponseDto<null>(false,"Course Name Already Exists",null);
            }
            const newCourse = this.courseRepo.create({...createCourseDto});
            await this.courseRepo.save(newCourse);
             return new ResponseDto<null>(false,"Course Created Successfully",null);
        }
        async getAll(): Promise<ResponseDto<any>> {
            const courses = await this.courseRepo.find();
            return new ResponseDto<Course[]>(false,"Courses Fetched Successfully",courses);
        }
}
