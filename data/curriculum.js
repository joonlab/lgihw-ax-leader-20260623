export const CURRICULUM = [
  {
    id: 'ch00', num: '00', titleKo: '오늘의 여정', titleEn: 'Overview',
    timeStart: '14:00', timeEnd: '14:15', icon: '<i data-lucide="calendar" style="width:18px;height:18px;vertical-align:-3px;"></i>',
    desc: '오늘의 흐름과 시간표, 세미나 컨셉(쉬운 자동화로 친해지고 → 내 업무로 발전), 강사 소개를 확인합니다.',
    clips: [
      { id: 'clip01', title: '오늘의 흐름 & 시간표', type: 'overview', time: '~10분' },
      { id: 'clip02', title: '세미나 소개 & 강사', type: 'reference', time: '' }
    ]
  },
  {
    id: 'ch01', num: '01', titleKo: 'Antigravity 2.0', titleEn: 'Setup',
    timeStart: '', timeEnd: '', icon: '<i data-lucide="rocket" style="width:18px;height:18px;vertical-align:-3px;"></i>',
    desc: 'Antigravity 2.0이 무엇인지, 설치부터 인터페이스·기본 사용법·안전 세팅까지. 영상 캡처와 함께 혼자서도 따라올 수 있는 참고 자료입니다.',
    clips: [
      { id: 'clip01', title: 'Antigravity 2.0이란 — 에이전트와 일하는 도구', type: 'concept', time: '~10분' },
      { id: 'clip02', title: '설치 가이드 (Windows · macOS)', type: 'reference', time: '~10분' },
      { id: 'clip03', title: '인터페이스 & 기본 사용법 — 화면 구조·모델·Slash 커맨드', type: 'reference', time: '~15분' },
      { id: 'clip04', title: '안전 세팅 — 승인 정책 & Global Rules', type: 'reference', time: '~10분' }
    ]
  },
  {
    id: 'ch02', num: '02', titleKo: '공통 실습 4종', titleEn: 'Hands-on',
    timeStart: '14:15', timeEnd: '15:45', icon: '<i data-lucide="wrench" style="width:18px;height:18px;vertical-align:-3px;"></i>',
    desc: '다 함께 따라하는 4개 실습 — 파일 정리, 엑셀/보고서, 자료조사 HTML(병렬), AI 기능 웹앱. 가상회사 "한울식품(주)" 자료로 진행합니다.',
    clips: [
      { id: 'clip01', title: '실습 ① 파일 정리·자동 분류 (워밍업)', type: 'practice', time: '~15분' },
      { id: 'clip02', title: '실습 ② 자료 → 엑셀·보고서', type: 'practice', time: '~25분' },
      { id: 'clip03', title: '실습 ③ 자료조사 → HTML 보고서 (병렬)', type: 'practice', time: '~10분+' },
      { id: 'clip04', title: '실습 ④ 바이브코딩 — AI 기능 웹앱 (무료 Gemini API)', type: 'practice', time: '~30분' }
    ]
  },
  {
    id: 'ch03', num: '03', titleKo: '자율 심화', titleEn: 'Skill · Harness',
    timeStart: '15:45', timeEnd: '16:20', icon: '<i data-lucide="bot" style="width:18px;height:18px;vertical-align:-3px;"></i>',
    desc: '반복할 작업을 스킬(skill)로, 도구를 묶어 시스템으로 돌아가게 하는 하네스 개념까지. 본인 실제 업무에 적용해 봅니다.',
    clips: [
      { id: 'clip01', title: '스킬(Skill) 제작 — 한 번 만들면 다음엔 재사용', type: 'practice', time: '~25분' },
      { id: 'clip02', title: '하네스 & MCP 개념 (강사 시연)', type: 'concept', time: '~10분' }
    ]
  },
  {
    id: 'ch04', num: '04', titleKo: '실습자료 & 참고', titleEn: 'Reference',
    timeStart: '', timeEnd: '', icon: '<i data-lucide="library" style="width:18px;height:18px;vertical-align:-3px;"></i>',
    desc: '실습에 쓰는 모든 자료(더미데이터·샘플 보고서·완성 웹앱·복붙 프롬프트)와 참고 링크·자율학습 가이드 모음입니다.',
    clips: [
      { id: 'clip01', title: '실습자료 다운로드 센터', type: 'reference', time: '' },
      { id: 'clip02', title: '참고 링크 & 자율학습 가이드', type: 'reference', time: '' }
    ]
  }
];
