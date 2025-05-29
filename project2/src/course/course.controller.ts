import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { ResponseDto } from 'src/dto/response.dto';
import { CreateCourseDto } from 'src/dto/createCourse.dto';

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) { }
    @Get("/")
    async getAll(): Promise<ResponseDto<any>> {
        return this.courseService.getAll();
    }

    @Post("/")
    async create(@Body() createCourseDto: CreateCourseDto): Promise<ResponseDto<any>> {
        return this.courseService.create(createCourseDto);
    }
}
