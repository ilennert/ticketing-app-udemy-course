import { Test, TestingModule } from '@nestjs/testing';

import { MongooseModule, getModelToken, getConnectionToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { AuthController } from './auth.controller';
import { PasswordService } from './services/password.service';
import { AuthRepository } from './repositories/auth.repository';
import { UserDoc, userSchema } from '../models/user';
import { TestDatabaseModule, closeMongoConnection } from '../testing/test-database.module';

describe('Auth Controller', () => {
  let controller: AuthController;
  let connection: any;

  afterAll(async () => {
    await closeMongoConnection();
    await mongoose.connection.close();
  });
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        MongooseModule.forFeature([
          {
            name: 'User',
            schema: userSchema
          }
        ])
      ],
      controllers: [ AuthController ],
      providers: [
        PasswordService,
        AuthRepository,
        {
          provide: getModelToken('User'),
          useValue: UserDoc,
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    connection = await module.get(getConnectionToken());

    const collections = await connection.db.collections();
  
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
