import { MainProject, Skill, OtherProject } from './types';

export const MAIN_PROJECTS: MainProject[] = [
  {
    id: 'stock4jo',
    title: '주식 4JO',
    description: '실시간 시세 처리와 현재가 조회 성능을 개선한 MSA 기반 주식 자동매매 서비스',
    simpleDescription:
      '내일배움캠프에서 진행한 투자 전략 위험 분석 및 자동매매 서비스입니다. Market Service를 담당하며 현재가 조회와 실시간 시세 데이터 처리 흐름을 구현했습니다.',
    fullDescription:
      'Market Service를 담당하며 KIS Open API/WebSocket 기반 현재가·실시간 시세 처리, Redis 캐싱, Kafka 이벤트 발행, REST 일별 시세 저장 흐름을 구현했습니다.',
    responsibilities: [
      'KIS Open API 기반 종목, 현재가, 일별 시세 조회 API 구현',
      'Redis Cache-Aside와 60초 TTL을 적용해 반복 현재가 조회 비용 감소',
      'KIS WebSocket 실시간 체결가 구독, 해제, 재연결 흐름 구현',
      '실시간 시세 데이터를 Kafka 이벤트로 비동기 발행하는 흐름 구현',
      'Partial Unique Index + ON CONFLICT DO NOTHING으로 REST 일별 시세 중복 저장 방지'
    ],
    techStack: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'WebSocket',
      'OpenFeign',
      'JMeter',
      'KIS Open API',
      'Docker Compose'
    ],
    troubleshooting: [
      'WebSocket 경합 — handshake timeout과 connectionGeneration을 적용해 timeout 이후 뒤늦게 성공한 이전 세션이 활성 세션을 덮어쓰지 못하도록 방어',
      '세션 정리 — 최신 세대가 아닌 세션은 즉시 close하고, 세션 등록 직후 폐기 여부를 재확인해 shutdown과 세션 등록 사이의 경합을 방어',
      '부하 테스트 — JMeter 100 Threads × 10 Loop에서 현재가 조회 Cache Miss 구간의 처리량 156.3 req/s, p99 4,935ms, 에러율 0.20% 확인',
      '1차 개선 실패 — 대표 요청 실패가 대기 요청 전체에 전파되며 에러율이 0.20%에서 6.60%로 증가',
      '정책 수정 — 성공 결과만 공유하고 실패 요청은 각각 독립적으로 재시도하도록 변경',
      '재측정 — 처리량 260.1 req/s(+66%), p99 3,097ms(-37%), 에러율 0.10%로 개선'
    ],
    performanceResults: [
      { label: 'Throughput', value: '156.3 → 260.1 req/s', delta: '+66%' },
      { label: 'p99', value: '4,935 → 3,097ms', delta: '-37%' },
      { label: 'Error Rate', value: '0.20% → 0.10%', delta: '-0.10%p' }
    ],
    implementation: [
      'Cache-Aside + Single-flight를 결합해 동일 종목 Cache Miss 요청이 외부 API로 중복 전파되는 범위를 줄이는 구조 적용',
      'WebSocket으로 수신한 실시간 시세 처리와 Kafka 기반 후속 처리를 분리',
      'Partial Unique Index + ON CONFLICT DO NOTHING으로 동시 저장 상황에서도 REST 일별 시세 중복을 DB 레벨에서 방어'
    ],
    learnings: [
      '동시 Cache Miss 상황에서는 단순 재시도보다 Single-flight로 요청을 병합해야 외부 API와 Redis의 중복 부하를 줄일 수 있음을 배웠습니다.',
      '비동기 연결은 timeout만으로 종료를 보장할 수 없으며, 세대 식별자와 원자적 상태 전환으로 이전 연결과 신규 연결의 경합을 제어해야 함을 배웠습니다.',
      '배치 적재의 중복 검증을 건별 조회에서 범위 조회와 Set 비교로 전환하면 DB Query 수를 줄일 수 있음을 배웠습니다.',
      '금융 주문에서는 전략 신호 값과 실제 체결·접수 값을 분리해야 실행 이력을 정확하게 추적할 수 있음을 배웠습니다.'
    ],
    heroImage: '/stock4jo/hero.png',
    screenshots: [
      '/stock4jo/page-06.png',
      '/stock4jo/page-07.png',
      '/stock4jo/page-08.png',
      '/stock4jo/page-16.png',
      '/stock4jo/page-19.png',
      '/stock4jo/page-21.png'
    ],
    githubUrl: 'https://github.com/sajo-team/sajo',
    demoUrl: 'https://www.youtube.com/watch?v=V6zNIwc7PT0&feature=youtu.be',
    icon: 'show_chart',
    iconBg: 'bg-emerald-600',
    technologies: [
      { name: 'REDIS CACHE', colorClass: 'bg-red-500/10 text-red-600' },
      { name: 'SINGLE-FLIGHT', colorClass: 'bg-cyan-500/10 text-cyan-700' },
      { name: 'KAFKA EVENT', colorClass: 'bg-violet-500/10 text-violet-600' }
    ]
  },
  {
    id: 'msa0404',
    title: '0404 물류/배송 플랫폼',
    description: 'Saga와 멱등성 키로 주문 실패 복구 흐름을 설계한 MSA 물류 플랫폼',
    simpleDescription:
      '내일배움캠프에서 진행한 MSA 기반 물류/배송 플랫폼입니다. Order Service를 담당하며 주문 생성과 실패 복구 흐름을 구현했습니다.',
    fullDescription:
      '주문 생성 과정에서 재고 차감, 주문 저장, 배송 생성이 서로 다른 서비스와 DB에 걸쳐 실행되는 문제를 Orchestration Saga로 조정했습니다. 주문 아이템별 stockOperationId를 영속화해 재고 차감과 보상 요청에서 동일한 멱등성 키를 재현할 수 있도록 구현했습니다.',
    responsibilities: [
      'Order Service 주문 생성 흐름과 Orchestration Saga 설계',
      '재고 차감 실패와 배송 생성 실패를 고려한 보상 흐름 구현',
      '주문 아이템별 stockOperationId를 영속화해 재고 차감과 복구 요청의 멱등성 키 재현',
      'REQUIRES_NEW로 Saga 실패 기록을 원 주문 트랜잭션 롤백과 독립적으로 보존',
      'PESSIMISTIC_WRITE로 동일 Saga에 대한 관리자 동시 재처리 방지',
      'QueryDSL 기반 역할별 동적 검색과 fetch join을 통한 N+1 방지'
    ],
    techStack: [
      'Java',
      'Spring Boot',
      'Spring Cloud Gateway',
      'Eureka',
      'OpenFeign',
      'Resilience4j Retry',
      'QueryDSL',
      'Flyway',
      'PostgreSQL',
      'Redis',
      'Docker Compose'
    ],
    troubleshooting: [
      'Retry 정책 분리 — productCommand, deliveryCreate에 개별 Resilience4j Retry 정책 적용',
      '재시도 대상 제한 — 5xx, timeout, 재고 락 타임아웃만 재시도하고 비즈니스 오류는 NonRetryableRemoteException으로 제외',
      '실패 복구 — 최대 3회, 200ms 시작 지수 backoff 후 최종 실패 시 Saga 보상으로 재고 복구',
      '복구 상태 보존 — 주문 생성 실패 단계와 보상 상태가 롤백으로 사라지지 않도록 REQUIRES_NEW로 별도 기록',
      'Saga 재처리 경합 — 동일 Saga의 동시 재처리로 인한 중복 복구를 PESSIMISTIC_WRITE로 방지'
    ],
    implementation: [
      '단일 트랜잭션으로 묶을 수 없는 주문, 재고, 배송 흐름을 Saga 단계와 보상 작업으로 분리',
      'stockOperationId를 주문 아이템 단위로 저장해 생성, 취소, 보상 시 동일한 멱등성 키 재현',
      '보상 실패 상태를 DB에 남기고 재시도 가능한 복구 흐름 구현',
      'QueryDSL로 사용자 역할별 검색 조건을 타입 안전하게 조립하고 fetch join으로 주문 상세 N+1 방지'
    ],
    learnings: [
      '원격 호출 실패는 일시적 장애와 업무 오류를 구분하고, 재시도 가능한 오류에만 제한적으로 Retry를 적용해야 함을 배웠습니다.',
      '데이터베이스 스키마는 자동 DDL에 의존하기보다 버전이 관리되는 Migration과 애플리케이션 시작 시 검증으로 일관성을 보장해야 함을 배웠습니다.',
      '서비스 간 요청에서는 클라이언트가 전달한 사용자 정보를 그대로 신뢰하지 않고, 서버가 검증한 인증 정보를 기준으로 업무 데이터를 구성해야 함을 배웠습니다.'
    ],
    heroImage: '/msa0404/hero.png',
    screenshots: [
      '/msa0404/hero.png',
      '/msa0404/order.png'
    ],
    githubUrl: 'https://github.com/blue-park-programmer/backend',
    documentUrl: '/0404.pdf',
    icon: 'local_shipping',
    iconBg: 'bg-rose-600',
    technologies: [
      { name: 'SAGA', colorClass: 'bg-rose-500/10 text-rose-700' },
      { name: 'IDEMPOTENCY', colorClass: 'bg-amber-500/10 text-amber-700' },
      { name: 'QUERYDSL', colorClass: 'bg-sky-500/10 text-sky-700' },
      { name: 'PESSIMISTIC LOCK', colorClass: 'bg-orange-500/10 text-orange-700' }
    ]
  },
  {
    id: 'order8282',
    title: '8282 주문 서비스 플랫폼',
    description: 'JWT 토큰 무효화와 재발급 동시성을 제어한 주문 서비스',
    simpleDescription:
      '내일배움캠프에서 진행한 주문 서비스 플랫폼입니다. 공통 모듈 세팅과 User/Auth/Admin API를 담당했습니다.',
    fullDescription:
      'User/Auth/Admin API를 담당하며 Access Token과 Refresh Token을 분리하고, JWT 인증에 DB tokenVersion 검증을 결합했습니다. 로그아웃, 비밀번호 변경, 회원 탈퇴 시 기존 Access Token을 만료 전에도 무효화하기 위해 요청 시 DB의 사용자 상태와 tokenVersion을 함께 확인하는 구조로 설계했습니다.',
    responsibilities: [
      'User, Auth, Admin API 설계 및 구현',
      'Access Token과 Refresh Token 분리 및 Refresh Token Rotation 적용',
      'DB tokenVersion 검증으로 로그아웃, 비밀번호 변경, 회원 탈퇴 시 기존 Access Token 즉시 무효화',
      'Refresh Token 재발급 시 PESSIMISTIC_WRITE와 @Transactional로 읽기, 검증, 갱신 원자화',
      'Spring Security 필터 체인에 JwtAuthFilter와 AuthEntryPoint 연결'
    ],
    techStack: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'JPA',
      'PostgreSQL',
      'GitHub Actions',
      'AWS EC2',
      'Docker'
    ],
    troubleshooting: [
      'JWT만으로는 로그아웃이나 비밀번호 변경 직후 이미 발급된 Access Token을 즉시 무효화하기 어렵다는 문제 확인',
      '요청 시 DB의 사용자 상태와 tokenVersion을 검증해 탈퇴 사용자, 권한 변경, 무효화된 토큰을 차단',
      '동일 Refresh Token으로 재발급 요청이 동시에 들어올 때 중복 발급될 수 있는 경합을 PESSIMISTIC_WRITE로 제어',
      'CountDownLatch와 5개 스레드로 동일 Refresh Token 동시 재발급을 재현해 1건만 성공하고 4건은 INVALID_REFRESH_TOKEN으로 실패하는 것을 검증'
    ],
    implementation: [
      '회원가입, 로그인, 로그아웃, 토큰 재발급, 회원/관리자 조회 API 구현',
      'Refresh Token Rotation으로 재발급 성공 시 Refresh Token을 교체하고 이전 토큰 재사용 차단',
      'JwtAuthFilter에서 DB 사용자 상태와 tokenVersion을 검증한 뒤 SecurityContext 구성',
      'AuthEntryPoint로 인증 실패 응답 흐름 분리'
    ],
    learnings: [
      '로그아웃이나 비밀번호 변경처럼 인증 상태가 바뀌는 경우, 토큰의 Claim만 신뢰하지 않고 서버의 최신 상태를 함께 검증해야 함을 배웠습니다.',
      '동일 사용자의 인증 정보를 동시에 갱신할 수 있는 작업에서는 공유 상태의 충돌 가능성을 고려해 Transaction과 Lock의 범위를 설계해야 함을 배웠습니다.',
      '최고 권한은 허용 조건을 늘리는 것보다 권한을 부여할 수 있는 API와 접근 경로 자체를 제한하는 것이 중요함을 배웠습니다.'
    ],
    heroImage: '/order8282/hero.png',
    screenshots: [
      '/order8282/hero.png',
      '/order8282/jwt.png',
    ],
    githubUrl: 'https://github.com/blue-park-programmer/sparta-challenge-8282',
    documentUrl: '/8282.pdf',
    icon: 'receipt_long',
    iconBg: 'bg-indigo-600',
    technologies: [
      { name: 'SPRING SECURITY', colorClass: 'bg-indigo-500/10 text-indigo-700' },
      { name: 'JWT / RTR', colorClass: 'bg-blue-500/10 text-blue-700' },
      { name: 'TOKEN VERSION', colorClass: 'bg-purple-500/10 text-purple-700' },
      { name: 'PESSIMISTIC LOCK', colorClass: 'bg-orange-500/10 text-orange-700' }
    ]
  }
];

export const SKILLS: Skill[] = [
  { id: '1', title: 'Java / Spring Boot', icon: 'deployed_code' },
  { id: '2', title: 'JPA / PostgreSQL', icon: 'database' },
  { id: '3', title: 'Redis / Caching', icon: 'sync_lock' },
  { id: '4', title: 'Kafka / WebSocket', icon: 'stream' },
  { id: '5', title: 'Spring Cloud / MSA', icon: 'hub' },
  { id: '6', title: 'Docker / AWS', icon: 'cloud' }
];

export const OTHER_PROJECTS: OtherProject[] = [];

export const AI_SYSTEM_INSTRUCTION = `202609BackendPortfolio`;
