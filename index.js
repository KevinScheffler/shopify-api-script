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

// Helper Functions
async function getInventoryItemId(productId) {
  try {
    const response = await shopifyApi.get(`/products/${productId}.json`);
    const variant = response.data.product.variants[0];
    console.log('Inventory Item ID:', variant.inventory_item_id);
    console.log('Variant ID:', variant.id);
    return { inventoryItemId: variant.inventory_item_id, variantId: variant.id}
  } catch (error) {
    console.error('Error getting inventory item ID:', error.response?.data || error.message);
  }
}

async function getLocationId() {
  try {
    const response = await shopifyApi.get('/locations.json');
    const locationId = response.data.locations[0].id;
    console.log('Location ID:', locationId);
    return locationId;
  } catch (error) {
    console.error('Error getting location ID:', error.response?.data || error.message);
  }
}

async function enableInventoryTracking(variantId) {
  try {
    const response = await shopifyApi.put(`/variants/${variantId}.json`, {
      variant: {
        id: variantId,
        inventory_management: 'shopify',
      },
    });
    console.log(`Inventory tracking enabled for variant ${variantId}`);
  } catch (error) {
    console.error('Error enabling inventory tracking:', error.response?.data || error.message);
  }
}
 
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

(async () => {
  // await fetchAllProducts();
  // await createProduct();
  const { inventoryItemId, variantId } = await getInventoryItemId('10282663117103')
  const locationId = await getLocationId();
  await enableInventoryTracking(variantId);
  await updateInventory(inventoryItemId, 100, locationId);
})();