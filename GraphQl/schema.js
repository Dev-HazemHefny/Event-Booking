// schema.js
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import userQueries from "./Queries/userQueries.js";
import eventQueries from "./Queries/eventQueries.js";
import { userMutations } from "./Mutaions/userMutations.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    ...userQueries,
    ...eventQueries,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    ...userMutations,
  }),
});


export default new GraphQLSchema({
  query: RootQuery,
  mutation:RootMutation
});
