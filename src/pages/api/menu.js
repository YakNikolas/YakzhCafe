import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    const db = client.db('Cafe');
    const collection = db.collection('Cafe_menu');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const menu = await collection.find({}).toArray();

    const groupedMenu = menu.reduce((acc, item) => {
      const category = item.category || 'undefined';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    const sortedMenu = Object.keys(groupedMenu)
      .filter((category) => category !== 'undefined')
      .map((category) => ({
        category,
        items: groupedMenu[category],
      }));
    return res.status(200).json(sortedMenu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return res.status(500).json({ error: 'Failed to fetch menu' });
  }
}
