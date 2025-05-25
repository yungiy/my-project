# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


```bash

src/
├── app/                         # 글로벌 환경 설정
│   ├── routes/                  # Vue Router 정의
│   ├── store/                   # 전역 Pinia store (ex. auth 상태)
│   ├── styles/                  # Tailwind config, 전역 CSS
│   └── assets/                  # 이미지, 아이콘 등 정적 리소스
│
├── shared/                      # 전 도메인에서 공통 사용하는 자원
│   ├── ui/                      # Button, Modal 등 UI
│   ├── lib/                     # 공용 유틸 함수
│   ├── api/                     # Axios 인스턴스 및 인터셉터
│   ├── constants/               # 전역 상수
│   ├── types/                   # 공통 타입 (Category 등)
│   └── validators/              # 입력값 검증 로직
│
├── domains/
│   ├── user/                    # "사용자" 도메인
│   │   ├── model/              # User 타입, 상태 모델
│   │   ├── api/                # /users 관련 API 함수
│   │   ├── ui/                 # UserAvatar, UserCard 등
│   │   ├── features/          # signup, login 등 사용자 행동
│   │   ├── pages/             # 로그인, 회원가입 페이지
│   │   └── store/             # userStore (Pinia)
│
│   ├── post/                    # "게시글" 도메인
│   │   ├── model/              # Post 타입 정의
│   │   ├── api/                # /posts 관련 API
│   │   ├── ui/                 # PostCard, PostEditor 등
│   │   ├── features/          # create/edit/delete 등 게시글 행동
│   │   ├── pages/             # 목록, 작성, 상세, 수정
│   │   └── store/             # postStore (Pinia)
│
│   └── comment/                # "댓글" 도메인
│       ├── model/             # Comment 타입 정의
│       ├── api/               # /comments 관련 API
│       ├── ui/                # CommentItem, CommentInput 등
│       ├── features/         # create/edit/delete
│       ├── store/            # commentStore
│       └── parts/            # 댓글 리스트 조합 뷰
```