import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './models/inputs/createUserInput';
import { Room } from 'src/room/model/room.model';
import { RoomService } from 'src/room/room.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { useUser } from './user.decorator';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private userService: UserService,
    private roomService: RoomService,
  ) {}

  @UseGuards(AuthGuard)
  @Query((returns) => User, { name: 'user' })
  async getUserByID(@useUser() user_id: number) {
    return this.userService.findOneByID(user_id);
  }

  @Query((returns) => User, { name: 'userByEmail' })
  async getUserByEmail(@Args('email', { type: () => String }) email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Mutation((returns) => User, { name: 'register' })
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.createUser(data);
  }

  @ResolveField((returns) => [Room])
  async rooms(@Parent() user: User) {
    return this.roomService.getAllRooms();
  }
}
