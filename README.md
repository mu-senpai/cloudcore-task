
# CloudCore Store

CloudCore Store is a premium e-commerce platform offering high-quality jackets and hoodies. This store is designed for style, comfort, and durability, providing a seamless shopping experience with integrated payment and dynamic product management.

## Features

- **Product Listings**: Browse various premium jackets and hoodies.
- **Product Details**: Detailed view of each product including description, price, size availability, and stock.
- **Add to Cart**: Users can add items to their cart, modify quantities, and proceed to checkout.
- **Dynamic Category Filtering**: Filter products by category.
- **Search Functionality**: Search products by name, unique ID, or category.
- **Responsive Design**: Fully responsive, ensuring a great user experience across devices.
- **Animations**: Smooth animations with Framer Motion for UI transitions.
- **Checkout Process**: A streamlined checkout process that integrates with an order creation API.

## Technologies Used

- **Next.js (15.3.1)**: A React framework for building static and dynamic websites.
- **React-Redux**: For global state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Material UI**: React UI framework for faster, easier web development.
- **Framer Motion**: For animations and interactive UI transitions.
- **Zod**: Schema validation for form inputs.
- **React Hook Form**: For handling forms and validation.
- **Axios**: For making API calls.
- **PostCSS & TailwindCSS**: For styling and CSS build processes.

## Project Structure

```bash
/src/
├── app/
│   ├── (home)/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── components/
│   │   ├── Banner.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Newsletter.tsx
│   │   ├── ProductCard.tsx
│   ├── product/[id]/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
├── favicon.ico
├── globals.css
├── head.tsx
├── layout.tsx
└── page.module.css
/lib/
├── features/
│   ├── cartSlice.ts
│   ├── productsSlice.ts
├── store.ts
├── utils/
│   ├── api.ts
│   └── apiFunctions.ts
└── validation/
    └── checkoutFormSchema.ts
/component/
└── common/
    ├── Footer.tsx
    ├── Navbar.tsx
    └── LayoutWrapper.tsx
```

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/cloudcore-task.git
    ```

2. **Install dependencies:**

    Navigate into the project directory and run:

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

    Now open your browser and go to `http://localhost:3000` to view the application.

4. **Build and start for production:**

    To create a production build:

    ```bash
    npm run build
    ```

    Then, to start the production server:

    ```bash
    npm run start
    ```

## Project Structure Breakdown

- **`/app`**: Contains all the pages like home, checkout, and product details.
- **`/components`**: Reusable UI components like `Banner`, `ProductCard`, `FeaturedProducts`, and `Newsletter`.
- **`/public`**: Contains static assets like `favicon.ico` and images.
- **`/lib`**: Contains hooks and state management logic (e.g., `store.ts`, `productsSlice.ts`).
- **`/utils`**: Contains utility functions like API helpers (`api.ts`, `apiFunctions.ts`).
- **`/validation`**: Contains validation schemas (e.g., `checkoutFormSchema.ts`).

## Future Enhancements

- Add user authentication (Sign Up/Sign In).
- Integrate payment gateway for processing orders.
- User reviews and ratings for products.
- Admin dashboard for managing products and orders.

## Contributing

Feel free to fork the repository, submit issues, and pull requests. Contributions are welcome! 

To contribute:
1. Fork the repository
2. Create your branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a pull request


## Contact

If you have any questions or suggestions, feel free to contact me at muhitabdullah279@gmail.com.
