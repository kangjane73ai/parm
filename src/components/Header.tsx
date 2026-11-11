import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sprout } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSeniorSeller: () => void;
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onScrollToSection: (sectionId: string) => void;
  activeCategory: ProductCategory | 'all';
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSeniorSeller,
  onSelectCategory,
  onScrollToSection,
  activeCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, category?: ProductCategory | 'all') => {
    if (category !== undefined) {
      onSelectCategory(category);
    }
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFAF5]/95 backdrop-blur-xs border-b border-[#1F2A24]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-md bg-[#2F5D3A] flex items-center justify-center text-[#FBFAF5] shrink-0">
              <Sprout className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#2F5D3A] whitespace-nowrap">
              강희 농장
            </span>
          </button>

          {/* Zone 2: Primary Nav Links (Single line, text-only with subtle hover) */}
          <nav className="hidden md:flex items-center gap-7 text-[17px] font-semibold text-[#1F2A24]">
            <button
              onClick={() => handleNavClick('seasonal-section', 'vegetable')}
              className={`hover:text-[#2F5D3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeCategory === 'vegetable' ? 'border-[#2F5D3A] text-[#2F5D3A]' : 'border-transparent'
              }`}
            >
              채소
            </button>
            <button
              onClick={() => handleNavClick('seasonal-section', 'fruit')}
              className={`hover:text-[#2F5D3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeCategory === 'fruit' ? 'border-[#2F5D3A] text-[#2F5D3A]' : 'border-transparent'
              }`}
            >
              과일
            </button>
            <button
              onClick={() => handleNavClick('seasonal-section', 'seafood')}
              className={`hover:text-[#2F5D3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeCategory === 'seafood' ? 'border-[#2F5D3A] text-[#2F5D3A]' : 'border-transparent'
              }`}
            >
              수산
            </button>
            <button
              onClick={() => handleNavClick('producers-section')}
              className="hover:text-[#2F5D3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent text-[#1F2A24]/90"
            >
              생산자 이야기
            </button>
            <button
              onClick={onOpenSeniorSeller}
              className="text-[#2F5D3A] hover:text-[#1F2A24] transition-colors whitespace-nowrap shrink-0 py-1 font-semibold border-b-2 border-transparent"
            >
              판매자 등록
            </button>
          </nav>

          {/* Zone 3: Primary Action (Cart) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-[#2F5D3A] text-[#FBFAF5] rounded-md hover:bg-[#254b2e] transition-colors cursor-pointer text-[16px] font-semibold whitespace-nowrap"
              aria-label="장바구니 열기"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              <span>장바구니</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#D8432E] text-white text-xs font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1F2A24] rounded-md hover:bg-[#F6F1DE] transition-colors"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1F2A24]/10 bg-[#FBFAF5] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-[18px] font-semibold text-[#1F2A24]">
            <button
              onClick={() => handleNavClick('seasonal-section', 'vegetable')}
              className="text-left py-2 hover:text-[#2F5D3A]"
            >
              채소 (석탄동 완숙 토마토 · 쌈채소 · 당근)
            </button>
            <button
              onClick={() => handleNavClick('seasonal-section', 'fruit')}
              className="text-left py-2 hover:text-[#2F5D3A]"
            >
              과일 (석탄동 머스크메론 · 꿀수박)
            </button>
            <button
              onClick={() => handleNavClick('seasonal-section', 'seafood')}
              className="text-left py-2 hover:text-[#2F5D3A]"
            >
              수산 (참바지락 · 생물 꽃게 · 추젓)
            </button>
            <button
              onClick={() => handleNavClick('producers-section')}
              className="text-left py-2 hover:text-[#2F5D3A]"
            >
              생산자 이야기 (익산 농가 인터뷰)
            </button>
            <div className="pt-2 border-t border-[#1F2A24]/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSeniorSeller();
                }}
                className="w-full text-left py-3 px-4 rounded-md bg-[#F6F1DE] text-[#2F5D3A] font-bold"
              >
                시니어 농가 간편 상품 등록 (3분)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
