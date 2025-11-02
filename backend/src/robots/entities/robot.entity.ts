import { Column, Table, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'robot_location',
})
export class Robot extends Model {
//  @Column({
//    type: DataType.INTEGER,
//    primaryKey: true,
//    allowNull: false,
//  })
//  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  x_coord: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  y_coord: number;

  @Column({
    type: DataType.ENUM('N', 'S', 'E', 'W'),
    allowNull: false,
  })
  facing: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;

//  @Column({
//    type: DataType.DATE,
//    defaultValue: DataType.NOW,
//  })
//  createdAt: Date;
}
