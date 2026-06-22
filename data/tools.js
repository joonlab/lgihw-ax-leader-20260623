export const TOOLS_MCP = [
  { name:'Playwright MCP', description:'Microsoft 공식 브라우저 자동화 MCP 서버', useCase:'웹 기반 업무 자동화, QA 테스트', url:'https://github.com/microsoft/playwright-mcp', category:'browser' },
  { name:'GitHub MCP Server', description:'GitHub 공식 MCP — 리포지토리 관리, PR 리뷰, 이슈 트래킹', useCase:'코드 리뷰 자동화, 개발팀 생산성 분석', url:'https://github.com/github/github-mcp-server', category:'code' },
  { name:'Notion MCP Server', description:'Notion 공식 MCP — 워크스페이스 문서 검색·생성·편집', useCase:'회의록 자동 정리, 사내 지식베이스 AI 검색', url:'https://github.com/makenotion/notion-mcp-server', category:'api' },
  { name:'Slack MCP Server', description:'Slack 공식 MCP 플러그인 — 채널 관리·메시징을 AI가 수행', useCase:'팀 커뮤니케이션 자동화, 대화 요약', url:'https://github.com/slackapi/slack-mcp-plugin', category:'api' },
  { name:'Filesystem MCP', description:'로컬 파일 시스템 안전 접근 — 읽기/쓰기/검색', useCase:'문서 파일 일괄 처리, 보고서 자동 생성', url:'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem', category:'file' },
  { name:'Brave Search MCP', description:'Brave 공식 웹 검색 MCP — 프라이버시 중심', useCase:'실시간 시장 동향 조사, 뉴스 모니터링', url:'https://github.com/brave/brave-search-mcp-server', category:'search' },
  { name:'Zapier MCP', description:'6,000+ 앱과 연동되는 워크플로우 자동화', useCase:'크로스 플랫폼 업무 자동화, 반복 작업 제거', url:'https://github.com/zapier/zapier-mcp', category:'api' },
  { name:'Firecrawl MCP', description:'웹페이지를 AI가 읽을 수 있는 마크다운으로 변환', useCase:'웹 데이터 수집, 경쟁사 모니터링, 리서치', url:'https://github.com/mendableai/firecrawl-mcp-server', category:'web-scraping' },
  { name:'MCP Spec (공식)', description:'Model Context Protocol 공식 스펙 — AI 도구 연결의 표준', useCase:'MCP 서버 개발, 커스텀 도구 구축', url:'https://github.com/modelcontextprotocol/specification', category:'reference' }
];

export const TOOLS_CLI = [
  { name:'Google Antigravity ⭐', description:'오늘의 메인 실습 도구 — Google의 에이전트 우선(agent-first) 개발 플랫폼. IDE·CLI·SDK를 모두 제공하며, Projects·Conversations 체계로 여러 로컬 에이전트를 병렬로 운영합니다.', useCase:'자율 파일 작업, 웹 크롤링·정리, 보고서 생성, 로컬 자동화', url:'https://antigravity.google/', category:'coding' },
  { name:'Claude Code', description:'Anthropic의 터미널 AI 코딩 에이전트 — 전체 코드베이스 자율 작업. 오늘 도입부 시연 사례(옴니버스 3종)로 소개합니다.', useCase:'대규모 코드 리팩토링, 멀티파일 구현, 로컬 파일 자동화', url:'https://docs.anthropic.com/en/docs/claude-code', category:'coding' },
  { name:'Gemini CLI', description:'Google의 오픈소스 터미널 AI — 100만 토큰, 무료 티어', useCase:'대용량 분석, 멀티모달 입력, Google 검색 연동', url:'https://github.com/google-gemini/gemini-cli', category:'coding' },
  { name:'OpenAI Codex CLI', description:'OpenAI의 경량 터미널 AI — 3단계 안전 모드', useCase:'빠른 코드 생성, 이미지 기반 UI 구현', url:'https://github.com/openai/codex', category:'coding' },
  { name:'Cursor', description:'AI 통합 IDE — VS Code 기반, 코드 자동완성·에이전트 모드', useCase:'빠른 프로토타이핑, 시각적 코드 리뷰', url:'https://www.cursor.com', category:'coding' },
  { name:'Aider', description:'Git 친화적 AI 페어 프로그래밍 — 자동 커밋 + 멀티파일 편집', useCase:'레거시 코드 리팩토링, 테스트 자동 생성', url:'https://github.com/Aider-AI/aider', category:'coding' },
  { name:'Fabric', description:'AI 프롬프트 프레임워크 — 100+ 크라우드소싱 패턴', useCase:'영상 요약, 글쓰기 개선, 아이디어 추출', url:'https://github.com/danielmiessler/fabric', category:'automation' },
  { name:'Warp', description:'AI 기반 차세대 터미널 — GPU 가속, AI 명령 어시스턴트', useCase:'터미널 명령어 추천, 에러 자동 진단', url:'https://www.warp.dev', category:'automation' },
  { name:'Perplexity', description:'AI 기반 검색 — 실시간 소스 인용, Deep Research', useCase:'시장 조사, 경쟁사 분석, 팩트체크', url:'https://www.perplexity.ai', category:'research' },
  { name:'OpenCode', description:'오픈소스 AI 코딩 CLI — 모든 모델 제공자 지원', useCase:'벤더 종속 없는 유연한 AI 코딩 환경', url:'https://github.com/opencode-ai/opencode', category:'coding' },
  { name:'ChatGPT', description:'OpenAI의 범용 AI — 텍스트·이미지·코드·데이터 통합', useCase:'비즈니스 문서, 데이터 분석, 브레인스토밍', url:'https://chatgpt.com', category:'content' },
  { name:'Deep Agent Builder', description:'웹 기반 멀티에이전트 빌더 — 1차수(4/27)에서 사용한 에이전틱 도구. 2차수는 로컬 자율성이 강한 Antigravity를 메인으로 사용합니다. (참고용)', useCase:'노코드 멀티에이전트, 웹 기반 자동화', url:'https://www.tridge.com', category:'reference' }
];
