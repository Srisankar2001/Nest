import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseDto } from './dto/response.dto';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UpdateUsersDto } from './dto/updateUsers.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    getAll(): ResponseDto<any> {
        return this.userService.getAll();
    }

    @Get('/:id')
    get(@Param('id') id: string): ResponseDto<any> {
        return this.userService.get(Number(id));
    }

    @Post()
    create(@Body() createUserDto: CreateUsersDto): ResponseDto<any> {
        return this.userService.create(createUserDto);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto): ResponseDto<any> {
        return this.userService.update(Number(id), updateUsersDto);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): ResponseDto<any> {
        return this.userService.delete(Number(id));
    }
}
