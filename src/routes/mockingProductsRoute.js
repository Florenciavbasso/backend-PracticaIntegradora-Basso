import express from 'express';
import faker from 'faker';

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const product = {
      id: faker.commerce.productId(),
      title: faker.commerce.title(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
      code: faker.commerce.code(),
      stock: faker.commerce.stock(),
      category: faker.commerce.category(),
    };
    products.push(product);
  }

  res.json(products);
});

export default router;
