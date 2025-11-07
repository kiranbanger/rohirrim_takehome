import { Injectable } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { Robot } from './entities/robot.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Logger } from '@nestjs/common';

@Injectable()
export class RobotsService {
  constructor(
    @InjectModel(Robot)
    private robotRepository: typeof Robot,
  ) {}

  async create(createRobotDto: CreateRobotDto) {
    const newRow: CreateRobotDto = {
      x_coord: createRobotDto.x_coord,
      y_coord: createRobotDto.y_coord,
      facing: createRobotDto.facing,
      status: true,
    };

    const latest = await this.findLatest();
    Logger.log(latest, 'info');
    if (latest.length > 1) {
      console.log('Too many active tiles');
    }
    // gather all ids
    // set status to false
    latest.forEach((l: Robot) => {
      void this.updateStatus(l.id);
    });
    return this.robotRepository.create(newRow as any);
  }

  findLatest(){
    return this.robotRepository.findAll({
      //attributes: ['id'],
      where: { status: true },
    });
  }

  // findAll() {
  //   //return `This action returns all robots`;
  //   return this.robotRepository.findAll({where: {status: true}});
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} robot`;
  // }

  updateStatus(id: number ) {
    return this.robotRepository.update(
      {status: false},
      {where: { id: id }},
    );
  }

  // remove(id: number) {
  //   return `This action removes a #${id} robot`;
  // }
}
