require('dotenv').config();
const axios = require('axios');

const { SHOPIFY_STORE_DOMAIN, SHOPIFY_API_VERSION, SHOPIFY_ACCESS_TOKEN } = process.env;

const shopifyApi = axios.create({
  baseURL: `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`,
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    'Content-Type': 'application/json', 
  },
});

// Fetch all products
async function fetchAllProducts() {
  try {
    const response = await shopifyApi.get('/products.json');
    console.log(`Fetched ${response.data.products.length} products.`);
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
  }
}

// Create a product
async function createProduct() {
  const newProduct = {
    product: {
      title: 'Test Product',
      body_html: '<strong>Good product!<strong>',
      vendor: 'KevinCo',
      product_type: 'Test',
      tags: ['test', 'script'],
    },
  };

  try {
    const response = await shopifyApi.post('/products.json', newProduct);
    console.log('Created product:', response.data.product.id);
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message)
  }
}

async function updateInventory(invetoryItemId, available, locationId) {
  const payload = {
    location_id: locationId,
    inventory_item_id: invetoryItemId,
    available,
  };

  try {
    const response = await shopifyApi.post('/inventory_levels/set.json', payload);
    console.log('Inventory updated:', response.data);
  } catch (error) {
    console.error('Error updating inventory:', error.response?.data || error.message);
  }
}

// Run functions here
(async () => {
  await fetchAllProducts();
  await createProduct();
  // await updateInventory('your_inventory_item_id', 50, 'your_location_id');
})();