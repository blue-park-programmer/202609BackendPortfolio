import React from 'react';

const PROFICIENCIES = [
  {
    title: '트랜잭션·동시성 제어',
    description:
      '공유 상태 변경과 비동기 연결 경합을 잠금, 세대 식별자, 원자적 상태 전환으로 제어했습니다.',
    evidence: '8282 Refresh Token 재발급 직렬화, 4JO WebSocket 세대 식별자 기반 세션 누수 차단',
    icon: 'sync_lock'
  },
  {
    title: '캐싱·외부 API 성능 개선',
    description:
      'Redis Cache Miss 시 외부 API 중복 호출을 Single-flight로 병합하고 부하 테스트로 개선 효과를 검증했습니다.',
    evidence: '4JO 현재가 조회 처리량 156.3 -> 260.1 req/s, p99 4,935 -> 3,097ms 개선',
    icon: 'speed'
  },
  {
    title: 'DB 스키마·마이그레이션 관리',
    description:
      '자동 DDL 대신 Flyway Migration과 시작 시 스키마 검증으로 변경 이력과 배포 재현성을 관리했습니다.',
    evidence: '0404 Order Service Flyway Migration, ddl-auto validate 및 clean 비활성화 적용',
    icon: 'database'
  },
  {
    title: '외부 연동 장애 대응',
    description:
      '원격 호출 실패를 일시 장애와 업무 오류로 구분하고 호출별 Retry와 지수 Backoff를 설계했습니다.',
    evidence: '0404 ProductCommand·DeliveryCreate 호출별 Retry 및 NonRetryableRemoteException 제외',
    icon: 'hub'
  }
];

const Proficiency: React.FC = () => {
  return (
    <section className="px-6 mt-8">
      <h3 className="text-lg font-bold mb-4 tracking-tight">Proficiency</h3>
      <div className="space-y-3">
        {PROFICIENCIES.map((item) => (
          <article key={item.title} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-slate-900 leading-snug">{item.title}</h4>
                <p className="mt-2 text-[13px] leading-6 text-slate-600">{item.description}</p>
                <p className="mt-2 text-[12px] leading-5 text-slate-400">{item.evidence}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Proficiency;
