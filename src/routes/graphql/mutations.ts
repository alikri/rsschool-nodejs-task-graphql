import { GraphQLNonNull, GraphQLObjectType, GraphQLOutputType } from 'graphql';
import { CreateUserInputType, UserType } from './types/user.js';
import { Context } from './types/context.js';
import { Post, Profile, User } from '@prisma/client';
import { CreatePostInputType, PostType } from './types/post.js';
import { CreateProfileInputType, ProfileType } from './types/profile.js';


export const Mutations = new GraphQLObjectType<unknown, Context>({
  name: 'Mutations',
  fields: {
    createUser: {
      type: UserType as GraphQLOutputType,
      args: { dto: { type: new GraphQLNonNull(CreateUserInputType) } },
      resolve: async (_, args: { dto: User }, context): Promise<User> => {
        return await context.prisma.user.create({
          data: args.dto,
        });
      },
    },
    createPost: {
      type: PostType as GraphQLOutputType,
      args: { dto: { type: new GraphQLNonNull(CreatePostInputType) } },
      resolve: async (_, args: { dto: Post }, context): Promise<Post> => {
        return await context.prisma.post.create({
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: ProfileType as GraphQLOutputType,
      args: { dto: { type: new GraphQLNonNull(CreateProfileInputType) } },
      resolve: async (_, args: { dto: Profile }, context): Promise<Profile> => {
          return context.prisma.profile.create({
            data: args.dto,
          });
      },
    },
  },
});