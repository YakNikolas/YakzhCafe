import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const client = await clientPromise;
        const db = client.db('Cafe');
        const ordersCollection = db.collection('Cafe_orders');

        const userId = req.headers['X-User-ID'];
        const order = await ordersCollection.findOne(userId);
        const { name, phone, comment } = req.body;
        let totalBill = order.items.reduce((result, element)=> result + element.price * element.quantity,0)
        const BOT_TOKEN = process.env.BOT_TOKEN;
        const CHAT_ID = process.env.CHAT_ID;
        const message = `
Имя: ${name}
Телефон: ${phone}
Комментарий: ${comment || 'Без комментария'}
Заказ: 
${order.items.map((item, index) => `${index + 1}. ${item.name} (quantity: ${item.quantity})`).join("\n")}
ИТОГО : ${totalBill}$
        `;

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message,
                        parse_mode: 'HTML',
                    }),
                }
            );

            if (response.ok) {
                ordersCollection.deleteOne(userId);
                res.status(200).json({ message: 'Сообщение успешно отправлено!' });
            } else {
                res.status(500).json({ error: 'Ошибка при отправке сообщения' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при отправке сообщения' });
        }
    } else {
        res.status(405).json({ error: 'Метод не поддерживается' });
    }
}