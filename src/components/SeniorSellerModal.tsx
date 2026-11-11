import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { Camera, ChevronLeft, ChevronRight, Check, PhoneCall, X, Upload } from 'lucide-react';

interface SeniorSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Product) => void;
}

const COMMON_NAMES = [
  { name: '익산 석탄동 강희농장 머스크메론 2kg', category: 'fruit' as ProductCategory, categoryName: '과일', defaultPrice: 29000, unit: '2~3입 (2kg)', image: '/src/assets/images/iksan_musk_melon_1794379906845.jpg' },
  { name: '익산 석탄동 강희농장 완숙 찰토마토 3kg', category: 'vegetable' as ProductCategory, categoryName: '채소', defaultPrice: 22000, unit: '1박스 (3kg)', image: '/src/assets/images/iksan_ripe_tomato_1794379907241.jpg' },
  { name: '익산 석탄동 강희농장 대추방울토마토 1.5kg', category: 'vegetable' as ProductCategory, categoryName: '채소', defaultPrice: 17000, unit: '1박스 (1.5kg)', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
  { name: '미륵산 아침 쌈채소 모둠 500g', category: 'vegetable' as ProductCategory, categoryName: '채소', defaultPrice: 9800, unit: '1팩 (500g)', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80' },
  { name: '황토밭 흙당근 2kg', category: 'vegetable' as ProductCategory, categoryName: '채소', defaultPrice: 11000, unit: '1상자 (2kg)', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80' },
  { name: '여산 황토 햇양파 3kg', category: 'vegetable' as ProductCategory, categoryName: '채소', defaultPrice: 12500, unit: '1망 (3kg)', image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=800&q=80' },
];

export const SeniorSellerModal: React.FC<SeniorSellerModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form state
  const [selectedPhoto, setSelectedPhoto] = useState<string>(COMMON_NAMES[0].image);
  const [productName, setProductName] = useState<string>('');
  const [category, setCategory] = useState<ProductCategory>('fruit');
  const [categoryName, setCategoryName] = useState<string>('과일');
  const [unit, setUnit] = useState<string>('1박스');
  const [price, setPrice] = useState<number>(25000);
  const [quantity, setQuantity] = useState<number>(10);
  const [farmerName, setFarmerName] = useState<string>('익산 농가 어르신');
  const [village, setVillage] = useState<string>('전북 익산시 석탄동 강희농장');

  if (!isOpen) return null;

  const handleSelectPredefined = (item: typeof COMMON_NAMES[0]) => {
    setProductName(item.name);
    setCategory(item.category);
    setCategoryName(item.categoryName);
    setPrice(item.defaultPrice);
    setUnit(item.unit);
    setSelectedPhoto(item.image);
  };

  const handleComplete = () => {
    const finalName = productName.trim() || '익산 제철 당일 수확 농산물';
    const newProduct: Product = {
      id: `senior-prod-${Date.now()}`,
      name: finalName,
      category,
      categoryName,
      price,
      unit,
      weightText: unit,
      producerName: farmerName,
      producerVillage: village,
      producerCareer: '익산 토박이 농사',
      producerId: 'producer-senior',
      harvestTime: '오늘 아침 수확',
      harvestSeason: '제철 수확 출하',
      isSameDayDelivery: true,
      isSeasonal: true,
      description: `${village}에서 오늘 아침 손수 수확하여 올린 신선한 ${finalName}입니다. 오늘 오전 11시 주문 시 당일 식탁으로 직배송됩니다.`,
      storageTips: '통풍이 잘되는 서늘한 곳이나 냉장 보관하세요.',
      image: selectedPhoto,
      badgeText: '오늘 수확 · 당일배송',
      stockCount: quantity,
      reviews: [],
    };

    onAddProduct(newProduct);
    onClose();
    // Reset step
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#FBFAF5] rounded-lg border-2 border-[#2F5D3A] shadow-2xl overflow-hidden my-6">
        
        {/* Top Senior Assistance Banner */}
        <div className="bg-[#2F5D3A] text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-[14px] text-[#F6F1DE] font-semibold">익산 시니어 농가 전용</div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              어르신 간편 3분 상품 등록
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-md transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Big Progress Indicator (Step 1 to 4) */}
        <div className="bg-[#F6F1DE] px-4 py-3 border-b border-[#1F2A24]/10">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className={`py-2 rounded-md font-bold text-[15px] sm:text-[17px] ${step === 1 ? 'bg-[#2F5D3A] text-white' : step > 1 ? 'bg-white text-[#2F5D3A]' : 'text-[#1F2A24]/50'}`}>
              1. 사진
            </div>
            <div className={`py-2 rounded-md font-bold text-[15px] sm:text-[17px] ${step === 2 ? 'bg-[#2F5D3A] text-white' : step > 2 ? 'bg-white text-[#2F5D3A]' : 'text-[#1F2A24]/50'}`}>
              2. 이름
            </div>
            <div className={`py-2 rounded-md font-bold text-[15px] sm:text-[17px] ${step === 3 ? 'bg-[#2F5D3A] text-white' : step > 3 ? 'bg-white text-[#2F5D3A]' : 'text-[#1F2A24]/50'}`}>
              3. 가격
            </div>
            <div className={`py-2 rounded-md font-bold text-[15px] sm:text-[17px] ${step === 4 ? 'bg-[#2F5D3A] text-white' : 'text-[#1F2A24]/50'}`}>
              4. 수량
            </div>
          </div>
        </div>

        {/* Step-by-Step Content Area */}
        <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">

          {/* STEP 1: 사진 등록 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[15px] text-[#2F5D3A] font-bold">1단계 / 총 4단계</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2A24] mt-1">
                  오늘 아침 수확한 농산물 사진을 골라주세요
                </h3>
                <p className="text-[17px] text-[#1F2A24]/75 mt-2">
                  스마트폰 카메라로 찍으시거나, 아래 대표 사진 중 하나를 누르셔도 됩니다.
                </p>
              </div>

              {/* Large Current Preview */}
              <div className="relative w-full h-56 sm:h-64 rounded-md overflow-hidden bg-white border-2 border-dashed border-[#2F5D3A] flex items-center justify-center">
                <img
                  src={selectedPhoto}
                  alt="선택된 농산물"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#1F2A24]/80 text-white text-[14px] px-3 py-1 rounded-xs">
                  현재 선택된 사진
                </div>
              </div>

              {/* Pre-made Farm produce quick selector */}
              <div>
                <p className="text-[16px] font-bold text-[#1F2A24] mb-3">대표 사진 터치하여 바로 선택하기</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {COMMON_NAMES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPredefined(item)}
                      className={`h-20 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedPhoto === item.image ? 'border-[#D8432E] scale-102 ring-2 ring-[#D8432E]/30' : 'border-[#1F2A24]/20'
                      }`}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: 상품명 선택 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[15px] text-[#2F5D3A] font-bold">2단계 / 총 4단계</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2A24] mt-1">
                  어떤 농산물을 판매하시나요?
                </h3>
                <p className="text-[17px] text-[#1F2A24]/75 mt-2">
                  자주 파시는 농산물 이름을 누르면 자동으로 채워집니다.
                </p>
              </div>

              {/* Big Touch Buttons for Senior Farmers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMMON_NAMES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPredefined(item)}
                    className={`p-4 rounded-md text-left border-2 cursor-pointer transition-all flex items-center justify-between ${
                      productName === item.name
                        ? 'bg-[#2F5D3A] text-white border-[#2F5D3A]'
                        : 'bg-white text-[#1F2A24] border-[#1F2A24]/20 hover:border-[#2F5D3A]'
                    }`}
                  >
                    <div>
                      <div className="text-[18px] sm:text-[19px] font-bold">{item.name}</div>
                      <div className={`text-[14px] ${productName === item.name ? 'text-[#F6F1DE]' : 'text-[#1F2A24]/70'}`}>
                        {item.categoryName} · {item.unit}
                      </div>
                    </div>
                    {productName === item.name && <Check className="w-6 h-6 stroke-[3]" />}
                  </button>
                ))}
              </div>

              {/* Manual Input field */}
              <div className="bg-white p-4 rounded-md border border-[#1F2A24]/20 space-y-2">
                <label className="block text-[16px] font-bold text-[#1F2A24]">
                  직접 이름 입력하기
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="예: 석탄동 강희농장 꿀메론 2kg"
                  className="w-full p-3 text-[18px] border border-[#1F2A24]/30 rounded-md focus:outline-none focus:border-[#2F5D3A]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: 가격 정하기 */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[15px] text-[#2F5D3A] font-bold">3단계 / 총 4단계</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2A24] mt-1">
                  1박스(단위) 당 가격을 정해주세요
                </h3>
                <p className="text-[17px] text-[#1F2A24]/75 mt-2">
                  소비자가 당일 직거래로 결제할 금액입니다. (수수료 없이 농가로 정산됩니다)
                </p>
              </div>

              {/* Giant Price Display */}
              <div className="bg-white p-6 rounded-md border-2 border-[#2F5D3A] text-center">
                <div className="text-[16px] text-[#1F2A24]/70 font-semibold mb-1">
                  현재 판매 가격 ({unit})
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-[#2F5D3A] tabular-nums">
                  {price.toLocaleString()} 원
                </div>
              </div>

              {/* Fast Steppers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setPrice((prev) => Math.max(5000, prev - 5000))}
                  className="py-4 px-3 bg-white hover:bg-[#F6F1DE] border border-[#1F2A24]/20 rounded-md font-bold text-[18px] cursor-pointer text-[#1F2A24]"
                >
                  - 5,000원
                </button>
                <button
                  onClick={() => setPrice((prev) => Math.max(1000, prev - 1000))}
                  className="py-4 px-3 bg-white hover:bg-[#F6F1DE] border border-[#1F2A24]/20 rounded-md font-bold text-[18px] cursor-pointer text-[#1F2A24]"
                >
                  - 1,000원
                </button>
                <button
                  onClick={() => setPrice((prev) => prev + 1000)}
                  className="py-4 px-3 bg-white hover:bg-[#F6F1DE] border border-[#1F2A24]/20 rounded-md font-bold text-[18px] cursor-pointer text-[#2F5D3A]"
                >
                  + 1,000원
                </button>
                <button
                  onClick={() => setPrice((prev) => prev + 5000)}
                  className="py-4 px-3 bg-[#2F5D3A] hover:bg-[#254b2e] text-white rounded-md font-bold text-[18px] cursor-pointer"
                >
                  + 5,000원
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {[10000, 15000, 20000, 25000, 29000, 35000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setPrice(preset)}
                    className={`px-4 py-2.5 rounded-md font-bold text-[16px] cursor-pointer ${
                      price === preset ? 'bg-[#2F5D3A] text-white' : 'bg-white border border-[#1F2A24]/20 text-[#1F2A24]'
                    }`}
                  >
                    {preset.toLocaleString()}원
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: 오늘 수량 및 최종 확인 */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[15px] text-[#2F5D3A] font-bold">4단계 / 총 4단계</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2A24] mt-1">
                  오늘 아침 수확한 상자(수량)는 몇 개인가요?
                </h3>
                <p className="text-[17px] text-[#1F2A24]/75 mt-2">
                  오늘 출하 가능한 상자 수를 터치해 주세요.
                </p>
              </div>

              {/* Giant Quantity Selector */}
              <div className="bg-white p-6 rounded-md border-2 border-[#2F5D3A] text-center">
                <div className="text-[16px] text-[#1F2A24]/70 font-semibold mb-1">
                  오늘 출하 가능 수량
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-[#D8432E] tabular-nums">
                  {quantity} 상자
                </div>
              </div>

              {/* Fast Stepper Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 20, 30].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuantity(num)}
                    className={`py-4 rounded-md font-bold text-[19px] cursor-pointer ${
                      quantity === num
                        ? 'bg-[#2F5D3A] text-white'
                        : 'bg-white border border-[#1F2A24]/20 text-[#1F2A24]'
                    }`}
                  >
                    {num}상자
                  </button>
                ))}
              </div>

              {/* Farmer Profile Confirm */}
              <div className="bg-[#F6F1DE] p-4 rounded-md text-[16px] text-[#1F2A24] space-y-1">
                <p><strong>생산자 성함:</strong> {farmerName}</p>
                <p><strong>재배 마을:</strong> {village}</p>
                <p><strong>상품 요약:</strong> {productName || '선택한 품목'} · {price.toLocaleString()}원</p>
              </div>
            </div>
          )}

          {/* Step Navigation Bar */}
          <div className="mt-8 pt-6 border-t border-[#1F2A24]/10 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="py-4 px-6 bg-white hover:bg-[#F6F1DE] text-[#1F2A24] border border-[#1F2A24]/20 rounded-md font-bold text-[18px] flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
                <span>이전 단계</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep((prev) => (prev + 1) as any)}
                className="py-4 px-8 bg-[#2F5D3A] hover:bg-[#254b2e] text-white rounded-md font-bold text-[18px] flex items-center gap-2 cursor-pointer"
              >
                <span>다음 단계로</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="py-4 px-8 bg-[#D8432E] hover:bg-[#b83321] text-white rounded-md font-bold text-[19px] flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Check className="w-6 h-6 stroke-[3]" />
                <span>지금 상품 등록 완료</span>
              </button>
            )}
          </div>

        </div>

        {/* Bottom Senior Telephone Help Desk */}
        <div className="bg-[#FBFAF5] p-4 border-t border-[#1F2A24]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#2F5D3A] font-bold text-[16px]">
            <PhoneCall className="w-5 h-5 shrink-0" />
            <span>화면 입력이 어려우신가요? 전화 주시면 직원이 바로 등록해 드립니다.</span>
          </div>
          <span className="text-xl font-bold text-[#D8432E] whitespace-nowrap">
            063-850-2400 (어르신 전담)
          </span>
        </div>

      </div>
    </div>
  );
};
