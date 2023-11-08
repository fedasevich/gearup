import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GroupCreationAttrs {
  code: string;
  lat: string;
  lon: string;
  name: string;
  city: string;
  state: string;
  country: string;
  woeid: string;
  tz: string;
  phone: string;
  type: string;
  email: string;
  url: string;
  runway_length: string;
  elev: string;
  icao: string;
  direct_flights: string;
  carriers: string;
}

@Table({ tableName: "airport" })
export class Airport extends Model<Airport, GroupCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  code!: string;

  @Column({
    type: DataType.STRING,
  })
  lat!: string;

  @Column({
    type: DataType.STRING,
  })
  lon!: string;

  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
  })
  country!: string;

  @Column({
    type: DataType.STRING,
  })
  type!: string;

  @Column({
    type: DataType.STRING,
  })
  icao!: string;
}
