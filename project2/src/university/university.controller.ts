import { Body, Controller, Get, Post } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from 'src/dto/createUniversity.dto';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('university')
export class UniversityController {
    constructor(
        private readonly universityService:UniversityService
    ){}

    @Get("/")
    async getAll():Promise<ResponseDto<any>>{
        return this.universityService.getAll();
    }

    @Post("/")
    async create(@Body() createUniversityDto:CreateUniversityDto):Promise<ResponseDto<any>>{
        return this.universityService.create(createUniversityDto);
    }
}
