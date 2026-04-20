/*function isValidDateYMD(s) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(s);
}
console.log(isValidDateYMD("2026-02-18"));
console.log(isValidDateYMD("18.02.2026"));
console.log(isValidDateYMD(""));

function isValidTitle(s) {
    const regex = /[<>{};]/;
    return !regex.test(s);
}
console.log(isValidTitle("string"));
console.log(isValidTitle("string>"));
console.log(isValidTitle("string;"));

function extractIds(text) {
    const matches = text.match(/\d+/g);
    return matches ? matches.map(Number) : [];
}
console.log(extractIds("id=5; id=12; id=30"));

function normalizeSpaces(s) {
    return s.replace(/\s+/g, " ").trim();
}
console.log(normalizeSpaces(" A B\t\tC "))

function validateRequired(value, fieldName) {
    if (value.trim() !== "") {
        return null;
    }
    return `Поле ${fieldName} обязательно`;
}
console.log(validateRequired(""));
console.log(validateRequired("ok"));

function validateNumberRange(n, min, max, fieldName) {
    if (typeof n !== "number" || isNaN(n)) {
        return `${n} is not a number`;
    }
    if (n < min || n > max) {
        return "Out of range";
    }
    return null;
}
console.log(validateNumberRange(10, 0, 100, "Value"));
console.log(validateNumberRange(-1, 0, 100, "Value"));
console.log(validateNumberRange(NaN, 0, 100, "Value"));

function buildRecordFromForm(raw) {
    return {
        title: normalizeSpaces(raw.title || ""),
        value: Number(raw.value),
        status: raw.status || "new",
        createdAt: raw.createdAt || ""
    };
}

const rawExample = {
    title: "  Пример   записи  ",
    value: "42",
    status: "done",
    createdAt: "2026-04-18"
};
console.log(buildRecordFromForm(rawExample));

function collectErrors(record) {
    const errors = [];

    if (!isValidTitle(record.title)) {
        errors.push("Invalid character");
    }
    if (record.createdAt && !isValidDateYMD(record.createdAt)) {
        errors.push("Invalid date");
    }
    const reqTitle = validateRequired(record.title, "Title");
    if (reqTitle) errors.push(reqTitle);
    const reqValue = validateRequired(String(record.value), "Value");
    if (reqValue) errors.push(reqValue);
    const rangeError = validateNumberRange(record.value, 0, 10000, "Value");
    if (rangeError) errors.push(rangeError);
    return errors;
}
console.log(collectErrors({ title: "Task", value: 100, createdAt: "2026-04-18" }));
console.log(collectErrors({ title: "Task <script>", value: -5, createdAt: "18.04.2026" }));

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demoDelay() {
    console.log("Waiting...");
    await delay(500);
    console.log("done");
}
demoDelay();

async function safeFetchJson(url) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    return { ok: false, error: "Сетевая ошибка", details: String(err) };
  }

  if (!resp.ok) {
    return { ok: false, error: `HTTP ошибка: ${resp.status}`, details: resp.statusText };
  }

  let data;
  try {
    data = await resp.json();
  } catch (err) {
    return { ok: false, error: "Ошибка JSON", details: String(err) };
  }

  return { ok: true, data };
}
safeFetchJson("https://errormes.uk").then(result => console.log(result));

function tryParseJson(text) {
    try {
        const data = JSON.parse(text);
        return { ok: true, data };
    } catch (error) {
        return { ok: false, error: error.message };
    }
}
console.log(tryParseJson("{"a":1}"));
console.log(tryParseJson("{a:1}"));

function normalizeApiValue(x) {
    if (typeof x === "number") return x;
    if (typeof x === "string") {
        const num = Number(x);
        return isNaN(num) ? 0 : num;
    }
    return 0;
}
console.log(normalizeApiValue(10));
console.log(normalizeApiValue("20"));
console.log(normalizeApiValue(null));
console.log(normalizeApiValue("abc"));*/