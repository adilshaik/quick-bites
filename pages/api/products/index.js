import connectDB from '../../../utils/connectDB';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const { method } = req;

  connectDB();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json(error);
      }
    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json(error);
      }
    // case 'DELETE':
    //   try {
    //     await Product.deleteMany();
    //     res.status(201).json({
    //       message: 'Products have been deleted',
    //     });
    //   } catch (error) {
    //     res.status(500).json(error);
    //   }
  }
}
