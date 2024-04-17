let 테이블 = [
  { 이름: "성인", 금액: 12000, 인원: 0 },
  { 이름: "대학생", 금액: 10000, 인원: 0 },
  { 이름: "유아", 금액: 7000, 인원: 0 },
  { 이름: "36개월미만", 금액: 0, 인원: 0 },
];

const 넘버포맷 = (number: number) => {
  let arr = ("" + number)?.split("")?.reverse();
  if (arr?.length <= 3) return "" + number;

  let result: string[] = [];

  arr?.forEach((x, i) => {
    if (!(i % 3)) result.push(",");
    result.push(x);
  });
  result = result?.slice(1)?.reverse();
  return result?.join("");
};

const 요소 = {
  리스트해더: document.querySelector("thead > tr") as HTMLTableColElement,
  리스트: document.querySelector("tbody") as HTMLTableSectionElement,
  토탈: document.querySelector("#total") as HTMLParagraphElement,
};

const 시작 = () => {
  let 키 = Object.keys(테이블[0]);

  키?.forEach((x) => {
    let 아이템 = document.createElement("th");
    아이템.innerHTML = `<th>${x}</th>`;
    요소.리스트해더.appendChild(아이템);
  });

  랜더();
};

const 클릭 = (이름: string, 카운트: number) => {
  테이블 = 테이블?.map((x) => {
    if (x.이름 === 이름) x.인원 += 카운트;
    if (x.인원 < 0) x.인원 = 0;
    return x;
  });
  랜더();
};

const 랜더 = () => {
  요소.리스트!.innerHTML = "";

  테이블?.forEach((x) => {
    const 아이템 = document.createElement("tr");
    아이템.innerHTML = `
      <td>${x.이름}</td>
      <td>${넘버포맷(x.금액)}원</td>
      <td>
        <button onclick="클릭('${x.이름}', -1)">-1</button>
        <span>${x.인원}</span>
        <button onclick="클릭('${x.이름}', +1)">+1</button>
      </td>
    `;

    요소.리스트.appendChild(아이템);
  });

  let 계산 = 테이블?.reduce((a, b) => a + b.금액 * b.인원, 0);
  요소.토탈!.innerHTML = 넘버포맷(계산);
};

시작();
