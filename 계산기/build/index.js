var _a, _b, _c;
// 계산결과
var result = 235325;
var unit = null;
// 요소
var el = {
    결과: document.querySelector("#result > span"),
    곱셈: document.querySelector("#곱셈"),
    뺄셈: document.querySelector("#뺄셈"),
    덧셈: document.querySelector("#덧셈"),
    계산: document.querySelector("#계산"),
    나눗셈: document.querySelector("#나눗셈"),
    지우기: document.querySelector("#지우기"),
    초기화: document.querySelector("#초기화"),
    퍼센트: document.querySelector("#퍼센트"),
};
// 랜더링
var render = function () {
    el.결과.innerText = String(result);
};
// 지우기 함수
var oneDelete = function () {
    var _a;
    result = Number((_a = String(result)) === null || _a === void 0 ? void 0 : _a.slice(0, -1));
    render();
};
var allDelete = function () {
    result = 0;
    render();
};
// 연산 함수
var percent = function () {
    result = result / 100;
    render();
};
var division = function () { };
// 이벤트 바인딩
(_a = el === null || el === void 0 ? void 0 : el.지우기) === null || _a === void 0 ? void 0 : _a.addEventListener("click", oneDelete);
(_b = el === null || el === void 0 ? void 0 : el.초기화) === null || _b === void 0 ? void 0 : _b.addEventListener("click", allDelete);
(_c = el === null || el === void 0 ? void 0 : el.퍼센트) === null || _c === void 0 ? void 0 : _c.addEventListener("click", percent);
// 호출
render();
