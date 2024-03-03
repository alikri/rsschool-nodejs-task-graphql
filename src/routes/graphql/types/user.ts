import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { PostType } from './post.js';
import { SubscriberOnAuthorsType } from './subscriber.js';
import { User } from '@prisma/client';

export const UserType = new GraphQLObjectType<User>({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    posts: { type: new GraphQLNonNull(new GraphQLList(PostType)) },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(SubscriberOnAuthorsType)),
    },
    subscribedToUser: { type: new GraphQLNonNull(new GraphQLList(UserType)) },
  }),
});
