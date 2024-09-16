// import { EntityManager } from "typeorm"
// import * as bcrypt from 'bcrypt';

// import dataSource from "typeorm.config"
// import { User } from "src/modules/user/entities/user.entity";

// const userSeed = async () => {
//   if (!dataSource.isInitialized) await dataSource.initialize();
//   // const entityManager: EntityManager = dataSource.createEntityManager()

//   // const now = new Date()
//   // const userValue = [{
//   //   id: 'cd0b5fa3-8343-4d60-b24c-a58515565e66',
//   //   name: 'admin',
//   //   lastName: 'admin',
//   //   email: 'admin@admin.admin',
//   //   password: await bcrypt.hash('Admin123*', 10),
//   //   createdAt: now,
//   //   updatedAt: now,
//   // }]

//   const repository = dataSource.getRepository(User);
//   return await repository.insert({
//     id: 'cd0b5fa3-8343-4d60-b24c-a58515565e66',
//     name: 'admin',
//     lastName: 'admin',
//     email: 'admin@admin.admin',
//   });

//   // return await entityManager.save('User', userValue)
// }

// userSeed().then(() => console.log('userSeed pasado'))
// export default userSeed;



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