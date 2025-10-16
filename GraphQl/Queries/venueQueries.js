import { GraphQLID, GraphQLList } from "graphql";
import Venue from "../../Models/Venue.js";
import { VenueType } from "../Type/venueType.js";
import { UserType } from "../Type/userType.js";
const VenueQueries = {
  venues: {
    type: new GraphQLList(VenueType),
    resolve: async () => await Venue.find(),
  },
  venue: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve:async (_, { id }) => await Venue.findById(id),
  },
};
export default VenueQueries;