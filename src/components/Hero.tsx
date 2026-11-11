import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onExploreClick }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isPassed: boolean }>({
    hours: 2,
    minutes: 42,
    seconds: 18,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target is 11:00 AM today
      const cutoff = new Date();
      cutoff.setHours(11, 0, 0, 0);

      let diff = cutoff.getTime() - now.getTime();
      let passed = false;

      // If past 11:00 AM, count down to tomorrow 11:00 AM
      if (diff <= 0) {
        passed = true;
        const tomorrowCutoff = new Date(cutoff.getTime() + 24 * 60 * 60 * 1000);
        diff = tomorrowCutoff.getTime() - now.getTime();
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, isPassed: passed });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2Digits = (num: number) => num.toString().padStart(2, '0');

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#1F2A24]">
      {/* High-fidelity farm photography background with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_iksan_farm_1794379905199.jpg"
          alt="익산 햇살 가득한 온실 하우스와 당일 수확 과채 상자"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim according to design constitution */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A24]/90 via-[#1F2A24]/75 to-transparent sm:to-[#1F2A24]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24] via-transparent to-[#1F2A24]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          {/* Authentic Local Producer Tagline - clean text, no pill */}
          <div className="flex items-center gap-2 text-[#7BB661] text-[15px] sm:text-[16px] font-semibold mb-4 tracking-wide">
            <span>전북 익산 산지 직거래</span>
            <span aria-hidden="true">·</span>
            <span>중간 도매 없는 당일 출하</span>
            <span aria-hidden="true">·</span>
            <span>생산자 실명제</span>
          </div>

          {/* Headline - Exact PRD required copy */}
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-[#FBFAF5] leading-[1.25] tracking-tight mb-6 [text-wrap:balance]">
            오늘 아침 익산에서 딴 <span className="text-[#F6F1DE] underline decoration-[#7BB661] decoration-4 underline-offset-8">메론과 토마토</span>, 오늘 저녁 식탁에
          </h1>

          {/* Subheading - Concrete facts, no abstract buzzwords */}
          <p className="text-[18px] sm:text-[20px] text-[#FBFAF5]/90 leading-[1.7] mb-8 font-normal [text-wrap:balance]">
            새벽 6시 수확, 비파괴 당도 선별 후 오전 11시 주문 마감 즉시 출발합니다.
            냉동 저장고를 거치지 않아 과육의 본래 향과 수분이 살아있습니다.
          </p>

          {/* Cutoff Countdown Box (Distinctive branded timer, not generic AI pill) */}
          <div className="mb-9 p-5 sm:p-6 bg-[#FBFAF5]/95 border border-[#F6F1DE] rounded-lg shadow-xs text-[#1F2A24] max-w-xl">
            <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b border-[#1F2A24]/10">
              <div className="flex items-center gap-2 font-bold text-[17px] text-[#2F5D3A]">
                <Clock className="w-5 h-5 stroke-[2.2] text-[#D8432E]" />
                <span>
                  {timeLeft.isPassed ? '내일 당일출하 마감까지' : '오늘 수확 당일도착 마감까지'}
                </span>
              </div>
              <span className="text-[14px] font-semibold text-[#D8432E] bg-[#D8432E]/10 px-2.5 py-0.5 rounded-sm">
                오전 11:00 마감
              </span>
            </div>

            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="text-[15px] sm:text-[16px] text-[#1F2A24]/80">남은 시간:</span>
              <div className="flex items-center gap-1.5 font-bold text-2xl sm:text-3xl text-[#1F2A24] tabular-nums">
                <span className="bg-[#1F2A24] text-[#FBFAF5] px-2 py-0.5 rounded-sm">
                  {format2Digits(timeLeft.hours)}
                </span>
                <span>시간</span>
                <span className="bg-[#1F2A24] text-[#FBFAF5] px-2 py-0.5 rounded-sm">
                  {format2Digits(timeLeft.minutes)}
                </span>
                <span>분</span>
                <span className="bg-[#D8432E] text-[#FBFAF5] px-2 py-0.5 rounded-sm">
                  {format2Digits(timeLeft.seconds)}
                </span>
                <span>초</span>
              </div>
            </div>

            <div className="mt-3 text-[14px] sm:text-[15px] text-[#1F2A24]/75 flex items-center gap-2">
              <Truck className="w-4 h-4 shrink-0 text-[#2F5D3A]" />
              <span>익산·전주·군산 저녁 7시 전 도착 / 그 외 전국 내일 오전 신선 도착</span>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOrderClick}
              className="px-8 py-4 bg-[#2F5D3A] hover:bg-[#254b2e] text-[#FBFAF5] font-bold text-[18px] rounded-md transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-sm"
            >
              <span>지금 주문하기</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={onExploreClick}
              className="px-6 py-4 bg-[#F6F1DE] hover:bg-[#ede5cc] text-[#2F5D3A] font-bold text-[17px] rounded-md transition-colors flex items-center justify-center cursor-pointer border border-[#2F5D3A]/20"
            >
              <span>대표 메론·토마토 보기</span>
            </button>
          </div>

          {/* 3 Core Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-[#FBFAF5]/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#FBFAF5]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-[#2F5D3A] text-[#FBFAF5] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[16px]">유통 단계 0단계</p>
                <p className="text-[14px] text-[#FBFAF5]/80 leading-snug">농가 밭에서 소비자 식탁으로 직행</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-[#2F5D3A] text-[#FBFAF5] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[16px]">수확 12시간 내 도착</p>
                <p className="text-[14px] text-[#FBFAF5]/80 leading-snug">오전 11시 전 주문 시 당일 저녁 식탁</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-[#2F5D3A] text-[#FBFAF5] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[16px]">생산자 실명 표기</p>
                <p className="text-[14px] text-[#FBFAF5]/80 leading-snug">재배 어르신 이름과 마을 공개</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
