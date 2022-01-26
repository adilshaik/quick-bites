import connectDB from '../../../utils/connectDB';
import Order from '../../../models/Order';

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await connectDB();

  if (method === 'GET') {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'PUT') {
  }
  if (method === 'DELETE') {
  }
};

export default handler;
