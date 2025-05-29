import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDto } from '../dto/response.dto';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @Get("/all")
    getAll():Promise<ResponseDto<any>>{
        return this.userService.getAll();
    }

    @Get("/:id")
    get(@Param('id') id : string):Promise<ResponseDto<any>>{
        return this.userService.get(id);
    }

    @Post("/")
    create(@Body() createUserDto : CreateUserDto):Promise<ResponseDto<any>>{
        return this.userService.create(createUserDto);
    }
}
