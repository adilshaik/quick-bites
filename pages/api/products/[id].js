import connectDB from '../../../utils/connectDB';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  connectDB();

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json(error);
      }
    case 'DELETE':
      try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
          message: 'Product has been deleted',
        });
      } catch (error) {
        res.status(500).json(error);
      }
    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json(error);
      }
  }
}
