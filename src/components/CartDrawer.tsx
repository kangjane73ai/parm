import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToOrder,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 30000 || items.length === 0 ? 0 : 3500;
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 flex justify-end">
      <div className="w-full max-w-md bg-[#FBFAF5] h-full shadow-2xl flex flex-col justify-between border-l border-[#1F2A24]/15">
        
        {/* Cart Top Bar */}
        <div className="p-5 border-b border-[#1F2A24]/10 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2F5D3A]" />
            <h2 className="text-xl font-bold text-[#1F2A24]">
              장바구니 ({items.reduce((sum, i) => sum + i.quantity, 0)}건)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1F2A24]/70 hover:text-[#1F2A24] rounded-md transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="p-3 bg-[#F6F1DE] border-b border-[#2F5D3A]/15 text-[14px] text-[#2F5D3A] flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-semibold">
            <Truck className="w-4 h-4 text-[#D8432E]" />
            <span>
              {subtotal >= 30000
                ? '익산 산지 직거래 무료배송 적용 중!'
                : `30,000원 이상 주문 시 무료배송 (${(30000 - subtotal).toLocaleString()}원 남음)`}
            </span>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#1F2A24]/60">
              <ShoppingBag className="w-12 h-12 stroke-[1.5] text-[#1F2A24]/30 mb-3" />
              <p className="text-lg font-bold text-[#1F2A24]">장바구니가 비어 있습니다.</p>
              <p className="text-[15px] mt-1">오늘 아침 익산에서 수확한 신선한 과채를 담아보세요.</p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-md border border-[#1F2A24]/10 flex gap-4 items-start"
              >
                {/* Thumb */}
                <div className="w-20 h-20 rounded-md overflow-hidden bg-[#F6F1DE] shrink-0 border border-[#1F2A24]/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-[16px] text-[#1F2A24] line-clamp-1">
                      {product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-[#1F2A24]/40 hover:text-[#D8432E] p-1 transition-colors cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[13px] text-[#2F5D3A] font-semibold mt-0.5">
                    {product.producerName} ({product.producerVillage})
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1F2A24]/5">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#1F2A24]/20 rounded-md bg-[#FBFAF5]">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-[#1F2A24] hover:bg-[#F6F1DE] transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-9 text-center font-bold text-[15px] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-[#1F2A24] hover:bg-[#F6F1DE] transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-[16px] text-[#2F5D3A] tabular-nums">
                      {(product.price * quantity).toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#1F2A24]/15 bg-white space-y-3">
            <div className="space-y-1.5 text-[15px]">
              <div className="flex justify-between text-[#1F2A24]/80">
                <span>상품 합계</span>
                <span className="font-semibold tabular-nums">{subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-[#1F2A24]/80">
                <span>배송비</span>
                <span className="font-semibold tabular-nums">
                  {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#1F2A24] pt-2 border-t border-[#1F2A24]/10">
                <span>최종 결제 금액</span>
                <span className="text-2xl font-bold text-[#2F5D3A] tabular-nums">
                  {total.toLocaleString()}원
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToOrder}
              className="w-full py-4 bg-[#2F5D3A] hover:bg-[#254b2e] text-[#FBFAF5] rounded-md font-bold text-[18px] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <span>주문서 작성하기</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
