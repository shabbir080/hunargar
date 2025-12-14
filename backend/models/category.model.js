// import Category from "./category.model.js";

// export const createProduct = async (req, res) => {
//   try {
//     const { category } = req.body;

//     // Check if category exists
//     const categoryExists = await Category.findById(category);
//     if (!categoryExists) {
//       return res.status(400).json({ message: "Invalid category provided" });
//     }

//     const product = new Product(req.body);
//     await product.save();

//     res.status(201).json({ message: "Product created", product });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
