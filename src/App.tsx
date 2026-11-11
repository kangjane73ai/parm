import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RepresentativeSection } from './components/RepresentativeSection';
import { SeasonalSection } from './components/SeasonalSection';
import { DeliveryTimeline } from './components/DeliveryTimeline';
import { ProducerSection } from './components/ProducerSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SeniorSellerModal } from './components/SeniorSellerModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderModal } from './components/OrderModal';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS } from './data/mockData';
import { Product, CartItem, ProductCategory } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProducerFilter, setSelectedProducerFilter] = useState<string | null>(null);
  
  // Modals
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSeniorSellerOpen, setIsSeniorSellerOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Find Melon and Tomato for Representative Section
  const melon = products.find((p) => p.id === 'prod-melon-01') || products[0];
  const tomato = products.find((p) => p.id === 'prod-tomato-01') || products[1];

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`장바구니에 '${product.name}' (${quantity}개) 담았습니다.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Instant order from detail modal
  const handleInstantOrder = (product: Product, quantity: number) => {
    handleAddToCart(product, quantity);
    setIsDetailOpen(false);
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  // Senior seller adds new product
  const handleAddSeniorProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`'${newProduct.name}' 상품이 직거래 몰에 정상 등록되었습니다!`);
    // Scroll to seasonal section
    const el = document.getElementById('seasonal-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigation scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Producer story product filter
  const handleSelectProducerFilter = (producerId: string) => {
    setSelectedProducerFilter(producerId);
    setActiveCategory('all');
    handleScrollToSection('seasonal-section');
    showToast('선택하신 생산자 어르신의 오늘 수확 품목으로 필터링되었습니다.');
  };

  const handleClearProducerFilter = () => {
    setSelectedProducerFilter(null);
  };

  // Proceed from cart to order
  const handleProceedToOrder = () => {
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  // Complete Order
  const handleOrderCompleted = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBFAF5] text-[#1F2A24] flex flex-col font-sans selection:bg-[#2F5D3A] selection:text-white">
      
      {/* 1. Header (Sticky Top Bar Contract) */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSeniorSeller={() => setIsSeniorSellerOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedProducerFilter(null);
        }}
        onScrollToSection={handleScrollToSection}
        activeCategory={activeCategory}
      />

      <main className="flex-1">
        {/* 2. Main Hero (Morning harvest photography backdrop + 11:00 AM cutoff countdown) */}
        <Hero
          onOrderClick={() => handleScrollToSection('seasonal-section')}
          onExploreClick={() => handleScrollToSection('representative-section')}
        />

        {/* 3. Representative Items Section (Melon & Tomato Asymmetric 7:5 showcase) */}
        <RepresentativeSection
          melon={melon}
          tomato={tomato}
          onSelectProduct={(p) => {
            setDetailProduct(p);
            setIsDetailOpen(true);
          }}
          onAddToCart={(p) => handleAddToCart(p, 1)}
        />

        {/* 4. Seasonal Produce Section (Category tabs, search, sorting, cards) */}
        <SeasonalSection
          products={products}
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setSelectedProducerFilter(null);
          }}
          onSelectProduct={(p) => {
            setDetailProduct(p);
            setIsDetailOpen(true);
          }}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          selectedProducerFilter={selectedProducerFilter}
          onClearProducerFilter={handleClearProducerFilter}
        />

        {/* 5. Direct Delivery & Freshness Timeline (06:00 to 18:30) */}
        <DeliveryTimeline />

        {/* 6. Producer Stories Section (Elderly farmers interview & photo) */}
        <ProducerSection
          onSelectProducerFilter={handleSelectProducerFilter}
        />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Floating Senior Seller Quick Bar for mobile & desktop (Affordance for farmers) */}
      <aside aria-label="시니어 농가 지원 창구" className="fixed bottom-5 left-5 z-30">
        <button
          onClick={() => setIsSeniorSellerOpen(true)}
          className="bg-[#2F5D3A] hover:bg-[#254b2e] text-[#FBFAF5] px-4 py-3 rounded-md shadow-lg border border-[#F6F1DE]/30 text-[15px] font-bold flex items-center gap-2 cursor-pointer transition-all hover:scale-103"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#7BB661] shrink-0" />
          <span>시니어 농가 3분 간편 판매 등록</span>
        </button>
      </aside>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setDetailProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onInstantOrder={handleInstantOrder}
      />

      {/* Senior Seller Modal (1 screen per step, 4 steps) */}
      <SeniorSellerModal
        isOpen={isSeniorSellerOpen}
        onClose={() => setIsSeniorSellerOpen(false)}
        onAddProduct={handleAddSeniorProduct}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToOrder={handleProceedToOrder}
      />

      {/* Order Modal (Sheet & Confirmation) */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={cart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2A24] text-white px-5 py-3.5 rounded-md shadow-xl flex items-center gap-3 border border-[#7BB661]/40 animate-fade-in text-[15px]">
          <CheckCircle2 className="w-5 h-5 text-[#7BB661] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
