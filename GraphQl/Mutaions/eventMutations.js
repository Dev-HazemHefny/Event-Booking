import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { EventType } from "../Type/eventType.js";
import Event from "../../Models/Event.js";


const eventargs={
    title:{type:GraphQLString},
    description:{type:GraphQLString},
     image:{type:GraphQLString},
    date:{type:GraphQLString},
    start_time:{type:GraphQLString},
     end_time:{type:GraphQLString},
     price:{type:GraphQLInt},
     total_tickets:{type:GraphQLInt},
     available_tickets:{type:GraphQLInt},
     status:{type:GraphQLString},
     category:{type:GraphQLID},
     venue:{type:GraphQLID},
    //  organizer:{type:GraphQLID}
    }

export const eventMutations = {
  createEvent:{
    type:EventType,
    args:{
        ...eventargs
    },
     async resolve(_,args,context){
      if(!context.user) throw new Error("Unauthorized - Please login first");
        const existEvent = await Event.findOne({title:args.title});
        if(existEvent) throw new Error("Event already exist");
        const event = new Event({
          ...args,
          organizer:context.user._id
        });
        await event.save();
        return event

    }
  },
  deleteEvent:{
    type:EventType,
    args:{
        id:{type:GraphQLID}
    },
    async resolve(_,{id},context){
           if(!context.user) throw new Error("Unauthorized - Please login first");
    if(!id) throw new Error("Event id is required");
    const event = await Event.findByIdAndDelete(id);
    if(!event) throw new Error("Event not found");
    return event
    }
  },
  updateEvent:{
  type:EventType,
  args:{
    id:{type:GraphQLID},
    ...eventargs
  },
  async resolve(_,{id,...args},context){
    if(!context.user) throw new Error("Unauthorized - Please login first");
    if(!id) throw new Error("Event id is required");
    const event = await Event.findByIdAndUpdate(id,args,{new:true});
    if(!event) throw new Error("Event not found");
    return event
  }
  }  
};