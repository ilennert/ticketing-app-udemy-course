import { Test, TestingModule } from '@nestjs/testing';

import { getModelToken, MongooseModule, getConnectionToken } from '@nestjs/mongoose';

import { AuthRepository } from './auth.repository';
import { PasswordService } from '../services/password.service';
import { UserDoc, userSchema } from '../../models/user';
import { TestDatabaseModule, closeMongoConnection } from '../../testing/test-database.module';

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let connection: any;

  afterAll(async () => {
      await closeMongoConnection();
      await connection.close();
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
      providers: [
        PasswordService,
        AuthRepository,
        {
          provide: getModelToken('User'),
          useValue: UserDoc,
        }
      ],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
    connection = await module.get(getConnectionToken());

    const collections = await connection.db.collections();
  
    for (let collection of collections) {
        await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(authRepository).toBeDefined();
  });

  it('should return a JWT', async () => {
    const sendUser = {
      email: 'test@test.com',
      password: 'password'
    }
    expect(authRepository.signUp(sendUser)).toBeTruthy();
  });
});
