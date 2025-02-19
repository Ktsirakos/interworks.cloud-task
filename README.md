# interworks.cloud-task - E-commerce Application

A simplified e-commerce application built with Vue 3, Vite, and npm that allows users to browse products, search, and manage their shopping basket.

## Features

- Product search functionality
- Product listing with details
- Shopping basket management (add, remove, update quantities)
- Responsive design for desktop and mobile devices
- Mock API integration for product data

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (usually comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:Ktsirakos/interworks.cloud-task.git
cd interworks.cloud-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

This will start the development server at `http://localhost:5173` (default Vite port).

## Mock Data

The application uses mock data stored in `public/mock-data/products.json`. In a real-world scenario, this would be replaced with actual API calls.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (if configured)
