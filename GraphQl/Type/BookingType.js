import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UserType } from "./userType.js";
import { EventType } from "./eventType.js";
import User from "../../Models/User.js";
import Event from "../../Models/Event.js";
export const BookingType = new GraphQLObjectType({
  name: "BookingType",
  fields: () => ({
    id: { type: GraphQLID },
    tickets_count: { type: GraphQLInt },
    total_price: { type: GraphQLFloat },
    status: { type: GraphQLString },
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
