// eventQueries.js
import { GraphQLList, GraphQLID } from "graphql";
import Event from "../../Models/Event.js";
import { EventType } from "../Type/eventType.js";

const eventQueries = {
  events: {
    type: new GraphQLList(EventType),
    resolve: async () =>
      await Event.find()
        .populate("category")
        .populate("venue")
        .populate("organizer"),
  },
  event: {
    type: EventType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }) => await Event.findById(id),
  },
};

export default eventQueries;
