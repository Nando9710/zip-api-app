import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from '../../../modules/user/entities/user.entity';
import { Files } from '../../../modules/file/entities/file.entity';
import UserSeeder from '../seeders/user.seed';
import UserFactory from '../factories/user.factory';
import { dataSourceOptions } from "typeorm.config"

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    ...dataSourceOptions,
    entities: [User, Files],

    seeds: [UserSeeder],
    factories: [UserFactory]
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize()
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
})();