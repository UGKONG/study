var 테이블 = [
    { 이름: "성인", 금액: 12000, 인원: 0 },
    { 이름: "군인", 금액: 5000, 인원: 0 },
    { 이름: "대학생", 금액: 10000, 인원: 0 },
    { 이름: "유아", 금액: 7000, 인원: 0 },
    { 이름: "36개월미만", 금액: 0, 인원: 0 },
];
var 넘버포맷 = function (number) {
    var _a, _b, _c;
    var arr = (_b = (_a = ("" + number)) === null || _a === void 0 ? void 0 : _a.split("")) === null || _b === void 0 ? void 0 : _b.reverse();
    if ((arr === null || arr === void 0 ? void 0 : arr.length) <= 3)
        return "" + number;
    var result = [];
    arr === null || arr === void 0 ? void 0 : arr.forEach(function (x, i) {
        if (!(i % 3))
            result.push(",");
        result.push(x);
    });
    result = (_c = result === null || result === void 0 ? void 0 : result.slice(1)) === null || _c === void 0 ? void 0 : _c.reverse();
    return result === null || result === void 0 ? void 0 : result.join("");
};
var 요소 = {
    리스트해더: document.querySelector("thead > tr"),
    리스트: document.querySelector("tbody"),
    토탈: document.querySelector("#total"),
};
var 시작 = function () {
    var 키 = Object.keys(테이블[0]);
    키 === null || 키 === void 0 ? void 0 : 키.forEach(function (x) {
        var 아이템 = document.createElement("th");
        아이템.innerHTML = "<th>".concat(x, "</th>");
        요소.리스트해더.appendChild(아이템);
    });
    랜더();
};
var 클릭 = function (이름, 카운트) {
    테이블 = 테이블 === null || 테이블 === void 0 ? void 0 : 테이블.map(function (x) {
        if (x.이름 === 이름)
            x.인원 += 카운트;
        if (x.인원 < 0)
            x.인원 = 0;
        return x;
    });
    랜더();
};
var 랜더 = function () {
    요소.리스트.innerHTML = "";
    테이블 === null || 테이블 === void 0 ? void 0 : 테이블.forEach(function (x) {
        var 아이템 = document.createElement("tr");
        아이템.innerHTML = "\n      <td>".concat(x.이름, "</td>\n      <td>").concat(넘버포맷(x.금액), "\uC6D0</td>\n      <td>\n        <button onclick=\"\uD074\uB9AD('").concat(x.이름, "', -1)\">-1</button>\n        <span>").concat(x.인원, "</span>\n        <button onclick=\"\uD074\uB9AD('").concat(x.이름, "', +1)\">+1</button>\n      </td>\n    ");
        요소.리스트.appendChild(아이템);
    });
    var 계산 = 테이블 === null || 테이블 === void 0 ? void 0 : 테이블.reduce(function (a, b) { return a + b.금액 * b.인원; }, 0);
    요소.토탈.innerHTML = 넘버포맷(계산);
};
시작();
