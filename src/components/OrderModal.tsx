import React, { useState } from 'react';
import { CartItem, DeliveryMethod, PaymentMethod, OrderData } from '../types';
import { X, CheckCircle, Truck, CreditCard, Building, ShieldCheck, MapPin } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('same_day');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');
  const [deliveryMemo, setDeliveryMemo] = useState('문 앞에 놓아주시고 문자 부탁드립니다.');
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 30000 ? 0 : 3500;
  const finalPrice = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('주문자 성함, 연락처, 배송지 주소를 모두 입력해주세요.');
      return;
    }

    const orderNumber = `KH-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderData = {
      orderNumber,
      customerName,
      phone,
      zipCode: '54521',
      address,
      addressDetail,
      deliveryMethod,
      deliveryMemo,
      paymentMethod,
      items: [...items],
      totalPrice: subtotal,
      shippingFee,
      finalPrice,
      orderDate: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setCompletedOrder(newOrder);
    onOrderCompleted();
  };

  const handleFinish = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#FBFAF5] rounded-lg border border-[#1F2A24]/15 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1F2A24]/10 bg-white flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A24]">
            {completedOrder ? '주문이 정상 접수되었습니다' : '익산 직거래 신선 주문서'}
          </h2>
          <button
            onClick={completedOrder ? handleFinish : onClose}
            className="p-1.5 text-[#1F2A24]/70 hover:text-[#1F2A24] rounded-md transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ORDER COMPLETED VIEW */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 stroke-[2.2]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1F2A24] mb-1">
                감사합니다! 주문이 완료되었습니다.
              </h3>
              <p className="text-[16px] text-[#2F5D3A] font-semibold">
                주문번호: <span className="font-mono">{completedOrder.orderNumber}</span>
              </p>
            </div>

            <div className="bg-white p-5 rounded-md border border-[#1F2A24]/10 space-y-3 text-[15px]">
              <div className="flex justify-between pb-2 border-b border-[#1F2A24]/10">
                <span className="text-[#1F2A24]/70">배송 희망 방식</span>
                <span className="font-bold text-[#2F5D3A]">
                  {completedOrder.deliveryMethod === 'same_day'
                    ? '익산·전주·군산 당일 직배송 (오늘 저녁 7시 전 도착)'
                    : '전국 익일 우체국 신선택배 (내일 오전 도착)'}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1F2A24]/10">
                <span className="text-[#1F2A24]/70">받으시는 분</span>
                <span className="font-medium text-[#1F2A24]">
                  {completedOrder.customerName} ({completedOrder.phone})
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1F2A24]/10">
                <span className="text-[#1F2A24]/70">배송 주소</span>
                <span className="font-medium text-[#1F2A24] text-right">
                  {completedOrder.address} {completedOrder.addressDetail}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1F2A24]/10">
                <span className="text-[#1F2A24]/70">결제 방식</span>
                <span className="font-bold text-[#1F2A24]">
                  {completedOrder.paymentMethod === 'bank_transfer'
                    ? '농협 무통장 입금 (351-0123-4567-89 강희농장)'
                    : completedOrder.paymentMethod === 'direct_pay'
                    ? '배송 기사님 현장 결제'
                    : '간편 카드 결제 완료'}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-lg font-bold">
                <span>최종 결제 금액</span>
                <span className="text-2xl text-[#2F5D3A] tabular-nums">
                  {completedOrder.finalPrice.toLocaleString()}원
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#F6F1DE] rounded-md text-[14px] text-[#2F5D3A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>
                수확 후 즉시 검수하여 출발합니다. 배송 출발 시 기사님 안내 문자가 발송됩니다.
              </span>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 bg-[#2F5D3A] hover:bg-[#254b2e] text-white font-bold text-[18px] rounded-md transition-colors cursor-pointer"
            >
              쇼핑 계속하기
            </button>
          </div>
        ) : (
          /* ORDER INPUT FORM */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Ordered Items Summary */}
            <div className="bg-white p-4 rounded-md border border-[#1F2A24]/10">
              <h4 className="font-bold text-[16px] text-[#1F2A24] mb-2">
                주문 품목 ({items.length}개)
              </h4>
              <div className="divide-y divide-[#1F2A24]/10 text-[14px]">
                {items.map((item) => (
                  <div key={item.product.id} className="py-2 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-[#1F2A24]">{item.product.name}</span>
                      <span className="text-[#1F2A24]/60 ml-2">x {item.quantity}개</span>
                    </div>
                    <span className="font-bold text-[#2F5D3A] tabular-nums">
                      {(item.product.price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-4">
              <h4 className="font-bold text-[17px] text-[#1F2A24] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2F5D3A]" />
                <span>받으시는 분 정보</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[15px] font-semibold text-[#1F2A24] mb-1">
                    성함 *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full p-3 bg-white border border-[#1F2A24]/20 rounded-md text-[16px] focus:outline-none focus:border-[#2F5D3A]"
                  />
                </div>
                <div>
                  <label className="block text-[15px] font-semibold text-[#1F2A24] mb-1">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full p-3 bg-white border border-[#1F2A24]/20 rounded-md text-[16px] focus:outline-none focus:border-[#2F5D3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-[#1F2A24] mb-1">
                  배송지 주소 *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예: 전북 익산시 영등동 무왕로 1000"
                  className="w-full p-3 bg-white border border-[#1F2A24]/20 rounded-md text-[16px] focus:outline-none focus:border-[#2F5D3A] mb-2"
                />
                <input
                  type="text"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  placeholder="상세 주소 (동, 호수)"
                  className="w-full p-3 bg-white border border-[#1F2A24]/20 rounded-md text-[16px] focus:outline-none focus:border-[#2F5D3A]"
                />
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-[#1F2A24] mb-1">
                  배송 요청 사항
                </label>
                <input
                  type="text"
                  value={deliveryMemo}
                  onChange={(e) => setDeliveryMemo(e.target.value)}
                  className="w-full p-3 bg-white border border-[#1F2A24]/20 rounded-md text-[15px] focus:outline-none focus:border-[#2F5D3A]"
                />
              </div>
            </div>

            {/* Delivery Method Choice */}
            <div className="space-y-3">
              <h4 className="font-bold text-[17px] text-[#1F2A24] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2F5D3A]" />
                <span>배송 희망 방식 선택</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setDeliveryMethod('same_day')}
                  className={`p-4 rounded-md border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    deliveryMethod === 'same_day'
                      ? 'border-[#2F5D3A] bg-[#F6F1DE]'
                      : 'border-[#1F2A24]/15 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[16px] text-[#2F5D3A]">
                      익산·인근 당일 직배송
                    </span>
                    <span className="text-xs bg-[#D8432E] text-white px-2 py-0.5 rounded-xs font-bold">
                      오늘 저녁 도착
                    </span>
                  </div>
                  <p className="text-[13px] text-[#1F2A24]/75">
                    익산, 전주, 군산 권역 (오전 11시 전 주문 시 당일 19시 전 도착)
                  </p>
                </label>

                <label
                  onClick={() => setDeliveryMethod('next_day')}
                  className={`p-4 rounded-md border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    deliveryMethod === 'next_day'
                      ? 'border-[#2F5D3A] bg-[#F6F1DE]'
                      : 'border-[#1F2A24]/15 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[16px] text-[#1F2A24]">
                      전국 익일 신선택배
                    </span>
                    <span className="text-xs bg-[#2F5D3A] text-white px-2 py-0.5 rounded-xs font-bold">
                      내일 오전 도착
                    </span>
                  </div>
                  <p className="text-[13px] text-[#1F2A24]/75">
                    수도권 및 전국 타 지역 (우체국 특급 산지 직송망)
                  </p>
                </label>
              </div>
            </div>

            {/* Payment Method Choice */}
            <div className="space-y-3">
              <h4 className="font-bold text-[17px] text-[#1F2A24] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#2F5D3A]" />
                <span>결제 방식 선택</span>
              </h4>

              <div className="space-y-2">
                <label
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3.5 rounded-md border-2 cursor-pointer flex items-center gap-3 ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#2F5D3A] bg-[#F6F1DE]'
                      : 'border-[#1F2A24]/15 bg-white'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#2F5D3A]" />
                  <div>
                    <div className="font-bold text-[16px] text-[#1F2A24]">
                      무통장 입금 (수수료 절감으로 농가 후원)
                    </div>
                    <div className="text-[13px] text-[#2F5D3A] font-semibold">
                      농협 351-0123-4567-89 (예금주: 농업회사법인 강희농장)
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('direct_pay')}
                  className={`p-3.5 rounded-md border-2 cursor-pointer flex items-center gap-3 ${
                    paymentMethod === 'direct_pay'
                      ? 'border-[#2F5D3A] bg-[#F6F1DE]'
                      : 'border-[#1F2A24]/15 bg-white'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#2F5D3A]" />
                  <div>
                    <div className="font-bold text-[16px] text-[#1F2A24]">
                      배송 기사님 현장 결제 (카드/현금)
                    </div>
                    <div className="text-[13px] text-[#1F2A24]/70">
                      익산·전주·군산 당일 직배송 주문 시 물건 확인 후 결제 가능
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-md border-2 cursor-pointer flex items-center gap-3 ${
                    paymentMethod === 'card'
                      ? 'border-[#2F5D3A] bg-[#F6F1DE]'
                      : 'border-[#1F2A24]/15 bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#2F5D3A]" />
                  <div>
                    <div className="font-bold text-[16px] text-[#1F2A24]">
                      신용/체크카드 간편 결제
                    </div>
                    <div className="text-[13px] text-[#1F2A24]/70">
                      KG이니시스 안심 결제 (시뮬레이션 모드 지원)
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Price Breakdown & Submit Button */}
            <div className="pt-4 border-t border-[#1F2A24]/15 space-y-3">
              <div className="flex justify-between items-baseline text-lg font-bold">
                <span>최종 결제 금액</span>
                <span className="text-3xl text-[#2F5D3A] tabular-nums">
                  {finalPrice.toLocaleString()}원
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2F5D3A] hover:bg-[#254b2e] text-white font-bold text-[19px] rounded-md transition-colors cursor-pointer shadow-md"
              >
                주문 완료하기
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
