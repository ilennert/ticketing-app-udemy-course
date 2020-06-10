import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth.repository'
import { userSchema } from '../models/user'
import { PasswordService } from './services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: userSchema
      }
    ])
  ],
  controllers: [ AuthController ],
  providers: [ AuthRepository, PasswordService ]
})
export class AuthModule {}
