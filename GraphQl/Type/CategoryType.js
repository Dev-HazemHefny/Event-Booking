import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";



export const CategoryType = new GraphQLObjectType({
    name:'CategoryType',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
    })
})