import { GraphQLID, GraphQLList } from "graphql";
import Booking from "../../Models/Booking.js";
import { BookingType } from "../Type/bookingType.js";


const bookingQueries = {
   bookings: {
    type: new GraphQLList(BookingType),
    resolve: async () =>
      await Booking.find().populate("event").populate("user"),
  },
    booking:{
        type:BookingType,
        args:{id:{type:GraphQLID}},
        resolve:async(_, {id})=>await Booking.findById(id)
    }
    }
export default bookingQueries;