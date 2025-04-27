import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '../users/entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
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
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),

        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [AuthController],
      providers: [UsersService, AuthService, JwtService],
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

  describe('signin', () => {
    it('should signin', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'test@test.com',
          password: 'test',
        })
        .expect(201);
    });

    it('should not signin with invalid email', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'invalid',
          password: 'test',
        })
        .expect(401);
    });

    it('should not signin with invalid password', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'test@test.com',
          password: 'invalid',
        })
        .expect(401);
    });
  });
  describe('signup', () => {
    it('should signup a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'newuser@test.com',
          password: 'newpassword',
          profile: {
            name: 'new user',
          },
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('email', 'newuser@test.com');
        });
    });

    it('should not signup a user with existing email', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test@test.com',
          password: 'newpassword',
          profile: {
            name: 'another user',
          },
        })
        .expect(409);
    });
  });
});
