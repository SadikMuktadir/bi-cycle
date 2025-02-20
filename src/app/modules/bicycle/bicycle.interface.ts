export interface IBicycle {
  name: string;
  imageUrl?: string;
  brand: string;
  price: number;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX';
  description: string;
  quantity: number;
  inStock: boolean;
}
