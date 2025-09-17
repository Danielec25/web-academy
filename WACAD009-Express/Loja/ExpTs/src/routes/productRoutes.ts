    import { Router, Request, Response } from 'express';
    import { getAllProducts, getProductById } from '../services/api';

    const router = Router();

    router.get('/', async (req: Request, res: Response) => {
      const products = await getAllProducts();
      res.render('products', {
        title: 'Listagem de Produtos',
        products: products,
      });
    });

   
    router.get('/product/:id', async (req: Request, res: Response) => {
      const productId = req.params.id;
      const product = await getProductById(productId);

      if (product) {
        res.render('productDetail', {
          title: product.title,
          product: product,
        });
      } else {
        res.status(404).send('Produto não encontrado');
      }
    });

    export default router;
    
    