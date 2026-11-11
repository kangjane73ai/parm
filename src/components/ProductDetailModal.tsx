import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Truck, MapPin, Calendar, Star, Check, ShieldCheck, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onInstantOrder: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onInstantOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');

  if (!isOpen || !product) return null;

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stockCount, prev + delta)));
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-[#FBFAF5] rounded-lg border border-[#1F2A24]/15 shadow-2xl overflow-hidden my-6">
        
        {/* Header Close button */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1F2A24]/10 bg-white">
          <div className="flex items-center gap-2 text-[15px] text-[#2F5D3A] font-bold">
            <span>{product.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{product.producerVillage}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1F2A24]/70 hover:text-[#1F2A24] rounded-md transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body: Split 2 columns on desktop */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image & Farmer badge (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative w-full aspect-square rounded-md overflow-hidden bg-[#F6F1DE] border border-[#1F2A24]/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.isSameDayDelivery && (
                <div className="absolute top-3 left-3 bg-[#D8432E] text-white text-[13px] font-bold px-2.5 py-1 rounded-xs shadow-xs">
                  오늘 수확 · 당일배송
                </div>
              )}
            </div>

            {/* Senior Farmer Trust Card */}
            <div className="p-4 bg-[#F6F1DE] rounded-md border border-[#2F5D3A]/20">
              <div className="flex items-center gap-2 text-[#2F5D3A] font-bold text-[16px] mb-1">
                <MapPin className="w-4 h-4" />
                <span>생산자: {product.producerName}</span>
              </div>
              <p className="text-[14px] text-[#1F2A24]/80">
                {product.producerVillage} ({product.producerCareer})
              </p>
              <div className="mt-2 text-[13px] text-[#2F5D3A] flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#D8432E]" />
                <span>수확 일시: {product.harvestTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Quantity & Details (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Sugar / Variety Highlight */}
              {product.sugarContent && (
                <div className="text-[14px] font-bold text-[#2F5D3A] mb-1">
                  {product.sugarContent}
                </div>
              )}

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2A24] tracking-tight mb-2">
                {product.name}
              </h2>

              <div className="text-[15px] text-[#1F2A24]/70 mb-4">
                중량/규격: {product.weightText} ({product.unit})
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-5 border-b border-[#1F2A24]/10">
                <span className="text-3xl sm:text-4xl font-bold text-[#2F5D3A] tabular-nums">
                  {product.price.toLocaleString()}원
                </span>
                {product.originalPrice && (
                  <span className="text-[18px] text-[#1F2A24]/40 line-through tabular-nums">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                )}
                <span className="text-[14px] text-[#D8432E] font-bold">
                  (직거래 특가)
                </span>
              </div>

              {/* Tabs: Info vs Reviews */}
              <div className="flex items-center gap-4 mt-4 border-b border-[#1F2A24]/10 pb-2">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`text-[16px] font-bold pb-1 cursor-pointer transition-colors ${
                    activeTab === 'info'
                      ? 'text-[#2F5D3A] border-b-2 border-[#2F5D3A]'
                      : 'text-[#1F2A24]/60 hover:text-[#1F2A24]'
                  }`}
                >
                  상품 안내 및 보관법
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`text-[16px] font-bold pb-1 cursor-pointer transition-colors ${
                    activeTab === 'reviews'
                      ? 'text-[#2F5D3A] border-b-2 border-[#2F5D3A]'
                      : 'text-[#1F2A24]/60 hover:text-[#1F2A24]'
                  }`}
                >
                  구매 후기 ({product.reviews.length})
                </button>
              </div>

              {/* Tab 1 Content: Information */}
              {activeTab === 'info' && (
                <div className="pt-4 space-y-4 text-[16px] leading-[1.7] text-[#1F2A24]/85">
                  <p>{product.description}</p>

                  {product.textureNote && (
                    <div className="p-3.5 bg-white rounded-md border border-[#1F2A24]/10">
                      <strong className="text-[#2F5D3A] font-semibold">식감 특징: </strong>
                      {product.textureNote}
                    </div>
                  )}

                  <div className="p-3.5 bg-white rounded-md border border-[#1F2A24]/10">
                    <strong className="text-[#2F5D3A] font-semibold">맛있게 드시는 보관법: </strong>
                    {product.storageTips}
                  </div>

                  {/* Delivery Coverage Info */}
                  <div className="p-3.5 bg-[#F6F1DE]/80 rounded-md border border-[#2F5D3A]/20 text-[15px] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#2F5D3A]">
                      <Truck className="w-4 h-4 text-[#D8432E]" />
                      <span>배송 권역 안내</span>
                    </div>
                    <p className="text-[#1F2A24]">
                      • <strong>익산 · 전주 · 군산 권역:</strong> 오늘 오전 11시 이전 주문 시 <span className="text-[#D8432E] font-bold">당일 저녁 7시 전 도착</span>
                    </p>
                    <p className="text-[#1F2A24]">
                      • <strong>그 외 전국 지역:</strong> 오늘 수확 후 즉시 우체국 신선택배 접수, <span className="font-bold">내일 오전 도착</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2 Content: Customer Reviews */}
              {activeTab === 'reviews' && (
                <div className="pt-4 space-y-3">
                  {product.reviews.length === 0 ? (
                    <div className="text-center py-8 text-[#1F2A24]/60 text-[15px]">
                      아직 등록된 첫 후기가 없습니다. 첫 번째 신선 구매자가 되어 보세요!
                    </div>
                  ) : (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-white rounded-md border border-[#1F2A24]/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[15px] text-[#1F2A24]">{rev.author}</span>
                            <span className="text-xs bg-[#2F5D3A]/10 text-[#2F5D3A] px-2 py-0.5 rounded-xs font-semibold">
                              실구매 인증
                            </span>
                          </div>
                          <span className="text-xs text-[#1F2A24]/50">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-500 mb-1.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500" />
                          ))}
                        </div>
                        <p className="text-[15px] text-[#1F2A24]/85 leading-relaxed">{rev.content}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Purchase Form Area */}
            <div className="pt-6 border-t border-[#1F2A24]/10 space-y-4">
              {/* Quantity Stepper */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-[17px] text-[#1F2A24]">주문 수량 선택</span>
                <div className="flex items-center border border-[#1F2A24]/20 rounded-md bg-white">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    className="w-11 h-11 flex items-center justify-center font-bold text-lg text-[#1F2A24] hover:bg-[#F6F1DE] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-[18px] text-[#1F2A24] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(1)}
                    className="w-11 h-11 flex items-center justify-center font-bold text-lg text-[#1F2A24] hover:bg-[#F6F1DE] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex items-baseline justify-between bg-white p-4 rounded-md border border-[#1F2A24]/10">
                <span className="text-[16px] font-semibold text-[#1F2A24]/80">총 결제 예정 금액</span>
                <span className="text-3xl font-bold text-[#2F5D3A] tabular-nums">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="py-4 px-4 bg-[#FBFAF5] hover:bg-[#F6F1DE] text-[#2F5D3A] border-2 border-[#2F5D3A] rounded-md font-bold text-[17px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[2]" />
                  <span>장바구니 담기</span>
                </button>
                <button
                  onClick={() => onInstantOrder(product, quantity)}
                  className="py-4 px-4 bg-[#2F5D3A] hover:bg-[#254b2e] text-white rounded-md font-bold text-[17px] flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                >
                  <span>바로 주문하기</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
