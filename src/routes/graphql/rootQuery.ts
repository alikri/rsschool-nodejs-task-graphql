import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { MemberType, MemberTypeEnumType } from './types/member.js';
import { Context } from './types/context.js';
import { PostType } from './types/post.js';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';
import { UUIDType } from './types/uuid.js';

export const RootQuery = new GraphQLObjectType<unknown, Context>({
  name: 'RootQuery',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(MemberType)),
      resolve: async (_, _args, context) => {
        return context.prisma.memberType.findMany();
      },
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      args: {
        id: { type: new GraphQLNonNull(MemberTypeEnumType) },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: async (_, _args, context) => {
        return context.prisma.post.findMany();
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (_, _args, context) => {
        return context.prisma.user.findMany();
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(ProfileType)),
      resolve: async (_, _args, context) => {
        return context.prisma.profile.findMany();
      },
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    user: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    profile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.prisma.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
  },
});
