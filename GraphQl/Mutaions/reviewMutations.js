import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { ReviewType } from "../Type/reviewType.js";
import Review from "../../Models/Review.js";
const reviewMutations = {
    addReview:{
        type:ReviewType,
        args:{
            user:{type:GraphQLID},
            event:{type:GraphQLID},
            rating:{type:GraphQLInt},
            comment:{type:GraphQLString}
        },
        async resolve (_, args, context){
      if (!context.user) throw new Error("Unauthorized - Please login first");
             const review = new Review({
                    ...args,
                    user:context.user._id
             })
             await review.save();
                return review;
        }
    }
}

export default reviewMutations;