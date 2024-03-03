import { GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { MemberType, MemberTypeEnumType } from './types/member.js';
import { Context } from './types/context.js';

export const RootQuery = new GraphQLObjectType<unknown, Context>({
  name: 'RootQuery',
  fields: {
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
  },
});
