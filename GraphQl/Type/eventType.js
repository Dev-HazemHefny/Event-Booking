import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import User from "../../Models/User.js";
import { UserType } from "./userType.js";

export const EventType = new GraphQLObjectType({
  name: "EventType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    date: { type: GraphQLString },
    start_time: { type: GraphQLString },
    end_time: { type: GraphQLString },
    price: { type: GraphQLInt },
    total_tickets: { type: GraphQLInt },
    available_tickets: { type: GraphQLInt },
    status: { type: GraphQLString },
    
      // العلاقات مع باقي الـ Models
    // category: { type: CategoryType },
    // venue: { type: VenueType },
     organizer: { type: UserType,async resolve(parent){
      const user = await User.findById(parent.organizerId);
      return user
    } },
  }),
});
