import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config();

const configService = new ConfigService();
export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_HOST'),
  port: configService.getOrThrow('MYSQL_PORT'),
  database: configService.getOrThrow('MYSQL_DATABASE'),
  username: configService.getOrThrow('MYSQL_USERNAME'),
  password: configService.getOrThrow('MYSQL_ROOT_PASSWORD'),
  synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
  migrations: ["./src/common/database/migrations/*{.ts,.js}"],
  entities: ["./src/modules/**/*.entity{.ts,.js}"],
  seeds: ['./src/common/database/seeders/{.ts,.js}'],
  factories: ['./src/common/database/factories/*{.ts,.js}']
}
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;