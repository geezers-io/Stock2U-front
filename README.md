# Stock2U-Front

## Git branching model

<aside>
📌 **Base 브랜치(upstream)의 종류**

- `main` - 릴리즈
- `develop` - 개발

**Local 브랜치의 종류**

- `feature/{ticket|name}` - 계획된 피쳐 개발(T1)
- `fix/{ticket|name}` - 계획된 패치 적용(T2)
- `hotfix/{ticket|name}` - 계획되지 않은 긴급 수정(T3)
</aside>

## Commit guide

- `feat:` - 새로운 기능에 대한 커밋
- `fix:` - 버그 수정에 대한 커밋
- `build:` - 빌드 관련 파일 수정에 대한 커밋
- `chore:` - 그 외 자잘한 수정에 대한 커밋
- `docs:` - 문서 수정에 대한 커밋
- `style:` - 코드 스타일 혹은 포맷 등에 관한 커밋
- `refactor:` - 코드 리팩토링에 대한 커밋
- `test:` - 테스트 코드 수정에 대한 커밋

## Code review guide

필요한 경우 아래의 말머리를 사용해 주세요.

- [질문] - 단순 질문. 해결되지 않아도 머지 가능
- [의견] - 단순 간단 의견. 해결되지 않아도 머지 가능
- [변경요청] - 동작하지 않는 부분이나 잘못된 부분이 있을 때(반드시 수정 필요)
