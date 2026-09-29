
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="px-6 mt-4">
      <h5 className="text-[15.5px] font-bold leading-[1.2] tracking-tight text-slate-900">
         안드로이드 7년의 운영 경험을 바탕으로, 문제를 끝까지 추적하고, 개선을 결과로 검증하는 백엔드 개발자입니다.
        <br />
        최근 Spring Boot 기반 프로젝트에서{" "}
        <span className="text-primary">JWT 인증, MSA 주문 흐름, Redis 캐싱, 동시성 제어, 실시간 KIS 시세 처리</span>
        등을 구현하며 안정적인 서버 흐름을 설계하고 구현하는 경험을 쌓았습니다.<br />
      </h5>
    </section>
  );
};
export default Hero;
