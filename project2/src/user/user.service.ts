import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { ResponseDto } from '../dto/response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entity/user.entity';
import { In, Repository } from 'typeorm';
import { University } from 'src/typeorm/entity/university.entity';
import { Course } from 'src/typeorm/entity/course.entity';
import { NIC } from 'src/typeorm/entity/nic.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(University)
        private readonly universityRepo: Repository<University>,
        @InjectRepository(Course)
        private readonly courseRepo: Repository<Course>,
        @InjectRepository(NIC)
        private readonly nicRepo: Repository<NIC>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<ResponseDto<any>> {
        const nic = await this.nicRepo.findOneBy({id:createUserDto.nic});
        if(nic){
            return new ResponseDto<null>(false, "NIC Already Exist", null);
        }
        const university = await this.universityRepo.findOneBy({id:createUserDto.university})
        if(!university){
            return new ResponseDto<null>(false, "University not found", null);
        }
        const courses = await this.courseRepo.findBy({id: In(createUserDto.courses)})
        if(courses.length !== createUserDto.courses.length){
            return new ResponseDto<null>(false, "Course not found", null);
        }
        const newNIC = this.nicRepo.create({id:createUserDto.nic});
        const savedNIC = await this.nicRepo.save(newNIC);
        const newUser = this.userRepo.create({
            name:createUserDto.name,
            age:createUserDto.age,
            university:university,
            courses:courses,
            nic:savedNIC
        });
        await this.userRepo.save(newUser);
        return new ResponseDto<null>(true, "User Created Successfully", null);
    }

    async getAll(): Promise<ResponseDto<any>> {
        const users = await this.userRepo.find({relations: ['university', 'courses', 'nic']});
        return new ResponseDto<User[]>(true, "Users Fetched Successfully", users);
    }

    async get(id: string): Promise<ResponseDto<any>> {
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return new ResponseDto<null>(false, "Not a valid ID", null);
        }

        const user = await this.userRepo.findOne({ where: { id: numericId } });
        if (user === null) {
            return new ResponseDto<null>(false, "ID not found", null);
        }
        return new ResponseDto<User>(true, "User Fetched Successfully", user);
    }
}
