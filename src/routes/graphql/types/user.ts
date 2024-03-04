import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { PostType } from './post.js';

import { ProfileType } from './profile.js';
import { Context } from './context.js';
import { Profile, User } from '@prisma/client';
import { Post } from '@prisma/client';


export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (
        parent: { id: string },
        _args,
        context: Context,
      ): Promise<Post[]> => {
        return context.prisma.post.findMany({
          where: {
            authorId: parent.id,
          },
      });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (
        parent: { id: string },
        _args,
        context: Context,
      ): Promise<User[]> => {
        return await context.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: parent.id,
              },
            },
          },
        });
      },
    },
    profile: {
      type: ProfileType,
      resolve: async (
        parent: { id: string },
        _args,
        context: Context,
      ): Promise<Profile| null> => {
        return await context.prisma.profile.findUnique({
          where: {
            userId: parent.id,
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (
        parent: { id: string },
        _args,
        context: Context,
      ): Promise<User[]> => {
        return await context.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: parent.id,
              },
            },
          },
        });
      },
    },
  }),
});


export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
