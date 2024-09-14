import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FileModule, UserModule, AuthModule],
  exports: [AuthModule]
})
export class ModulesModule {}
