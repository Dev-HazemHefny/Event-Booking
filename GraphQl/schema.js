// schema.js
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import userQueries from "./Queries/userQueries.js";
import bookingQueries from "./Queries/bookingQueries.js";
import eventQueries from "./Queries/eventQueries.js";
import { userMutations } from "./Mutaions/userMutations.js";
import VenueQueries from "./Queries/venueQueries.js";
import categoryQueries from "./Queries/categoryQueries.js";
import { categoryMutations } from "./Mutaions/categoryMutations.js";
import { venueMutations } from "./Mutaions/venueMutation.js";
import { eventMutations } from "./Mutaions/eventMutations.js";
import { bookingMutations } from "./Mutaions/bookingMutations.js";
import reviewMutations from "./Mutaions/reviewMutations.js";
import reviewQueries from "./Queries/reviewQueries.js";
//The RootQuery is the entry point for querying data.
//  It's like the main menu of options you have when you want to retrieve information.
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    ...userQueries,
    ...eventQueries,
    ...VenueQueries,
    ...categoryQueries,
    ...bookingQueries,
    ...reviewQueries
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",

  fields: () => ({
    ...userMutations,
    ...categoryMutations,
    ...venueMutations,
    ...eventMutations,
    ...bookingMutations,
    ...reviewMutations
  }),
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
