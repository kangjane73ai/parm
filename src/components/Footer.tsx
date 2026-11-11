import React from 'react';
import { Sprout, Phone, Clock, MapPin, ShieldCheck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F2A24] text-[#FBFAF5] pt-16 pb-12 border-t border-[#FBFAF5]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#FBFAF5]/15">
          
          {/* Col 1: Brand & Promise */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#2F5D3A] flex items-center justify-center text-[#FBFAF5]">
                <Sprout className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#FBFAF5]">
                강희 농장
              </span>
            </div>
            <p className="text-[15px] text-[#FBFAF5]/80 leading-[1.7]">
              익산 농가가 오늘 아침 수확한 메론과 토마토를 그날 저녁 식탁까지 전하는 신선 직거래 몰입니다.
              중간 유통 단계를 없애 농가에는 정당한 수익을, 소비자에게는 가장 신선한 맛을 약속합니다.
            </p>
            <div className="text-[13px] text-[#7BB661] font-semibold">
              전북 익산 석탄동 강희농장 본원 · 황등 · 망성 · 여산 · 금마 농가 협동
            </div>
          </div>

          {/* Col 2: Customer Center & Senior Call */}
          <div className="space-y-3">
            <h4 className="text-[17px] font-bold text-[#FBFAF5] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#7BB661]" />
              <span>고객센터 & 시니어 전화 주문</span>
            </h4>
            <div className="text-2xl font-bold text-[#F6F1DE] tabular-nums">
              063-850-2400
            </div>
            <div className="space-y-1 text-[14px] text-[#FBFAF5]/75">
              <p className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#7BB661]" />
                <span>평일: 07:00 ~ 18:00 (새벽 수확 상담)</span>
              </p>
              <p className="pl-5.5">토요일: 07:00 ~ 13:00 / 일요일·공휴일 휴무</p>
              <p className="pt-2 text-[#7BB661] text-[13px] leading-relaxed">
                * 인터넷 주문이 어려운 어르신은 전화 주시면 주문과 상품 등록을 직접 도와드립니다.
              </p>
            </div>
          </div>

          {/* Col 3: Delivery Policy */}
          <div className="space-y-3">
            <h4 className="text-[17px] font-bold text-[#FBFAF5] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7BB661]" />
              <span>당일배송 안내</span>
            </h4>
            <ul className="space-y-2 text-[14px] text-[#FBFAF5]/80 leading-relaxed">
              <li>
                <strong>주문 마감 시각:</strong> 매일 오전 11:00
              </li>
              <li>
                <strong>당일 도착 권역:</strong> 익산시 전역, 전주시, 군산시 (당일 19시 이전 문 앞 도착)
              </li>
              <li>
                <strong>전국 익일 택배:</strong> 수도권 및 기타 전국 (우체국 특급, 내일 오전 도착)
              </li>
              <li>
                <strong>배송비:</strong> 30,000원 이상 무료배송 (기본 3,500원)
              </li>
            </ul>
          </div>

          {/* Col 4: Freshness Guarantee */}
          <div className="space-y-3">
            <h4 className="text-[17px] font-bold text-[#FBFAF5] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#7BB661]" />
              <span>100% 신선 보장제</span>
            </h4>
            <p className="text-[14px] text-[#FBFAF5]/80 leading-relaxed">
              농산물 특성상 배송 중 파손, 무름, 당도 불만족 발생 시 수령 당일 사진 한 장만 보내주시면
              묻지도 따지지도 않고 <span className="text-[#F6F1DE] font-bold">100% 재배송 또는 전액 환불</span>해 드립니다.
            </p>
            <div className="p-3 bg-[#2F5D3A]/40 rounded-md border border-[#2F5D3A] text-[13px] text-[#F6F1DE]">
              안심 접수: 문자 010-8500-2400 (사진 첨부)
            </div>
          </div>

        </div>

        {/* Legal & Business Registration Footer */}
        <div className="pt-8 text-[13px] text-[#FBFAF5]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p>
              농업회사법인 강희 농장 주식회사 · 대표: 김강희 · 개인정보보호책임자: 김강희
            </p>
            <p className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>사업장 소재지: 전북특별자치도 익산시 석탄동 강희농장 산지유통센터</span>
              </span>
              <span>· 사업자등록번호: 402-86-12345</span>
              <span>· 통신판매업신고: 제2026-전북익산-0128호</span>
            </p>
          </div>
          <div className="text-right whitespace-nowrap text-[#FBFAF5]/50">
            © 2026 강희 농장. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
