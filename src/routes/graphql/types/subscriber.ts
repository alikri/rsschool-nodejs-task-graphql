import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from './user.js';

export const SubscriberOnAuthorsType = new GraphQLObjectType({
  name: 'SubscriberOnAuthors',
  fields: () => ({
    subscriber: { type: new GraphQLNonNull(UserType) },
    author: { type: new GraphQLNonNull(UserType) },
  }),
});
