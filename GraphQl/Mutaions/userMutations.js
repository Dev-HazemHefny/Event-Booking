import { GraphQLError, GraphQLString } from "graphql";
import { UserType } from "../Type/userType.js";
import bcrypt from "bcrypt";
import User from "../../Models/User.js";
import jwt from 'jsonwebtoken'
export const userMutations = {
  register: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent, args) {
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
  login: {
    type: GraphQLString,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve(_, args ) {
      const user = await User.findOne({ email: args.email });
      if (!user) throw new Error("Invalid email or passwordddd");
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) throw new Error("Invalid email or password");
       let token = jwt.sign(
      { _id: user._id,email: user.email },
      "mearn",
      { expiresIn: "1d" }
      );
      return token;
    },
  },
};
