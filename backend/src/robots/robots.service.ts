import { Injectable } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { Robot } from './entities/robot.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RobotsService {
  constructor(
    @InjectModel(Robot)
    private robotRepository: typeof Robot,
  ){}
  create(createRobotDto: CreateRobotDto) {
    const newRow: CreateRobotDto = {
      x_coord: createRobotDto.x_coord,
      y_coord: createRobotDto.y_coord,
      facing: createRobotDto.facing,
      status: true,
    };
    // TODO - update all existing rows to have status false
    return this.robotRepository.create(newRow as any);
  }

  findAll() {
    //return `This action returns all robots`;
    return this.robotRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} robot`;
  }

  update(id: number, updateRobotDto: UpdateRobotDto) {
    return `This action updates a #${id} robot`;
  }

  remove(id: number) {
    return `This action removes a #${id} robot`;
  }
}
