import React, { useState, useEffect } from 'react';
import {
  Alert, Box, Container, Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import orderBy from 'lodash/orderBy';
import ProductFilter from '../components/ProductFilter';
import ProductSearch from '../components/ProductSearch';
import ProductSort from '../components/ProductSort';
import ProductList from '../components/ProductList';
import FormProvider from '../components/form/FormProvider';
import apiService from '../app/apiService';
import LoadingScreen from '../components/LoadingScreen';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const defaultValues = {
    gender: [],
    category: 'All',
    priceRange: '',
    sortBy: 'featured',
    searchQuery: '',
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();

  function applyFilter(productsPara, filtersPara) {
    const { sortBy } = filtersPara;
    let filteredProducts = productsPara;

    // SORT BY
    if (sortBy === 'featured') {
      filteredProducts = orderBy(products, ['sold'], ['desc']);
    }
    if (sortBy === 'newest') {
      filteredProducts = orderBy(products, ['createdAt'], ['desc']);
    }
    if (sortBy === 'priceDesc') {
      filteredProducts = orderBy(products, ['price'], ['desc']);
    }
    if (sortBy === 'priceAsc') {
      filteredProducts = orderBy(products, ['price'], ['asc']);
    }

    // FILTER PRODUCTS
    if (filters.gender.length > 0) {
      filteredProducts = products.filter((product) => filters.gender.includes(product.gender));
    }
    if (filters.category !== 'All') {
      filteredProducts = products.filter(
        (product) => product.category === filters.category,
      );
    }
    if (filters.priceRange) {
      filteredProducts = products.filter((product) => {
        if (filters.priceRange === 'below') {
          return product.price < 25;
        }
        if (filters.priceRange === 'between') {
          return product.price >= 25 && product.price <= 75;
        }
        return product.price > 75;
      });
    }
    if (filters.searchQuery) {
      // eslint-disable-next-line max-len
      filteredProducts = products.filter((product) => product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()));
    }
    return filteredProducts;
  }

  const filterProducts = applyFilter(products, filters);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get('/products');
        setProducts(res.data);
        setError('');
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <Container sx={{ display: 'flex', minHeight: '100vh', mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            mb={2}
          >
            <ProductSearch />
            <ProductSort />
          </Stack>
        </FormProvider>
        <Box sx={{ position: 'relative', height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <ProductList products={filterProducts} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;
