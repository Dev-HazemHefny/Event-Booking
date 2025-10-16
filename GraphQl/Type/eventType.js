import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import User from "../../Models/User.js";
import { UserType } from "./userType.js";
import Category from "../../Models/Category.js";
import { CategoryType } from "./categoryType.js";
import Venue from "../../Models/Venue.js";
import { VenueType } from "./venueType.js";

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
    category: { type: CategoryType,async resolve(parent){
      const category = await Category.findById(parent.category);
      return category
    }},
    venue: { type: VenueType,
      async resolve(parent){
        const venue = await Venue.findById(parent.venue);
        return venue
      }
     },
     organizer: { type: UserType,async resolve(parent){
      const user = await User.findById(parent.organizer);
      return user
    } },
  }),
});
