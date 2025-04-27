'use client';

import Banner from "../components/Banner";
import BestsellerProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Banner />
      <BestsellerProducts />
      <Newsletter />
    </main>
  );
}