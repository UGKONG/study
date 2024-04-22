// 타입 정의
type Operator = "곱셈" | "나눗셈" | "덧셈" | "뺄셈";
type CalcHistory = { calcString: string; calcResult: number; date: string };

// 계산결과
let prev = 0;
let result = 0;
let operator: null | Operator = null;
let calcHistory: CalcHistory[] = [];

const OPERATOR = {
  곱셈: "*",
  나눗셈: "/",
  덧셈: "+",
  뺄셈: "-",
} as const;

// 요소
const el = {
  결과: document.querySelector("#result > span") as HTMLSpanElement,
  숫자: document.querySelectorAll(".num") as NodeListOf<HTMLDivElement>,
  연산자: document.querySelectorAll(
    "#곱셈,#뺄셈,#덧셈,#나눗셈"
  ) as NodeListOf<HTMLDivElement>,
  계산: document.querySelector("#계산") as HTMLDivElement,
  지우기: document.querySelector("#지우기") as HTMLDivElement,
  초기화: document.querySelector("#초기화") as HTMLDivElement,
  퍼센트: document.querySelector("#퍼센트") as HTMLDivElement,
  히스토리: document.querySelector("#히스토리") as HTMLUListElement,
};

// 현재 DATETIME 조회
const getCurrentTimeStamp = () => {
  let date = new Date();
  let Y: string | number = String(date?.getFullYear());
  let M: string | number = date?.getMonth() + 1;
  let D: string | number = date?.getDate();
  let h: string | number = date?.getHours();
  let m: string | number = date?.getMinutes();
  let s: string | number = date?.getSeconds();
  M = String(M < 10 ? "0" + M : M);
  D = String(D < 10 ? "0" + D : D);
  h = String(h < 10 ? "0" + h : h);
  m = String(m < 10 ? "0" + m : m);
  s = String(s < 10 ? "0" + s : s);
  let result = `${Y}-${M}-${D} ${h}:${m}:${s}`;
  return result;
};

// 히스토리 랜더링
const historyRender = () => {
  el.히스토리.innerHTML = "";

  if (!calcHistory?.length) {
    return (el.히스토리.innerHTML = "<li>히스토리가 없습니다.</li>");
  }

  calcHistory?.forEach((item) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <small>[${item?.date}]</small>
      <p><b>${item?.calcString} = ${item?.calcResult}</b></p>
    `;
    el?.히스토리?.appendChild(li);
  });
};

// 히스토리 추가
const addHistory = (data: CalcHistory) => {
  calcHistory.push(data);
  if (calcHistory.length > 10) calcHistory.shift();
  historyRender();
};

// 랜더링
const render = () => {
  // 결과 반영
  el.결과.innerText = String(result);

  // 스타일
  el?.연산자?.forEach((x) => x?.classList?.remove("active"));
  if (operator) {
    let operatorEl = document.querySelector("#" + operator) as HTMLDivElement;
    operatorEl?.classList?.add("active");
  }
};
// 하나 지우기
const oneDelete = () => {
  result = Number(String(result)?.slice(0, -1));
  render();
};
// 전체 지우기
const allDelete = () => {
  prev = 0;
  result = 0;
  operator = null;
  render();
};
// 퍼센트
const percent = () => {
  result /= 100;
  render();
};
// 계산
const calculation = (isNotRender: boolean = false) => {
  if (!operator) return;
  let calcString = `${prev} ${OPERATOR[operator]} ${result}`;
  let calc = window?.eval(calcString);

  addHistory({ calcString, calcResult: calc, date: getCurrentTimeStamp() });

  result = calc;
  operator = null;
  prev = 0;

  if (isNotRender) return;
  render();
};
// 연산자 누르기
const operatorClick = (e: MouseEvent) => {
  const id = (e?.target as HTMLDivElement)?.id as Operator;

  if (operator) calculation(true);

  prev = result;
  operator = id;
  result = 0;
  render();
};
// 숫자 누르기
const numberClick = (e: MouseEvent) => {
  const { id } = e?.target as HTMLDivElement;
  result = Number(String(result) + id);
  render();
};

// 이벤트 바인딩
el?.지우기?.addEventListener("click", oneDelete);
el?.초기화?.addEventListener("click", allDelete);
el?.퍼센트?.addEventListener("click", percent);
el?.계산?.addEventListener("click", () => calculation());
el?.숫자?.forEach((x) => x?.addEventListener("click", numberClick));
el?.연산자?.forEach((x) => x?.addEventListener("click", operatorClick));

// 호출
render();
historyRender();
