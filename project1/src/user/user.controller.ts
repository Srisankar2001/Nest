import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDto } from './dto/response.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

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

    @Put("/:id")
    update(@Param('id') id : string, @Body() updateUserDto : UpdateUserDto):Promise<ResponseDto<any>>{
        return this.userService.update(id,updateUserDto);
    }

    @Delete("/:id")
    delete(@Param('id') id : string):Promise<ResponseDto<any>>{
        return this.userService.delete(id);
    }
}
