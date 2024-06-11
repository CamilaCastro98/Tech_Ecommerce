"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "@/helpers/petitions/petitions";
import Card from "./Card";
import IProduct from "@/interfaces/Products";
import CardsContainer from "../secondary/CardsContainer";
import FilterDrawer from "../secondary/FilterDrawer";

const CardsHome: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const fetchedProducts: IProduct[] = await fetchProducts();
      setProducts(fetchedProducts);
      setOriginalProducts(fetchedProducts);
    };

    fetchAndSetProducts();
  }, []);

  const applyLowToHigh = useCallback(() => {
    const orderedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(orderedProducts);
  }, [products]);

  const applyHighToLow = useCallback(() => {
    const orderedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(orderedProducts);
  }, [products]);

  const resetOrder = useCallback(() => {
    setProducts(originalProducts);
  }, [originalProducts]);

  const applyRange = useCallback((event: Event) => {
    if (event instanceof CustomEvent) {
      const { min, max } = event.detail;
      const minP = min || 0;
      const maxP = max || Infinity;
      const orderedProducts = [...originalProducts].filter((p) => p.price > minP && p.price < maxP);
      setProducts(orderedProducts);
    }
  }, [originalProducts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('lowToHigh', applyLowToHigh);
      window.addEventListener('highToLow', applyHighToLow);
      window.addEventListener('resetOrder', resetOrder);
      window.addEventListener('applyRange', applyRange);

      return () => {
        window.removeEventListener('lowToHigh', applyLowToHigh);
        window.removeEventListener('highToLow', applyHighToLow);
        window.removeEventListener('resetOrder', resetOrder);
        window.removeEventListener('applyRange', applyRange);
      };
    }
  }, [applyLowToHigh, applyHighToLow, resetOrder, applyRange]);

  return (
    <>
      <FilterDrawer />
      {products.length > 0 ? 
      (<CardsContainer title="Our Products">
        {products.map((product: IProduct) => (
          <Card key={product.id} {...product} />
        ))}
      </CardsContainer>)
      : 
      (
        <>
        <h1 className="text-gray-50 mx-4 font-light text-center text-2xl">Our Products</h1>
        <p className="p-6 w-full text-center text-gray-50 text-xs italic">
                    Sorry, no products match your filter criteria. Please adjust your filters and try again!
                </p>
        </>
      )}
    </>
  );
};

export default CardsHome;




