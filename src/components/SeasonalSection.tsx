import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ShoppingBag, Search, SlidersHorizontal, Eye } from 'lucide-react';

interface SeasonalSectionProps {
  products: Product[];
  activeCategory: ProductCategory | 'all';
  onCategoryChange: (cat: ProductCategory | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedProducerFilter?: string | null;
  onClearProducerFilter?: () => void;
}

export const SeasonalSection: React.FC<SeasonalSectionProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  onSelectProduct,
  onAddToCart,
  selectedProducerFilter,
  onClearProducerFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'seasonal' | 'price-asc' | 'price-desc'>('seasonal');

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (activeCategory !== 'all' && item.category !== activeCategory) {
          return false;
        }
        // Producer filter
        if (selectedProducerFilter && item.producerId !== selectedProducerFilter) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchProducer = item.producerName.toLowerCase().includes(q);
          const matchVillage = item.producerVillage.toLowerCase().includes(q);
          if (!matchName && !matchProducer && !matchVillage) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        // Default seasonal sort (representative items first, then seasonal items)
        if (a.isRepresentative && !b.isRepresentative) return -1;
        if (!a.isRepresentative && b.isRepresentative) return 1;
        return 0;
      });
  }, [products, activeCategory, selectedProducerFilter, searchQuery, sortBy]);

  return (
    <section id="seasonal-section" className="py-20 bg-[#FBFAF5] border-b border-[#1F2A24]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#2F5D3A] text-[15px] font-bold mb-2">
              <span>익산 산지 직거래 몰</span>
              <span aria-hidden="true">·</span>
              <span>오늘 아침 수확한 농수산물</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A24]">
              이달의 제철 농산물
            </h2>
            <p className="mt-2 text-[17px] text-[#1F2A24]/75">
              전북 익산 황등·망성·금마·여산의 농가와 금강 하구 어민들이 수확한 제철 먹거리입니다.
            </p>
          </div>

          {/* Active Producer Filter Alert */}
          {selectedProducerFilter && (
            <div className="flex items-center gap-2 bg-[#F6F1DE] px-4 py-2 rounded-md text-[15px] text-[#2F5D3A] font-semibold border border-[#2F5D3A]/20">
              <span>생산자 모아보기 적용 중</span>
              <button
                onClick={onClearProducerFilter}
                className="underline text-[#D8432E] hover:text-[#b83321] ml-2 cursor-pointer"
              >
                필터 해제
              </button>
            </div>
          )}
        </div>

        {/* Filter Bar: Categories, Search, and Sort */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#1F2A24]/10 shadow-xs mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Segmented Control */}
            <div className="flex items-center gap-1.5 p-1 bg-[#FBFAF5] rounded-md border border-[#1F2A24]/10 overflow-x-auto">
              <button
                onClick={() => onCategoryChange('all')}
                className={`px-4 py-2 text-[16px] font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#2F5D3A] text-white'
                    : 'text-[#1F2A24] hover:text-[#2F5D3A]'
                }`}
              >
                전체 품목 ({products.length})
              </button>
              <button
                onClick={() => onCategoryChange('vegetable')}
                className={`px-4 py-2 text-[16px] font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'vegetable'
                    ? 'bg-[#2F5D3A] text-white'
                    : 'text-[#1F2A24] hover:text-[#2F5D3A]'
                }`}
              >
                채소 (토마토·엽채·뿌리)
              </button>
              <button
                onClick={() => onCategoryChange('fruit')}
                className={`px-4 py-2 text-[16px] font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'fruit'
                    ? 'bg-[#2F5D3A] text-white'
                    : 'text-[#1F2A24] hover:text-[#2F5D3A]'
                }`}
              >
                과일 (메론·수박)
              </button>
              <button
                onClick={() => onCategoryChange('seafood')}
                className={`px-4 py-2 text-[16px] font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'seafood'
                    ? 'bg-[#2F5D3A] text-white'
                    : 'text-[#1F2A24] hover:text-[#2F5D3A]'
                }`}
              >
                수산 (바지락·꽃게·추젓)
              </button>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Input */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-[#1F2A24]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="품목명, 생산자, 마을 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-[15px] bg-[#FBFAF5] border border-[#1F2A24]/15 rounded-md focus:outline-none focus:border-[#2F5D3A] text-[#1F2A24]"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2F5D3A] shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 text-[15px] font-medium bg-[#FBFAF5] border border-[#1F2A24]/15 rounded-md focus:outline-none focus:border-[#2F5D3A] text-[#1F2A24] cursor-pointer"
                >
                  <option value="seasonal">제철 추천순</option>
                  <option value="price-asc">낮은 가격순</option>
                  <option value="price-desc">높은 가격순</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Product Cards Grid: Generous spacing, lead with imagery, zero-pill metadata */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-[#1F2A24]/10">
            <p className="text-xl font-bold text-[#1F2A24] mb-2">검색 결과가 없습니다.</p>
            <p className="text-[16px] text-[#1F2A24]/70">다른 검색어를 입력하시거나 필터를 전체로 변경해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-[#1F2A24]/15 hover:border-[#2F5D3A]/50 transition-all duration-200 overflow-hidden flex flex-col justify-between group shadow-2xs"
              >
                {/* Visual Area */}
                <div>
                  <div
                    className="relative w-full h-64 sm:h-72 bg-[#F6F1DE] overflow-hidden cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback container in case of network variance
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-[#F6F1DE] text-[#2F5D3A] p-4 text-center"><span class="font-bold text-lg">${product.name}</span><span class="text-sm text-[#1F2A24]/70 mt-1">${product.producerVillage}</span></div>`;
                        }
                      }}
                    />

                    {/* Same-day harvest badge in Tomato Red */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      {product.isSameDayDelivery && (
                        <span className="bg-[#D8432E] text-white text-[12px] font-bold px-2 py-0.5 rounded-xs tracking-wide shadow-2xs">
                          오늘 수확 · 당일배송
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-[#1F2A24]/85 text-[#FBFAF5] text-[12px] font-medium px-2.5 py-1 rounded-xs backdrop-blur-xs flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{product.harvestTime}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    {/* Unboxed Metadata with · separator */}
                    <div className="flex items-center gap-1.5 text-[14px] text-[#2F5D3A] font-semibold mb-2">
                      <span>{product.categoryName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.producerVillage}</span>
                      <span aria-hidden="true">·</span>
                      <span>생산자 {product.producerName}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-[19px] sm:text-[20px] font-bold text-[#1F2A24] tracking-tight mb-3 cursor-pointer group-hover:text-[#2F5D3A] transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-[15px] text-[#1F2A24]/75 line-clamp-2 leading-[1.6] mb-4">
                      {product.description}
                    </p>

                    {/* Price & Unit */}
                    <div className="flex items-baseline justify-between gap-2 pt-2 border-t border-[#1F2A24]/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#2F5D3A] tabular-nums">
                          {product.price.toLocaleString()}원
                        </span>
                        {product.originalPrice && (
                          <span className="text-[14px] text-[#1F2A24]/40 line-through tabular-nums">
                            {product.originalPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                      <span className="text-[14px] text-[#1F2A24]/70 font-medium">
                        {product.weightText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 py-3 px-4 bg-[#2F5D3A] hover:bg-[#254b2e] text-[#FBFAF5] rounded-md font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                    <span>장바구니 담기</span>
                  </button>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="py-3 px-3.5 bg-[#FBFAF5] hover:bg-[#F6F1DE] text-[#1F2A24] border border-[#1F2A24]/20 rounded-md font-semibold text-[14px] cursor-pointer transition-colors"
                    title="상세정보 확인"
                  >
                    상세
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
