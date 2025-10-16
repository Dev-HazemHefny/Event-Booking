import { GraphQLID, GraphQLString } from "graphql";
import Category from "../../Models/Category.js";
import { CategoryType } from "../Type/categoryType.js";

export const categoryMutations = {
  createCategory: {
    type: CategoryType,
    args: {
      name: { type: GraphQLString },
    },
    async resolve(_, args) {
      if (!args.name) throw new Error("Category name is required");

      const ExistCategory = await Category.findOne({ name: args.name });
      if (ExistCategory) throw new Error("Category already exist");
      const category = new Category(args);
      await category.save();
      return category;
    },
  },
  updateCategory: {
    type: CategoryType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
    },
    async resolve(_, { id, ...updates }) {
      return Category.findByIdAndUpdate(id, updates, { new: true });
    },
  },
  deleteCategory: {
    type: CategoryType,
    args: { id: { type: GraphQLID } },
    async resolve(_, { id }) {
      if (!id) throw new Error("Category id is required");
      const category = await Category.findById(id);
      if (!category) throw new Error("Category not found");
      return await Category.findByIdAndDelete(id);
    },
  },
};
