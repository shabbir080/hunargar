// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: true,
// 		},
// 		description: {
// 			type: String,
// 			required: true,
// 		},
// 		price: {
// 			type: Number,
// 			min: 0,
// 			required: true,
// 		},
// 		image: {
// 			type: String,
// 			required: [true, "Image is required"],
// 		},
// 		category: {
// 			type: String,
// 			required: true,
// 		},
// 		isFeatured: {
// 			type: Boolean,
// 			default: false,
// 		},
// 	},
// 	{ timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);

// export default Product;



import mongoose from "mongoose";

// Define the categories from your Home.jsx
const CATEGORIES = [
  "punjab",
  "GB",
  "sindh",
  "kashmir",
  "balochistan",
  "kpk",

];

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		category: {
			type: String,
			required: true,
			enum: CATEGORIES,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		// Number of items available in stock
		stock: {
			type: Number,
			min: 0,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

