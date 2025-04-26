import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './entities/user.entity';

import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
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
      controllers: [],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });
  beforeEach(async () => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  afterAll(async () => {
    await userModel.deleteMany();
  });

  describe('Create', () => {
    const newUser = {
      email: 'test@test.com',
      password: 'test',
    };
    it("creates user if it doesn't exist ", async () => {
      await service.create(newUser.email, newUser.password);
      expect(
        await userModel.find({ email: 'test@test.com' }).countDocuments(),
      ).toBe(1);
    });
    it('only one user per email should exist ', async () => {
      await expect(
        service.create(newUser.email, newUser.password),
      ).rejects.toThrow(
        new ConflictException(
          `User with email ${newUser.email} already exists`,
        ),
      );
    });
    afterAll(async () => {
      await userModel.deleteMany();
    });
  });
});
