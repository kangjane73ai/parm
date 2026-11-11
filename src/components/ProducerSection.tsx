import React from 'react';
import { PRODUCER_STORIES } from '../data/mockData';
import { Quote, ArrowRight, UserCheck } from 'lucide-react';

interface ProducerSectionProps {
  onSelectProducerFilter: (producerId: string) => void;
}

export const ProducerSection: React.FC<ProducerSectionProps> = ({ onSelectProducerFilter }) => {
  return (
    <section id="producers-section" className="py-20 bg-[#FBFAF5] border-b border-[#1F2A24]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-2 text-[#2F5D3A] text-[15px] font-bold mb-2">
            <span>생산자의 땀방울이 보이는 농산물</span>
            <span aria-hidden="true">·</span>
            <span>익산 시니어 농가 상생</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A24]">
            익산 농부들의 새벽 이야기
          </h2>
          <p className="mt-3 text-[18px] text-[#1F2A24]/80 leading-[1.7]">
            스마트폰과 온라인 판매가 낯설어 좋은 농산물을 헐값에 넘겨야 했던 우리 이웃 어르신들입니다.
            강희 농장은 익산 어르신들이 농사에만 전념하실 수 있도록 직거래 창구를 만듭니다.
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-12">
          {PRODUCER_STORIES.map((story, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={story.id}
                className="bg-white rounded-lg border border-[#1F2A24]/15 overflow-hidden p-6 sm:p-8 lg:p-10 shadow-xs"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Photo & Metadata Column */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-md overflow-hidden bg-[#F6F1DE] aspect-square max-h-[380px]">
                      <img
                        src={story.image}
                        alt={`${story.name} 인물 사진`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-[#2F5D3A] text-white text-[13px] font-bold px-3 py-1 rounded-xs">
                        {story.career}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-[15px] text-[#1F2A24]/80">
                      <div className="flex items-center gap-1.5 font-semibold text-[#2F5D3A]">
                        <UserCheck className="w-4 h-4" />
                        <span>{story.village}</span>
                      </div>
                      <span className="font-medium text-[#1F2A24]/60">{story.crop}</span>
                    </div>
                  </div>

                  {/* Interview & Quote Column */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-between`}>
                    <div>
                      {/* Name & Title */}
                      <div className="flex items-baseline gap-3 mb-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2A24]">
                          {story.name}
                        </h3>
                        <span className="text-[16px] text-[#2F5D3A] font-semibold">
                          재배 품목: {story.crop}
                        </span>
                      </div>

                      {/* Highlight Quote */}
                      <div className="relative pl-6 py-2 mb-6 border-l-2 border-[#2F5D3A] bg-[#FBFAF5] rounded-r-md">
                        <Quote className="w-6 h-6 text-[#2F5D3A]/40 mb-1" />
                        <blockquote className="text-[19px] sm:text-[20px] font-bold text-[#1F2A24] leading-[1.5]">
                          “{story.quote}”
                        </blockquote>
                      </div>

                      {/* Long Interview Body */}
                      <p className="text-[17px] text-[#1F2A24]/85 leading-[1.75] mb-6">
                        {story.interview}
                      </p>

                      {/* Farming Philosophy */}
                      <div className="bg-[#F6F1DE]/70 p-4 rounded-md mb-8 text-[15px] text-[#1F2A24]">
                        <span className="font-bold text-[#2F5D3A] mr-2">어르신의 재배 원칙:</span>
                        <span>{story.harvestPhilosophy}</span>
                      </div>
                    </div>

                    {/* Filter Button */}
                    <div>
                      <button
                        onClick={() => onSelectProducerFilter(story.id)}
                        className="inline-flex items-center gap-2 py-3 px-5 bg-[#2F5D3A] hover:bg-[#254b2e] text-[#FBFAF5] rounded-md font-bold text-[16px] transition-colors cursor-pointer"
                      >
                        <span>{story.name}의 오늘 수확 상품 보기</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
