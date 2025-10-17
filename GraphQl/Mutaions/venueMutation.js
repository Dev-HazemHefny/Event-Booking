import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { VenueType } from "../Type/venueType.js";
import Venue from "../../Models/Venue.js";

const venueArgs = {
  name: { type: GraphQLString },
  address: { type: GraphQLString },
  city: { type: GraphQLString },
  capacity: { type: GraphQLInt },
};

export const venueMutations = {
  createVenue: {
    type: VenueType,
    args: {
      ...venueArgs,
    },
    async resolve(_, args, context) {
      if (!context.user) {
        throw new Error("Unauthorized - Please login first");
      }
      const existVenue = await Venue.findOne({ name: args.name });
      if (existVenue) throw new Error("Venue already exist");
      const venue = new Venue(args);
      await venue.save();
      return venue;
    },
  },

  updateVenue: {
    type: VenueType,
    args: {
      id: { type: GraphQLID },
      ...venueArgs,
    },
    async resolve(_, { id, ...args },context) {
                  if (!context.user) {
        throw new Error("Unauthorized - Please login first");
      }
      const venue = await Venue.findByIdAndUpdate(id, args, { new: true });
      if (!venue) throw new Error("Venue not found");
      return venue;
    },
  },
  deleteVenue: {
    type: VenueType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(_, { id },context) {
                  if (!context.user) {
        throw new Error("Unauthorized - Please login first");
      }
      const venue = await Venue.findByIdAndDelete(id);
      if (!venue) throw new Error("Venue not found");
      return venue;
    },
  },
};
