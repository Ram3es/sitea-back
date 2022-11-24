import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';

import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { AuthModule } from '../auth.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
})
export class GoogleAuthModule {}
