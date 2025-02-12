import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('Cafe');
  const ordersCollection = db.collection('Cafe_orders');
  const menuCollection = db.collection('Cafe_menu');

  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  switch (req.method) {
    case 'POST': {
      try {
        const {itemId}  = req.body;
        if (!itemId) {
          return res.status(400).json({ error: 'Item ID is required' });
        }

        const item = await menuCollection.findOne({ id: itemId });
        if (!item) {
          return res.status(404).json({ error: 'Item not found in the menu' });
        }

        const order = await ordersCollection.findOne({ userId });

        if (order) {
          const itemExists = order.items.some((cartItem) => cartItem.id === itemId);

          if (itemExists) {
            await ordersCollection.updateOne(
              { userId, 'items.id': itemId },
              { $inc: { 'items.$.quantity': 1 } },
              { upsert: false }
            );
          } else {
            await ordersCollection.updateOne(
              { userId },
              {
                $push: {
                  items: {
                    id: itemId,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    available: item.available,
                    quantity: 1,
                  },
                },
              },
              { upsert: false }
            );
          }
        } else {
          const newOrder = {
            userId,
            createdAt: new Date(),
            items: [
              {
                id: itemId,
                name: item.name,
                price: item.price,
                category: item.category,
                available: item.available,
                quantity: 1,
              },
            ],
          };

          await ordersCollection.insertOne(newOrder);
        }

        return res.status(201).json({ message: 'Item added to cart' });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Failed to add item to cart' });
      }
    }

    case 'DELETE': {
      try {
        const {itemId}  = req.body;
        
        const {deleteAll} = req.body;

        const order = await ordersCollection.findOne({ userId });

        if (!order) {
          return res.status(404).json({ error: 'Cart not found' });
        }
        if (deleteAll) {
          ordersCollection.deleteOne({userId})
          return res.status(200).json({message: 'cart deleted'});

        }
        const itemExists = order.items.some((cartItem) => cartItem.id === itemId);

        if (itemExists) {
          const targetItem = order.items.find((cartItem) => cartItem.id === itemId);

          if (targetItem.quantity > 1) {
            await ordersCollection.updateOne(
              { userId, 'items.id': itemId },
              { $inc: { 'items.$.quantity': -1 } },
              { upsert: false }
            );
          } else {
            await ordersCollection.updateOne(
              { userId },
              { $pull: { items: { id: itemId } } }
            );
          }
        }

        return res.status(200).json({ message: 'Item removed or updated in cart' });
      } catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ error: 'Failed to update cart' });
      }
    }

    case 'GET': {
      try {
        const cart = await ordersCollection.findOne({ userId });
        if (!cart) {
          return res.status(200).json({ message: 'Cart not found' });
        }
        let totalBill = cart.items.reduce((result, element)=> result + element.price * element.quantity,0)
        cart.totalBill = totalBill;
        return res.status(200).json(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ error: 'Failed to fetch cart' });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
