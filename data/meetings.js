const SURNAMES = [
  "Батсайхан",
  "Ганзориг",
  "Эрдэнэбат",
  "Отгонбаяр",
  "Түвшинжаргал",
  "Даваасүрэн",
  "Мөнхсайхан",
  "Лхагвасүрэн",
  "Цэрэнпүрэв",
  "Жавхлантөгс",
];

const FIRST_NAMES = [
  "Тэмүүжин",
  "Номин",
  "Мөнхжин",
  "Саруул",
  "Билгүүн",
  "Оюун-Эрдэнэ",
  "Анужин",
  "Төгөлдөр",
  "Хүслэн",
  "Амин-Эрдэнэ",
  "Гэрэлмаа",
  "Энхжин",
];

function pad(value, size) {
  return String(value).padStart(size, "0");
}

function makeUsers({ addressBase, codePrefix, count, arrivedCount, acceptedCount, deniedCount, phonePrefix, bagCode }) {
  const users = [];

  for (let i = 0; i < count; i += 1) {
    const arrived = i < arrivedCount;
    let status = "pending";
    let decisionDate = "";
    let denyReason = "";

    if (i < acceptedCount) {
      status = "accepted";
      decisionDate = `2026.03.18 ${pad(8 + (i % 10), 2)}:${pad((i * 7) % 60, 2)}`;
    } else if (i < acceptedCount + deniedCount) {
      status = "denied";
      decisionDate = `2026.03.18 ${pad(9 + (i % 10), 2)}:${pad((i * 11) % 60, 2)}`;
      denyReason = "Бүртгэлийн мэдээлэл дутуу";
    }

    const rd = `${codePrefix}${pad(10 + (i % 90), 2)}${pad(100000 + i, 6)}`;
    const idCard = `${bagCode}${pad(10000000 + i, 8)}`;
    const chip = `${pad(100000000000 + i * 13, 12)}`;
    const phone = `${phonePrefix}${pad((i * 3) % 10000, 4)}`;

    users.push({
      surname: SURNAMES[i % SURNAMES.length],
      firstName: FIRST_NAMES[(i * 2) % FIRST_NAMES.length],
      rd,
      idCard,
      chip,
      phone,
      arrived,
      status,
      decisionDate,
      denyReason,
      address: `${addressBase}, ${pad((i % 50) + 1, 2)}-р байр`,
    });
  }

  return users;
}

export const meetings = [
  {
    id: 1,
    title: "Дархан-Уул аймаг намын хорооны ээлжит хурал",
    description: "Аймгийн намын хорооны удирдах бүрэлдэхүүний 2026 оны 1-р улирлын төлөвлөгөө хэлэлцэх хурал.",
    date: "2026.03.19",
    time: "10:00 - 18:00",
    type: "Үүрийн хурал",
    status: "Хүлээгдэж буй",
    total: 3,
    remaining: 1,
    locations: [
      {
        city: "Дархан-Уул аймаг",
        district: "Дархан сум",
        khoroo: "1-р баг",
        participants: 79,
        arrived: 2,
        users: makeUsers({
          addressBase: "Дархан-Уул аймаг, Дархан сум, 1-р баг",
          codePrefix: "ДУ",
          count: 79,
          arrivedCount: 2,
          acceptedCount: 8,
          deniedCount: 3,
          phonePrefix: "8811",
          bagCode: "ДУ",
        }),
      },
      {
        city: "Дархан-Уул аймаг",
        district: "Хонгор сум",
        khoroo: "2-р баг",
        participants: 67,
        arrived: 3,
        users: makeUsers({
          addressBase: "Дархан-Уул аймаг, Хонгор сум, 2-р баг",
          codePrefix: "ДУ",
          count: 67,
          arrivedCount: 3,
          acceptedCount: 7,
          deniedCount: 2,
          phonePrefix: "9911",
          bagCode: "ДУ",
        }),
      },
      {
        city: "Дархан-Уул аймаг",
        district: "Шарын гол сум",
        khoroo: "1-р баг",
        participants: 48,
        arrived: 2,
        users: makeUsers({
          addressBase: "Дархан-Уул аймаг, Шарын гол сум, 1-р баг",
          codePrefix: "ДУ",
          count: 48,
          arrivedCount: 2,
          acceptedCount: 5,
          deniedCount: 2,
          phonePrefix: "7711",
          bagCode: "ДУ",
        }),
      },
    ],
  },
  {
    id: 2,
    title: "Сэлэнгэ аймаг намын хорооны ээлжит хурал",
    description: "Сумдын намын үүрүүдийн тайлан нэгтгэж, аймгийн хорооны шийдвэрийн төсөл хэлэлцэх хурал.",
    date: "2026.03.20",
    time: "09:00 - 11:30",
    type: "Өдрийн хурал",
    status: "Хүлээгдэж буй",
    total: 2,
    remaining: 0,
    locations: [
      {
        city: "Сэлэнгэ аймаг",
        district: "Сүхбаатар сум",
        khoroo: "3-р баг",
        participants: 62,
        arrived: 4,
        users: makeUsers({
          addressBase: "Сэлэнгэ аймаг, Сүхбаатар сум, 3-р баг",
          codePrefix: "СЭ",
          count: 62,
          arrivedCount: 4,
          acceptedCount: 8,
          deniedCount: 3,
          phonePrefix: "8812",
          bagCode: "СЭ",
        }),
      },
      {
        city: "Сэлэнгэ аймаг",
        district: "Мандал сум",
        khoroo: "1-р баг",
        participants: 50,
        arrived: 2,
        users: makeUsers({
          addressBase: "Сэлэнгэ аймаг, Мандал сум, 1-р баг",
          codePrefix: "СЭ",
          count: 50,
          arrivedCount: 2,
          acceptedCount: 6,
          deniedCount: 2,
          phonePrefix: "9912",
          bagCode: "СЭ",
        }),
      },
    ],
  },
  {
    id: 3,
    title: "Орхон аймаг намын хорооны ээлжит хурал",
    description: "Аймгийн намын хорооны гишүүдийн оролцоог нэмэгдүүлэх төлөвлөгөө болон санхүүгийн тайлан хэлэлцэх хурал.",
    date: "2026.03.21",
    time: "14:00 - 17:00",
    type: "Үүрийн хурал",
    status: "Хүлээгдэж буй",
    total: 3,
    remaining: 2,
    locations: [
      {
        city: "Орхон аймаг",
        district: "Баян-Өндөр сум",
        khoroo: "5-р баг",
        participants: 72,
        arrived: 3,
        users: makeUsers({
          addressBase: "Орхон аймаг, Баян-Өндөр сум, 5-р баг",
          codePrefix: "ОР",
          count: 72,
          arrivedCount: 3,
          acceptedCount: 9,
          deniedCount: 3,
          phonePrefix: "8813",
          bagCode: "ОР",
        }),
      },
      {
        city: "Орхон аймаг",
        district: "Жаргалант сум",
        khoroo: "2-р баг",
        participants: 44,
        arrived: 2,
        users: makeUsers({
          addressBase: "Орхон аймаг, Жаргалант сум, 2-р баг",
          codePrefix: "ОР",
          count: 44,
          arrivedCount: 2,
          acceptedCount: 4,
          deniedCount: 2,
          phonePrefix: "9913",
          bagCode: "ОР",
        }),
      },
      {
        city: "Орхон аймаг",
        district: "Баян-Өндөр сум",
        khoroo: "9-р баг",
        participants: 56,
        arrived: 3,
        users: makeUsers({
          addressBase: "Орхон аймаг, Баян-Өндөр сум, 9-р баг",
          codePrefix: "ОР",
          count: 56,
          arrivedCount: 3,
          acceptedCount: 6,
          deniedCount: 2,
          phonePrefix: "7713",
          bagCode: "ОР",
        }),
      },
    ],
  },
];
