import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/items', async (req, res) => {
  const query = req.query.q;
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

  try {
    const response = await axios.get(url);
    const items = response.data.results.slice(0, 4).map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: Math.round((item.price % 1) * 100),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    const categories =
      response.data.filters.find((f) => f.id === 'category')?.values[0]?.path_from_root.map((cat) => cat.name) || [];

    res.json({
      author: {
        name: 'Mateo',
        lastName: 'Nieto',
      },
      categories,
      items,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  const itemUrl = `https://api.mercadolibre.com/items/${id}`;
  const descriptionUrl = `https://api.mercadolibre.com/items/${id}/description`;

  try {
    const [itemResponse, descriptionResponse] = await Promise.all([axios.get(itemUrl), axios.get(descriptionUrl)]);

    const item = itemResponse.data;
    const description = descriptionResponse.data.plain_text;

    res.json({
      author: {
        name: 'Mateo',
        lastName: 'Nieto',
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: Math.round((item.price % 1) * 100),
        },
        picture: item.pictures[0]?.secure_url || item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
