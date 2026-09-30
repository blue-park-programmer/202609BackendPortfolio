
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="px-6 mt-5">
      <p className="text-sm font-semibold text-primary mb-2">
        Android 상용 서비스 7년 운영 → Backend
      </p>
      <h2 className="text-[24px] font-bold leading-[1.4] tracking-tight text-slate-900">
        문제를 끝까지 추적하고,
        <br />
        <span className="text-primary">개선을 결과로 검증하는</span>
        <br />
        백엔드 개발자 박수연입니다.
      </h2>
      <p className="mt-4 text-[14px] leading-6 text-slate-600">
        Android 상용 서비스를 7년 이상 개발·운영하며 장애 대응과 성능 개선을 경험했고, Spring Boot 기반 백엔드 프로젝트 3개에서 Redis·Kafka·PostgreSQL을 활용해 동시성 제어와 데이터 정합성을 다루고, MSA 환경의 서비스 간 통신을 구현했습니다.
      </p>
    </section>
  );
};
export default Hero;
