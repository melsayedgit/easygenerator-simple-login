import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { User, UserDocument, UserSchema } from '../users/entities/user.entity';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let userModel: Model<
    User,
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    UserDocument
  >;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });
  describe('validateUser', () => {
    let user: UserDocument;
    beforeAll(async () => {
      user = await usersService.create('test@test.com', 'test');
    });
    it('if correct credentials are provided, it should return the user', async () => {
      console.log(user);

      expect(await service.validateUser('test@test.com', 'test')).toMatchObject(
        {
          email: user.email,
        },
      );
    });
    it('if user entered the wrong credentials, it should throw an error ', async () => {
      await expect(
        service.validateUser('test@test.com', 'wrong'),
      ).rejects.toThrow(new UnauthorizedException('Invalid email or password'));
    });

    afterAll(async () => {
      await userModel.deleteMany();
    });
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
