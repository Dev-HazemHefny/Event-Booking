import { GraphQLList } from "graphql";
import { ReviewType } from "../Type/reviewType.js";
import Review from "../../Models/Review.js";




const reviewQueries = {
    reviews: {
        type: new GraphQLList(ReviewType),
        resolve: async () => {
            const reviews = await Review.find()
                .populate("user")
                .populate("event");
            return reviews;
        }
    }
}

export default reviewQueries;