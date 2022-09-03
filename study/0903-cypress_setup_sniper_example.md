### init - dependency check!

```json
"devDependencies": {
    "@types/node": "^18.7.14",
    "cypress": "^10.7.0",
    "http-server": "^14.1.1",
    "ts-loader": "^9.3.1",
    "tsc-watch": "^5.0.3",
    "typescript": "^4.8.2"
  }
```

### redis 서버 설치 (MAC OS)

`brew install redis`

`redis-cli`

`redis-server`

다음과 같은 화면이 뜬다

![image](https://user-images.githubusercontent.com/80435616/188276016-274c92a3-7c50-4422-bfc8-2c73a19aeee7.png)

![image](https://user-images.githubusercontent.com/80435616/188276042-ee5f03f5-e42d-4d5f-a615-2fdfe55b173f.png)
![image](https://user-images.githubusercontent.com/80435616/188276052-e00e1bb9-9be1-4493-add2-8860081d829a.png)


다른 터미널에서 redis-cli를 쳐서 띄우고 publish foo “hi minsu”를 쳐 보면, 위 화면에 전달됨을 확인할 수 있다.

### cypress setting

---

cypress real world app → 가장 공신력 있는 참고사이트

[https://github.com/cypress-io/cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app)

`npx cypress open`

뿅

![image](https://user-images.githubusercontent.com/80435616/188276072-50ae4595-2758-4287-a85e-1cc9d9bd925a.png)

E2E Testing → electron 추천

### Tsconfig 설정

`npx tsc —init`

```json
...
  "compilerOptions": {
    "target": "ES2019"
    "lib": [
      "ES2019",
      "DOM"
    ]
    "module": "ES2015"
    "moduleResolution": "node"
...
```

target, lib, module, moduleResolution을 바꿔주자

cypress 폴더 안에 있는 tsconfig도 생성해주자!

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "types": ["node", "cypress"]
  }
}
```

npx cypress open → sniper.cy.ts를 해서 다음과 같이 나온다면 성공~

![image](https://user-images.githubusercontent.com/80435616/188276079-d3d4bcff-36e5-4649-8536-246bc0e8809c.png)

89페이지~ 내용들 한번 체크

---

### sniper 예제 구현 (메모 위주)

101페이지 경매 참여와 낙찰 실패!

**경매 스나이퍼**

1. 경매 시작합니당~ (102페이지)
2. 경매 스나이퍼(클라이언트)가 해당 경매에 조인
3. 경매 입장에서 실제로 한명이 조인됐는지 물어봄
4. 경매 클로즈 선언
5. 경매 스나이퍼(클라이언트)는 결과로써 경매가 실패했다

보통 코드를 짜면

![image](https://user-images.githubusercontent.com/80435616/188276086-ec858c2e-05d4-422a-859c-7f713db773ac.png)

빨간거부터 짜는데 그러지 말고 기본부터 하세요!! 의 예제다.

- **test double (잘 모르는 용어들)**

Fake, Dummy, Mockup, Spy…

- redis 클라이언트는 구독을 할 수 있는데 이게 방 이름이다.

---

### 마무리

- 개인적으로 인상깊었던 부분

/app/index.html에서

`import Main from '/js/main.js';`

여기를 쓸 때 js 폴더 안에 main.js가 없어서 어떻게 해야하나 상당히 당황했다. 하지만 자동으로 해결되는 것이였음을…

- 기타 잡담

로컬호스트 3000이 맥북에서 에러가 날 수 있으니 다른 포트로 열어보라는 말도 깜짝 놀랐다.

살짝 코드가 타입스크립트 느낌이 아니라 좀 낯설었다. 리액트를 쓰는데 함수형 프로그래밍 함수형 프로그래밍 하다보니 클래스를 건드릴 일도 거의 없었다.

cypress로 테스트코드를 돌려보려는 고민을 했었는데 생각보다 난이도가 있어서 놀랐다..ㅠㅠ… 프론트엔드의 새로운 경지를 본 느낌…
