import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ResponseDto } from './dto/response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }
    async create(createUserDto: CreateUserDto): Promise<ResponseDto<any>> {
        const existingUser = await this.userRepo.findOne({ where: { email: createUserDto.email } });
        if (existingUser !== null) {
            return new ResponseDto<null>(false, "Email Already Exist", null);
        }
        const newUser = this.userRepo.create({ ...createUserDto });
        await this.userRepo.save(newUser);
        return new ResponseDto<null>(true, "User Created Successfully", null);
    }

    async getAll(): Promise<ResponseDto<any>> {
        const users = await this.userRepo.find();
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

    async delete(id: string): Promise<ResponseDto<any>> {
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return new ResponseDto<null>(false, "Not a valid ID", null);
        }

        const user = await this.userRepo.findOne({ where: { id: numericId } });
        if (user === null) {
            return new ResponseDto<null>(false, "ID not found", null);
        }

        await this.userRepo.delete({ id: numericId });
        return new ResponseDto<null>(true, "User Deleted Successfully", null);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseDto<any>> {
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return new ResponseDto<null>(false, "Not a valid ID", null);
        }

        const user = await this.userRepo.findOne({ where: { id: numericId } });
        if (user === null) {
            return new ResponseDto<null>(false, "ID not found", null);
        }

        if (updateUserDto.name && user.name !== updateUserDto.name) user.name = updateUserDto.name;
        if (updateUserDto.age && user.age !== updateUserDto.age) user.age = updateUserDto.age;
        if (updateUserDto.email && user.email !== updateUserDto.email) {
            const existingUser = await this.userRepo.findOne({ where: { email: updateUserDto.email } })
            if (existingUser) {
                return new ResponseDto<null>(false, "Email already exists", null);
            }
            user.email = updateUserDto.email;
        }
        await this.userRepo.save(user);
        return new ResponseDto<null>(true, "User Updated Successfully", null);
    }
}
