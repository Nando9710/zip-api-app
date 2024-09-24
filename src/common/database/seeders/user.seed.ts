import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {

    console.log('seeding first user...');
    const userRepository = dataSource.getRepository(User);
    await userRepository.save(
      {
        name: 'firstUser',
        lastName: 'firstUser',
        email: 'firstUser@gmail.com',
        password: await bcrypt.hash('FirstUser123*', 10),
        files: []
      }
    );
  }
}