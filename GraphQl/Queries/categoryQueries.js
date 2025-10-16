import { GraphQLList, GraphQLID } from "graphql";
import Category from "../../Models/Category.js";
import { CategoryType } from "../Type/categoryType.js";

const categoryQueries = {
  categories: {
    type: new GraphQLList(CategoryType),
    resolve: async () => await Category.find(),
  },
  category: {
    type: CategoryType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }) => await Category.findById(id),
  },
};

export default categoryQueries;
