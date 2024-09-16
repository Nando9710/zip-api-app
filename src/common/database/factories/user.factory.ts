import { User } from 'src/modules/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email({ firstName: user.name, lastName: user.lastName });
  user.files = [];

  return user;
})