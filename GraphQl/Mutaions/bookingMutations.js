import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { BookingType } from "../Type/bookingType.js";
import Booking from "../../Models/Booking.js";
import Event from "../../Models/Event.js";

const bookingArgs = {
      event: { type: GraphQLID },
      tickets_count: { type: GraphQLInt },
      total_price: { type: GraphQLFloat },
      status: { type: GraphQLString },

}

export const bookingMutations = {
  createBooking: {
    type: BookingType,
    args: {
            ...bookingArgs
    },
    async resolve(_,args,context) {
              if (!context.user) throw new Error("Unauthorized - Please login first");
              const event = await Event.findById(args.event)
              if (!event) throw new Error("Event not found");
              //   console.log(event)
            const booking = new Booking({
                event: args.event,
                tickets_count: args.tickets_count,
                total_price : event.price * args.tickets_count,
                status: args.status,
                user:context.user
            })
            await booking.save()
            // console.log(event.total_tickets)
            event.total_tickets -= args.tickets_count
            await event.save()
            // console.log(event.total_tickets)
            return booking
    },
  },

  incrementTickets:{
    type:BookingType,
    args:{
      id:{type:GraphQLID},
      tickets_count:{type:GraphQLInt},
    },
    async resolve(_,{tickets_count,id},context,) {
      if (!context.user) throw new Error("Unauthorized - Please login first");
      const booking = await Booking.findById(id) 
    //   console.log(booking)
      const event = await Event.findById(booking.event)
    //   console.log(event)
      if(!booking) throw new Error("Booking not found") 
        booking.tickets_count += tickets_count
        booking.total_price = event.price * booking.tickets_count
        await booking.save()
        return booking
    }

  },
   decrementTickets:{
    type:BookingType,
    args:{
      id:{type:GraphQLID},
      tickets_count:{type:GraphQLInt},
    },
    async resolve(_,{tickets_count,id},context,) {
      if (!context.user) throw new Error("Unauthorized - Please login first");
      const booking = await Booking.findById(id) 
    //   console.log(booking)
      const event = await Event.findById(booking.event)
    //   console.log(event)
      if(!booking) throw new Error("Booking not found") 
        booking.tickets_count -= tickets_count
        booking.total_price = event.price * booking.tickets_count
        await booking.save()
        return booking
    }

  },
  deleteBooking:{
    type:BookingType,
    args:{
        id:{type:GraphQLID},
    },
    async resolve(_,{id},context) {
        if(!context.user) throw new Error("Unauthorized - Please login first");
        const booking = await Booking.findByIdAndDelete(id)
        if(!booking) throw new Error("Booking not found")
        return booking
    }

  }
};
