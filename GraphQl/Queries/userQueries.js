// userQueries.js
import { GraphQLList, GraphQLID} from "graphql";
import User from "../../Models/User.js";
import { UserType } from "../Type/userType.js";


const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async () => await User.find(),
  },
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }) => await User.findById(id),
  },
};

export default userQueries;
