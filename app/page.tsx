import Image from "next/image";
import Header from "./componets/header";
import ProductCard from "./componets/card";
import AdD from "./componets/ad";
import ElectronicsProducts from "./componets/electronicCard";
import ClothingProducts from "./componets/clothing";
import FurnitureProducts from "./componets/funtiure";
import Footer from "./componets/footer";

export default function Home() {
  return (
    
    <>

    <Header/>

    <AdD/>

    <ProductCard/>

    <ElectronicsProducts/>

    <ClothingProducts/>
    <FurnitureProducts/>

    <Footer/>
    
    </>
  );
}
