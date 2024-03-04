import { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql';
import { MemberType } from './member.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';
import { Context } from './context.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: { type: new GraphQLNonNull(UserType) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (
        parent: { memberTypeId: string },
        _args,
        context: Context,
      ) => {
        return await context.prisma.memberType.findUnique({
          where: { id: parent.memberTypeId },
        });
      },
    },
    MemberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
