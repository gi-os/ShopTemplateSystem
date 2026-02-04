# Folder-Driven B2B Storefront

A static-first e-commerce storefront where everything — branding, products, collections, and orders — is driven by a single `DATABASE` folder. Swapping this folder completely rebrands and restocks the site for a different client.

## Features

- **Zero Hardcoded Branding**: All colors, logos, company name, and copy pulled from `DATABASE/Design/`
- **Dynamic Catalog**: Scan `ShopCollections/` subfolders to generate collections and products - no config file needed
- **Box-Based B2B Pricing**: Display box quantities and pricing prominently
- **Cart System**: localStorage-based cart that persists across sessions
- **Flexible Checkout**: Support for LR Paris freight forwarder or custom freight options
- **CSV Order Tracking**: Orders appended to `DATABASE/Orders/orders.csv`

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS (colors injected from `Colors.txt`)
- File-based data (no external database)

## Folder Structure

```
DATABASE/
├── Design/
│   ├── Logos/                    # Logo images (logo.png, logo-white.png, favicon.ico)
│   ├── ShowcasePhotos/           # Hero images, banners
│   └── Details/
│       ├── Colors.txt            # primary: #1a1a1a, secondary: #ff6600, etc.
│       ├── Descriptions.txt      # Tagline, about text, footer copy
│       └── CompanyName.txt       # Single line: company name
│
├── ShopCollections/
│   ├── Collection1/              # Folder name = collection name
│   │   ├── Item1/
│   │   │   ├── Photos/           # product images (main.jpg, alt1.jpg, etc.)
│   │   │   └── Details/
│   │   │       ├── Name.txt
│   │   │       ├── Description.txt
│   │   │       ├── SKU.txt
│   │   │       ├── ItemCost.txt      # Cost per unit
│   │   │       ├── BoxCost.txt       # Cost per box
│   │   │       └── UnitsPerBox.txt   # e.g., "20"
│   │   └── Item2/
│   │       └── ...
│   └── Collection2/
│       └── ...
│
└── Orders/
    └── orders.csv                # Appended with each submission
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

### Build

```bash
npm run build
npm start
```

## Swapping DATABASE Folders

To completely rebrand and restock the site for a different client:

1. **Backup the current DATABASE folder** (optional, for reference)
   ```bash
   mv DATABASE DATABASE_backup_client1
   ```

2. **Copy in the new client's DATABASE folder**
   ```bash
   cp -r /path/to/new/client/DATABASE ./DATABASE
   ```

3. **Restart the development server** (if running)
   ```bash
   npm run dev
   ```

The site will now reflect:
- New branding (colors, logos, company name)
- New product catalog
- New collections
- Separate order tracking

**No code changes required!** The folder structure IS the configuration.

## DATABASE Configuration Guide

### Design/Details/Colors.txt

Format: `key: value` pairs

```
primary: #1a1a1a
secondary: #ff6600
accent: #4a90e2
background: #ffffff
text: #333333
textLight: #666666
border: #e5e5e7
success: #10b981
```

### Design/Details/CompanyName.txt

Single line with company name:

```
Premium B2B Supplies Co.
```

### Design/Details/Descriptions.txt

Format: `key: value` pairs

```
tagline: Quality wholesale products for your business needs
about: We are a leading supplier of premium B2B products...
footer: © 2026 Premium B2B Supplies Co. All rights reserved.
```

### Product Details Files

Each product folder should contain a `Details` subfolder with:

- **Name.txt**: Product name
- **Description.txt**: Product description
- **SKU.txt**: Product SKU
- **ItemCost.txt**: Cost per individual unit (decimal number)
- **BoxCost.txt**: Cost per box (decimal number)
- **UnitsPerBox.txt**: Number of units in a box (integer)

### Product Photos

Place product images in the `Photos` subfolder:
- Images will be displayed in alphabetical order
- Supported formats: .jpg, .jpeg, .png, .gif, .webp
- First image is used as the main product image

## Order Management

Orders are stored in `DATABASE/Orders/orders.csv` with the following fields:

- Order ID
- Date
- Customer Name
- Email
- Phone
- Company
- Shipping Address
- Freight Option
- Freight Company
- Freight Account
- Freight Contact
- Order Notes
- Items (JSON)
- Total

## License

MIT
