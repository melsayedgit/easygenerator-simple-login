import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './entities/user.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthService } from '../auth/auth.service';
import { INestApplication } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthController } from '../auth/auth.controller';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let app: INestApplication;
  let service: UsersService;
  let userModel: Model<
    User,
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    UserDocument
  >;
  const newUser = {
    email: 'test@test.com',
    password: 'test',
    profile: {
      name: 'mohamed',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UsersController, AuthController],
      providers: [UsersService, AuthService, JwtStrategy, JwtService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));

    await userModel.deleteMany();
    await service.create(newUser.email, newUser.password, newUser.profile);
  });
  afterAll(async () => {
    await userModel.deleteMany();
    await app.close();
  });

  describe('my-details', () => {
    it('should return loged in user details', async () => {
      const reuslt: { body: { accessToken: string } } = await request(
        app.getHttpServer(),
      )
        .post('/auth/signin')
        .send({
          email: 'test@test.com',
          password: 'test',
        });

      const reusltUser: { body: { accessToken: string } } = await request(
        app.getHttpServer(),
      )
        .get('/users/my-details')
        .set('Authorization', `Bearer ${reuslt.body.accessToken}`)
        .expect(200);

      expect(reusltUser.body).toMatchObject({
        email: 'test@test.com',
        profile: {
          name: 'mohamed',
        },
      });
    });
  });
});
