interface Data {
  MDL_SN: string;
  DVC_CNT: number;
}

const prev: Data[] = [
  { MDL_SN: "A-001", DVC_CNT: 1 },
  { MDL_SN: "A-002", DVC_CNT: 4 },
  { MDL_SN: "A-003", DVC_CNT: 2 },
  { MDL_SN: "A-002", DVC_CNT: 5 },
  { MDL_SN: "A-002", DVC_CNT: 2 },
  { MDL_SN: "A-001", DVC_CNT: 1 },
  { MDL_SN: "A-003", DVC_CNT: 5 },
];

let next: Data[] = [];

const 방법1 = () => {
  prev?.forEach(({ MDL_SN, DVC_CNT }) => {
    let find = next?.find((x) => x?.MDL_SN === MDL_SN);
    if (!find) return next?.push({ MDL_SN, DVC_CNT });

    next = next?.map((item) => {
      if (item?.MDL_SN !== MDL_SN) return item;
      return { ...item, DVC_CNT: item?.DVC_CNT + DVC_CNT };
    });
  });
};

const 방법2 = () => {
  let models = [...new Set(prev?.map((x) => x?.MDL_SN))];
  next = models?.map((MDL_SN) => {
    let filter = prev?.filter((x) => x?.MDL_SN === MDL_SN);
    let DVC_CNT = filter?.reduce((x, y) => x + y?.DVC_CNT, 0);
    return { MDL_SN, DVC_CNT };
  });
};

// 시작
방법2();
console.log(next);
