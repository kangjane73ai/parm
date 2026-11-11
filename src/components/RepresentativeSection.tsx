import React from 'react';
import { Product } from '../types';
import { ShoppingBag, ChevronRight, Check } from 'lucide-react';

interface RepresentativeSectionProps {
  melon: Product;
  tomato: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const RepresentativeSection: React.FC<RepresentativeSectionProps> = ({
  melon,
  tomato,
  onSelectProduct,
  onAddToCart,
}) => {
  return (
    <section id="representative-section" className="py-20 bg-[#FBFAF5] border-b border-[#1F2A24]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#2F5D3A] text-[15px] font-bold mb-2">
            <span>강희 농장 2대 대표 작물</span>
            <span aria-hidden="true">·</span>
            <span>익산 석탄동 강희농장 직영 온실의 결실</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A24]">
            오늘 아침 딴 대표 품목
          </h2>
          <p className="mt-3 text-[18px] text-[#1F2A24]/80 max-w-2xl leading-[1.7]">
            수확 후 저장고에 묵히지 않고, 향과 수분이 가장 팽팽한 당일 아침 출하합니다.
          </p>
        </div>

        {/* Asymmetrical 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Item 1: Melon (7 Columns - Dominant visual focus) */}
          <div className="lg:col-span-7 bg-[#F6F1DE] rounded-lg border border-[#2F5D3A]/15 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            <div>
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="bg-[#D8432E] text-white text-[13px] font-bold px-2.5 py-1 rounded-xs tracking-wide">
                    오늘 수확 · 당일배송
                  </span>
                  <span className="text-[14px] font-semibold text-[#2F5D3A]">
                    {melon.sugarContent}
                  </span>
                </div>
                <div className="text-[14px] text-[#1F2A24]/70">
                  {melon.producerVillage} · {melon.producerName}
                </div>
              </div>

              {/* Title & Price */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2A24] tracking-tight mb-3">
                {melon.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#2F5D3A] tabular-nums">
                  {melon.price.toLocaleString()}원
                </span>
                {melon.originalPrice && (
                  <span className="text-[16px] text-[#1F2A24]/40 line-through tabular-nums">
                    {melon.originalPrice.toLocaleString()}원
                  </span>
                )}
                <span className="text-[15px] text-[#1F2A24]/70 font-medium">
                  / {melon.weightText}
                </span>
              </div>

              {/* Photography Showcase */}
              <div className="relative w-full h-72 sm:h-88 rounded-md overflow-hidden mb-6 bg-[#FBFAF5] cursor-pointer group"
                onClick={() => onSelectProduct(melon)}
              >
                <img
                  src={melon.image}
                  alt={melon.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-[#1F2A24]/85 text-[#FBFAF5] text-[13px] font-medium px-3 py-1 rounded-xs backdrop-blur-xs">
                  실물 사진 · {melon.harvestTime}
                </div>
              </div>

              {/* Agronomic Details */}
              <div className="space-y-3 mb-8 text-[16px] sm:text-[17px] text-[#1F2A24] leading-[1.7]">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="font-semibold text-[#2F5D3A]">한 덩굴 일과일주(一果一株): </strong>
                    {melon.description}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="font-semibold text-[#2F5D3A]">식감과 향: </strong>
                    {melon.textureNote}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="font-semibold text-[#2F5D3A]">수확 및 출하 시기: </strong>
                    {melon.harvestSeason} (오늘 06시 선별 출하 완료)
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-[#2F5D3A]/15">
              <button
                onClick={() => onAddToCart(melon)}
                className="flex-1 py-3.5 px-6 bg-[#2F5D3A] hover:bg-[#254b2e] text-[#FBFAF5] rounded-md font-bold text-[17px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2]" />
                <span>장바구니 담기</span>
              </button>
              <button
                onClick={() => onSelectProduct(melon)}
                className="py-3.5 px-5 bg-white hover:bg-[#FBFAF5] text-[#1F2A24] border border-[#1F2A24]/20 rounded-md font-semibold text-[16px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>상세 정보 보기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Item 2: Tomato (5 Columns - Vertical contrast) */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-[#1F2A24]/15 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            <div>
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="bg-[#D8432E] text-white text-[13px] font-bold px-2.5 py-1 rounded-xs tracking-wide">
                    오늘 수확 · 당일배송
                  </span>
                  <span className="text-[13px] font-bold text-[#2F5D3A]">
                    수정벌 자연 착과
                  </span>
                </div>
                <div className="text-[14px] text-[#1F2A24]/70">
                  {tomato.producerVillage}
                </div>
              </div>

              {/* Title & Price */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2A24] tracking-tight mb-3">
                {tomato.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#2F5D3A] tabular-nums">
                  {tomato.price.toLocaleString()}원
                </span>
                {tomato.originalPrice && (
                  <span className="text-[16px] text-[#1F2A24]/40 line-through tabular-nums">
                    {tomato.originalPrice.toLocaleString()}원
                  </span>
                )}
                <span className="text-[15px] text-[#1F2A24]/70 font-medium">
                  / {tomato.weightText}
                </span>
              </div>

              {/* Photography Showcase */}
              <div className="relative w-full h-64 sm:h-76 rounded-md overflow-hidden mb-6 bg-[#FBFAF5] cursor-pointer group"
                onClick={() => onSelectProduct(tomato)}
              >
                <img
                  src={tomato.image}
                  alt={tomato.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-[#1F2A24]/85 text-[#FBFAF5] text-[13px] font-medium px-3 py-1 rounded-xs backdrop-blur-xs">
                  실물 사진 · {tomato.harvestTime}
                </div>
              </div>

              {/* Agronomic Details */}
              <div className="space-y-3 mb-8 text-[16px] sm:text-[17px] text-[#1F2A24] leading-[1.7]">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="font-semibold text-[#2F5D3A]">수정벌 착과: </strong>
                    호르몬제 없이 꿀벌로만 결실을 맺어 씨방이 알차고 묵직합니다.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="font-semibold text-[#2F5D3A]">찰기 있는 과육: </strong>
                    {tomato.textureNote}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="font-semibold text-[#2F5D3A]">생산자: </strong>
                    {tomato.producerName} ({tomato.producerCareer})
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-[#1F2A24]/10">
              <button
                onClick={() => onAddToCart(tomato)}
                className="flex-1 py-3.5 px-6 bg-[#2F5D3A] hover:bg-[#254b2e] text-[#FBFAF5] rounded-md font-bold text-[17px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2]" />
                <span>장바구니 담기</span>
              </button>
              <button
                onClick={() => onSelectProduct(tomato)}
                className="py-3.5 px-5 bg-white hover:bg-[#FBFAF5] text-[#1F2A24] border border-[#1F2A24]/20 rounded-md font-semibold text-[16px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>상세 보기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
