import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";



export const VenueType = new GraphQLObjectType({
    name:'VenueType',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        address:{type:GraphQLString},
        city:{type:GraphQLString},
        capacity:{type:GraphQLInt},
    })
})