import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

// type definition 
// like the one you provided represents the structure of data that can be queried or manipulated.
export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
