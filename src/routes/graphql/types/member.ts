import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';
import { ProfileType } from './profile.js';

export const MemberTypeEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeEnumType) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    profiles: { type: new GraphQLList(ProfileType) },
  }),
});
