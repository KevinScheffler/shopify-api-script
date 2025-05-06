# Shopify Admin API Automation Script

This Node.js script interacts with the Shopify Admin REST API to help developers and merchants automate common backend tasks like managing products and inventory.

## 🔧 Features

- ✅ Fetch all products from your store
- ✅ Create a new product with sample data
- ✅ Update inventory levels for a specific product
- 🔒 Authenticated using a secure API token
- ⚙️ Built with Axios and dotenv

## 🗂️ Project Structure

shopify-admin-api-script/
├── index.js # Main script logic
├── .env # Store credentials securely (never commit this)
├── .gitignore # Ignore node_modules and .env
└── package.json # Project metadata and dependencies


## 🛠 Requirements

- Node.js (v16+ recommended)
- A Shopify development store
- Admin API access token from a custom app

## 🚀 Getting Started
   
1. Clone the repo:
git clone https://github.com/yourusername/shopify-admin-api-script.git
cd shopify-admin-api-script

2. Install dependencies:
npm install

3. Create a .env file in the root:
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_API_VERSION=2024-01
SHOPIFY_ACCESS_TOKEN=your-admin-api-token

4. Run the script:
node index.js

📄 Example Output
Fetched 10 products.
Created product: 8227629531399
Inventory updated: 50 units available at Location 9039282323

📚 Resources
  • Shopify Admin API (REST)
  • Axios Docs
  • Dotenv

📌 Disclaimer
This script is for educational/demo purposes and is not production-hardened. Always secure your API keys and validate data before deploying to live stores.

🙌 Contributing
If you find a bug or want to improve the script, feel free to open an issue or submit a pull request.

📄 License
MIT License
