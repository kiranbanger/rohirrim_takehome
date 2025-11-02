import { Module } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { RobotsController } from './robots.controller';
import { Robot } from './entities/robot.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Robot])],
  controllers: [RobotsController],
  providers: [RobotsService],
})
export class RobotsModule {}
