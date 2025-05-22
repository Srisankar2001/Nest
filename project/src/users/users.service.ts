import { Injectable } from '@nestjs/common';
import { ResponseDto } from './dto/response.dto';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UpdateUsersDto } from './dto/updateUsers.dto';
import { User } from './model/userModel.model';

@Injectable()
export class UsersService {
    private idCounter: number = 1;
    private userArray: User[] = [];

    private isEmailExist(email: string): boolean {
        const isExist: number = this.userArray.findIndex(user => user.email === email)
        if (isExist === -1) return false;
        return true;
    }

    private getUser(id: number): User | null {
        const user = this.userArray.find(user => user.id === id);
        return user || null;
    }

    getAll(): ResponseDto<User[]> {
        return new ResponseDto<User[]>(true, "All Users Fetched Successfully", this.userArray);
    }

    get(id: number): ResponseDto<null | User> {
        const existingUser = this.getUser(id);
        if (!existingUser) return new ResponseDto<null>(false, "User Not Found", null);
        return new ResponseDto<User>(true, "User Fetched Successfully", existingUser);
    }

    create(createUserDto: CreateUsersDto): ResponseDto<null> {
        const isExist = this.isEmailExist(createUserDto.email);

        if (isExist) return new ResponseDto<null>(false, "Email Already Exist", null);

        const user = new User(this.idCounter, createUserDto.name, createUserDto.age, createUserDto.email);
        this.idCounter++;
        this.userArray.push(user);
        return new ResponseDto<null>(true, "User Created Successfully", null);
    }

    update(id: number, updateUsersDto: UpdateUsersDto): ResponseDto<null> {
        const existingUser = this.getUser(id);

        if (!existingUser) return new ResponseDto<null>(false, "User Not Found", null);

        if (updateUsersDto.name && updateUsersDto.name !== existingUser.name) {
            existingUser.name = updateUsersDto.name;
        }

        if (updateUsersDto.age && updateUsersDto.age !== existingUser.age) {
            existingUser.age = updateUsersDto.age;
        }

        if (updateUsersDto.email && updateUsersDto.email !== existingUser.email) {
            const isExist = this.isEmailExist(updateUsersDto.email);

            if (isExist) return new ResponseDto<null>(false, "Email Already Exist", null);

            existingUser.email = updateUsersDto.email;
        }

        const index = this.userArray.findIndex(user => user.id === id);
        this.userArray[index] = existingUser;
        return new ResponseDto<null>(true, "User Updated Successfully", null);
    }

    delete(id: number): ResponseDto<null> {
        const existingUser = this.getUser(id);

        if (!existingUser) return new ResponseDto<null>(false, "User Not Found", null);

        const newUserArray = this.userArray.filter(user => user.id !== id)
        this.userArray = newUserArray;
        return new ResponseDto<null>(true, "User Deleted Successfully", null);
    }
}
