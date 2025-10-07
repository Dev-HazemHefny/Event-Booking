import { GraphQLError, GraphQLString } from "graphql";
import { UserType } from "../Type/userType.js";
import bcrypt from "bcrypt";
import User from "../../Models/User.js";
export const userMutations = {
  createUser: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        // const { name, email, password } = args
      const existUser = await User.findOne({ email: args.email });
      if (existUser) {
        throw new GraphQLError("User already exist");
      }
      const hashedPassword = await bcrypt.hash(args.password, 8);
      const user = await User.create({
        name: args.name,
        email: args.email,
        password: hashedPassword,
      });
      return user;
    },
  },
};
