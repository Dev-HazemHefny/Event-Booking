import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import User from "../../Models/User.js";
import { UserType } from "./userType.js";
import Event from "../../Models/Event.js";
import { EventType } from "./eventType.js";

export const ReviewType = new GraphQLObjectType({
  name: "ReviewType",
  fields: () => ({
    id: { type: GraphQLID },
    rating: { type: GraphQLInt },
    comment: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    user: {
      type: UserType,
      async resolve(parent) {
        const user = await User.findById(parent.user);
        return user;
      },
    },
    event: {
      type: EventType,
      async resolve(parent) {
        const event = await Event.findById(parent.event);
        return event;
      },
    },
  }),
});
