import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [FileModule, UserModule],
})
export class ModulesModule {}
