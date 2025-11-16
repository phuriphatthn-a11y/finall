import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockProducts = [
  { id: 1, name: "T-Shirt", price: 299, image: "https://picsum.photos/seed/p1/400/300" },
  { id: 2, name: "Sneakers", price: 1299, image: "https://picsum.photos/seed/p2/400/300" },
  { id: 3, name: "Watch", price: 1890, image: "https://picsum.photos/seed/p3/400/300" },
  { id: 4, name: "Backpack", price: 850, image: "https://picsum.photos/seed/p4/400/300" },
];

const Product = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-primary">Product</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockProducts.map((p) => (
          <Card key={p.id} className="overflow-hidden shadow">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <div className="font-semibold text-lg mb-2">{p.name}</div>
              <div className="text-muted-foreground mb-4">฿{p.price.toLocaleString()}</div>
              <Button className="w-full">Add to cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product;
