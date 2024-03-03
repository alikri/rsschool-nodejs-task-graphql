import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { RootQuery } from './rootQuery.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { prisma } = fastify;
      const { query: source, variables: variableValues } = req.body;

      try {
        const errorsCheck = validate(schema, parse(source), [depthLimit(5)]);
        if (errorsCheck.length !== 0) {
          throw fastify.httpErrors.badRequest('Validation failed for GraphQL query.');
        }
      } catch (error) {
        throw new Error();
      }
      
      const result = await graphql({
        schema,
        source,
        variableValues,
        contextValue: { prisma },
      });

      return result;
    },
  });
};


const schema = new GraphQLSchema({
  query: RootQuery,
});

export default plugin;


