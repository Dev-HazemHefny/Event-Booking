// import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";



// const query = new GraphQLObjectType({
//   name: "query",
//   fields: () => ({
//     welcome: {
//       type: GraphQLString,
//       args:{name:{type: new GraphQLNonNull( GraphQLString)}},

//       resolve(parent, args) {
//         const {name} = args;
//         return `Welcome ${name} to Event Management API`;
//       },
//     },
//     sum :{
//       type :GraphQLFloat,
//       args:{n1:{type: new GraphQLNonNull(GraphQLFloat)}, n2:{type: new GraphQLNonNull(GraphQLFloat)}},
//       resolve(parent,args){
//         const {n1,n2} = args;
//         return n1+n2  
//       }
//     }
//   }),
// });

// const schema = new GraphQLSchema({
//   query,
// });

// export default schema;


import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";
import User from "../../Models/User.js";
import { UserType, EventType } from "../Type/type.js";




const getAllUsers = new GraphQLObjectType({
  name:"RootQuery",
  fields:()=>({
    users:{
      type: new GraphQLList(UserType),
      async resolve(parent,args){
        const users = await User.find();
        return users;
      }     
    }
  })
})

const schema = new GraphQLSchema({
  getAllUsers
})

export default schema;

// export const GET_ALL_EVENTS = {
//   type: new GraphQLList(EventType),
//   resolve: async () => {
//     return await Event.find()
//       .populate("category")
//       .populate("venue")
//       .populate("organizer");
//   },
// };

