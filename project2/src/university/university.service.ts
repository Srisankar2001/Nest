import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUniversityDto } from 'src/dto/createUniversity.dto';
import { University } from 'src/typeorm/entity/university.entity';
import { Repository } from 'typeorm';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class UniversityService {
    constructor(
        @InjectRepository(University)
        private readonly universityRepo:Repository<University>
    ){}

    async create(createUniversityDto: CreateUniversityDto): Promise<ResponseDto<any>> {
        const existingUni = await this.universityRepo.findOne({where:{name:createUniversityDto.name}})
        if(existingUni){
            return new ResponseDto<null>(false,"University Name Already Exists",null);
        }
        const newUni = this.universityRepo.create({...createUniversityDto});
        await this.universityRepo.save(newUni);
         return new ResponseDto<null>(false,"University Created Successfully",null);
    }
    async getAll(): Promise<ResponseDto<any>> {
        const unis = await this.universityRepo.find();
        return new ResponseDto<University[]>(false,"Universities Fetched Successfully",unis);
    }
}
