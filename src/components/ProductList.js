import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

function ProductList({ products }) {
  return (
    <Grid container spacing={2} mt={1}>
      {products.map((product) => (
        <Grid key={product.id} item xs={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
