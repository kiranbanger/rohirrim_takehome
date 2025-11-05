import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RobotsService } from './robots.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';

@Controller('robots')
export class RobotsController {
  constructor(private readonly robotsService: RobotsService) {}

  @Post()
  create(@Body() params: any) {
    return this.robotsService.create(params);
  }

  @Get()
  findLatest(){
    return this.robotsService.findLatest();
  }
  // /////////////////////////////////////////////////////////
  // @Get()
  // findAll() {
  //   return this.robotsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.robotsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRobotDto: UpdateRobotDto) {
  //   return this.robotsService.update(+id, updateRobotDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.robotsService.remove(+id);
  // }
}
