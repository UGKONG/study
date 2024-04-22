var _a, _b, _c, _d, _e, _f;
// 계산결과
var prev = 0;
var result = 0;
var operator = null;
var calcHistory = [];
var OPERATOR = {
    곱셈: "*",
    나눗셈: "/",
    덧셈: "+",
    뺄셈: "-",
};
// 요소
var el = {
    결과: document.querySelector("#result > span"),
    숫자: document.querySelectorAll(".num"),
    연산자: document.querySelectorAll("#곱셈,#뺄셈,#덧셈,#나눗셈"),
    계산: document.querySelector("#계산"),
    지우기: document.querySelector("#지우기"),
    초기화: document.querySelector("#초기화"),
    퍼센트: document.querySelector("#퍼센트"),
    히스토리: document.querySelector("#히스토리"),
};
// 현재 DATETIME 조회
var getCurrentTimeStamp = function () {
    var date = new Date();
    var Y = String(date === null || date === void 0 ? void 0 : date.getFullYear());
    var M = (date === null || date === void 0 ? void 0 : date.getMonth()) + 1;
    var D = date === null || date === void 0 ? void 0 : date.getDate();
    var h = date === null || date === void 0 ? void 0 : date.getHours();
    var m = date === null || date === void 0 ? void 0 : date.getMinutes();
    var s = date === null || date === void 0 ? void 0 : date.getSeconds();
    M = String(M < 10 ? "0" + M : M);
    D = String(D < 10 ? "0" + D : D);
    h = String(h < 10 ? "0" + h : h);
    m = String(m < 10 ? "0" + m : m);
    s = String(s < 10 ? "0" + s : s);
    var result = "".concat(Y, "-").concat(M, "-").concat(D, " ").concat(h, ":").concat(m, ":").concat(s);
    return result;
};
// 히스토리 랜더링
var historyRender = function () {
    el.히스토리.innerHTML = "";
    if (!(calcHistory === null || calcHistory === void 0 ? void 0 : calcHistory.length)) {
        return (el.히스토리.innerHTML = "<li>히스토리가 없습니다.</li>");
    }
    calcHistory === null || calcHistory === void 0 ? void 0 : calcHistory.forEach(function (item) {
        var _a;
        var li = document.createElement("li");
        li.innerHTML = "\n      <small>[".concat(item === null || item === void 0 ? void 0 : item.date, "]</small>\n      <p><b>").concat(item === null || item === void 0 ? void 0 : item.calcString, " = ").concat(item === null || item === void 0 ? void 0 : item.calcResult, "</b></p>\n    ");
        (_a = el === null || el === void 0 ? void 0 : el.히스토리) === null || _a === void 0 ? void 0 : _a.appendChild(li);
    });
};
// 히스토리 추가
var addHistory = function (data) {
    calcHistory.push(data);
    if (calcHistory.length > 10)
        calcHistory.shift();
    historyRender();
};
// 랜더링
var render = function () {
    var _a, _b;
    // 결과 반영
    el.결과.innerText = String(result);
    // 스타일
    (_a = el === null || el === void 0 ? void 0 : el.연산자) === null || _a === void 0 ? void 0 : _a.forEach(function (x) { var _a; return (_a = x === null || x === void 0 ? void 0 : x.classList) === null || _a === void 0 ? void 0 : _a.remove("active"); });
    if (operator) {
        var operatorEl = document.querySelector("#" + operator);
        (_b = operatorEl === null || operatorEl === void 0 ? void 0 : operatorEl.classList) === null || _b === void 0 ? void 0 : _b.add("active");
    }
};
// 하나 지우기
var oneDelete = function () {
    var _a;
    result = Number((_a = String(result)) === null || _a === void 0 ? void 0 : _a.slice(0, -1));
    render();
};
// 전체 지우기
var allDelete = function () {
    prev = 0;
    result = 0;
    operator = null;
    render();
};
// 퍼센트
var percent = function () {
    result /= 100;
    render();
};
// 계산
var calculation = function (isNotRender) {
    if (isNotRender === void 0) { isNotRender = false; }
    if (!operator)
        return;
    var calcString = "".concat(prev, " ").concat(OPERATOR[operator], " ").concat(result);
    var calc = window === null || window === void 0 ? void 0 : window.eval(calcString);
    addHistory({ calcString: calcString, calcResult: calc, date: getCurrentTimeStamp() });
    result = calc;
    operator = null;
    prev = 0;
    if (isNotRender)
        return;
    render();
};
// 연산자 누르기
var operatorClick = function (e) {
    var _a;
    var id = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.id;
    if (operator)
        calculation(true);
    prev = result;
    operator = id;
    result = 0;
    render();
};
// 숫자 누르기
var numberClick = function (e) {
    var id = (e === null || e === void 0 ? void 0 : e.target).id;
    result = Number(String(result) + id);
    render();
};
// 이벤트 바인딩
(_a = el === null || el === void 0 ? void 0 : el.지우기) === null || _a === void 0 ? void 0 : _a.addEventListener("click", oneDelete);
(_b = el === null || el === void 0 ? void 0 : el.초기화) === null || _b === void 0 ? void 0 : _b.addEventListener("click", allDelete);
(_c = el === null || el === void 0 ? void 0 : el.퍼센트) === null || _c === void 0 ? void 0 : _c.addEventListener("click", percent);
(_d = el === null || el === void 0 ? void 0 : el.계산) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () { return calculation(); });
(_e = el === null || el === void 0 ? void 0 : el.숫자) === null || _e === void 0 ? void 0 : _e.forEach(function (x) { return x === null || x === void 0 ? void 0 : x.addEventListener("click", numberClick); });
(_f = el === null || el === void 0 ? void 0 : el.연산자) === null || _f === void 0 ? void 0 : _f.forEach(function (x) { return x === null || x === void 0 ? void 0 : x.addEventListener("click", operatorClick); });
// 호출
render();
historyRender();
