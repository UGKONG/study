// 계산결과
let result = 235325;
let unit: null | "곱셈" | "뺄셈" | "덧셈" | "나눗셈" | "퍼센트" = null;

// 요소
const el = {
  결과: document.querySelector("#result > span") as HTMLSpanElement,
  곱셈: document.querySelector("#곱셈") as HTMLDivElement,
  뺄셈: document.querySelector("#뺄셈") as HTMLDivElement,
  덧셈: document.querySelector("#덧셈") as HTMLDivElement,
  계산: document.querySelector("#계산") as HTMLDivElement,
  나눗셈: document.querySelector("#나눗셈") as HTMLDivElement,
  지우기: document.querySelector("#지우기") as HTMLDivElement,
  초기화: document.querySelector("#초기화") as HTMLDivElement,
  퍼센트: document.querySelector("#퍼센트") as HTMLDivElement,
};

// 랜더링
const render = () => {
  el.결과.innerText = String(result);
};

// 지우기 함수
const oneDelete = () => {
  result = Number(String(result)?.slice(0, -1));
  render();
};
const allDelete = () => {
  result = 0;
  render();
};

// 연산 함수
const percent = () => {
  result = result / 100;
  render();
};
const division = () => {};

// 이벤트 바인딩
el?.지우기?.addEventListener("click", oneDelete);
el?.초기화?.addEventListener("click", allDelete);
el?.퍼센트?.addEventListener("click", percent);

// 호출
render();
