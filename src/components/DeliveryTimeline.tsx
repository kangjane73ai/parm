import React from 'react';
import { TIMELINE_STEPS } from '../data/mockData';
import { Sunrise, CheckCircle2, PackageCheck, Truck, Home, ArrowRight } from 'lucide-react';

export const DeliveryTimeline: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sunrise':
        return <Sunrise className="w-6 h-6 stroke-[2]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 stroke-[2]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 stroke-[2]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 stroke-[2]" />;
      case 'Home':
        return <Home className="w-6 h-6 stroke-[2]" />;
      default:
        return <Truck className="w-6 h-6 stroke-[2]" />;
    }
  };

  return (
    <section className="py-20 bg-[#F6F1DE]/70 border-b border-[#1F2A24]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-[#2F5D3A] text-[15px] font-bold mb-2">
            <span>수확에서 식탁까지 12시간</span>
            <span aria-hidden="true">·</span>
            <span>중간 유통 마진 제로</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A24]">
            강희 농장의 당일 수확 · 당일 도착 흐름
          </h2>
          <p className="mt-3 text-[18px] text-[#1F2A24]/80 leading-[1.7]">
            경매장과 저온 저장고를 전전하며 3~5일이 걸리던 기존 유통을 없앴습니다.
            익산 농가에서 딴 과채가 오늘 저녁 댁의 식탁으로 바로 갑니다.
          </p>
        </div>

        {/* Horizontal Timeline (Desktop) & Step list (Mobile) */}
        <div className="relative mb-14">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-[#2F5D3A]/25 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {TIMELINE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 border border-[#2F5D3A]/20 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  {/* Timestamp & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-[#D8432E] tabular-nums font-mono">
                      {step.time}
                    </span>
                    <div className="w-10 h-10 rounded-md bg-[#2F5D3A] text-white flex items-center justify-center shrink-0">
                      {getIcon(step.iconName)}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-[18px] font-bold text-[#1F2A24] mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-[#1F2A24]/75 leading-[1.65]">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1F2A24]/10 text-[13px] font-semibold text-[#2F5D3A] flex items-center gap-1">
                  <span>0{idx + 1}단계</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Callout: Traditional Wholesale vs Kanghee Direct */}
        <div className="bg-white rounded-lg border border-[#1F2A24]/15 p-6 sm:p-8 max-w-4xl mx-auto">
          <h4 className="text-xl font-bold text-[#1F2A24] mb-4 text-center sm:text-left">
            왜 당일 직거래 농산물이 다를까요?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[16px] leading-[1.7]">
            <div className="bg-[#FBFAF5] p-5 rounded-md border border-[#1F2A24]/10">
              <p className="font-bold text-[#1F2A24]/60 text-[15px] mb-2">일반 대형 마트 및 도매 유통</p>
              <ul className="space-y-2 text-[#1F2A24]/80 text-[15px]">
                <li>• 덜 익은 과채 조기 수확 (유통 기한 연장 목적)</li>
                <li>• 산지 수집상 → 경매장 → 중도매인 → 물류센터</li>
                <li>• 수확 후 식탁까지 <span className="font-bold text-[#1F2A24]">최소 4~7일 소요</span></li>
                <li>• 수확 후 냉장 보관으로 과육 향과 수분 감소</li>
              </ul>
            </div>

            <div className="bg-[#F6F1DE]/90 p-5 rounded-md border border-[#2F5D3A]/30">
              <p className="font-bold text-[#2F5D3A] text-[15px] mb-2">강희 농장 산지 직거래 당일배송</p>
              <ul className="space-y-2 text-[#1F2A24] text-[15px]">
                <li>• 줄기에서 완전히 영근 후 <span className="font-bold text-[#2F5D3A]">당일 아침 6시 수확</span></li>
                <li>• 유통 단계 0개 (수확 농가 → 강희 농장 물류 → 고객 문 앞)</li>
                <li>• 수확 후 식탁까지 <span className="font-bold text-[#D8432E]">12시간 이내 도착</span></li>
                <li>• 산지 농가에 제값 지급 & 소비자에 합리적 가격</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
