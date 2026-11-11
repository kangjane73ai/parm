export type ProductCategory = 'vegetable' | 'fruit' | 'seafood';

export interface ProductReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  isRepresentative?: boolean;
  price: number;
  originalPrice?: number;
  unit: string;
  weightText: string;
  producerName: string;
  producerVillage: string;
  producerCareer: string;
  producerId: string;
  harvestTime: string;
  harvestSeason: string;
  isSameDayDelivery: boolean;
  isSeasonal: boolean;
  sugarContent?: string;
  textureNote?: string;
  description: string;
  storageTips: string;
  image: string;
  badgeText?: string;
  stockCount: number;
  reviews: ProductReview[];
}

export interface ProducerStory {
  id: string;
  name: string;
  village: string;
  crop: string;
  career: string;
  quote: string;
  interview: string;
  image: string;
  harvestPhilosophy: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = 'same_day' | 'next_day';
export type PaymentMethod = 'bank_transfer' | 'direct_pay' | 'card';

export interface OrderData {
  orderNumber: string;
  customerName: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  deliveryMethod: DeliveryMethod;
  deliveryMemo: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  totalPrice: number;
  shippingFee: number;
  finalPrice: number;
  orderDate: string;
}
