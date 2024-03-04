import { GraphQLNonNull, GraphQLObjectType, GraphQLOutputType } from 'graphql';
import { ChangeUserInputType, CreateUserInputType, UserType } from './types/user.js';
import { Context } from './types/context.js';
import { Post, Profile, User } from '@prisma/client';
import { ChangePostInputType, CreatePostInputType, PostType } from './types/post.js';
import { ChangeProfileInputType, CreateProfileInputType, ProfileType } from './types/profile.js';
import { UUIDType } from './types/uuid.js';


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
    deleteUser: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }, context): Promise<string> => {
        await context.prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return args.id;
      },
    },
    deletePost: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }, context): Promise<string> => {
        await context.prisma.post.delete({
          where: {
            id: args.id,
          },
        });
        return args.id;
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }, context): Promise<string> => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
        return args.id;
      },
    },
    changeUser: {
      type: UserType as GraphQLOutputType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInputType) },
      },
      resolve: async (
        _,
        args: { id: string; dto: Partial<User> },
        context,
      ): Promise<User> => {
        return context.prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInputType) },
      },
      resolve: async (
        _,
        args: { id: string; dto: Partial<Post> },
        context,
      ): Promise<Post> => {
        return context.prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
      },
      resolve: async (
        _,
        args: { id: string; dto: Partial<Profile> },
        context,
      ): Promise<Profile> => {
        return context.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
  },
});