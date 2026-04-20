/*function helloFromLogic(){
    return "Logic works"
}*/

function filterByStatus(items, status) {
    return items.filter(item => item.status === status);
}

function findById(items, id) {
    return items.find(item => item.id === id) || null;
}

function sortByValueDesc(items) {
    const copy = items.slice();
    copy.sort((a, b) => b.value - a.value);
    return copy;
}

function buildStats(items) {
    return items.reduce((acc, item) => {
        acc.totalCount += 1;
        acc.sumValue += item.value;
        if (item.value > acc.maxValue) acc.maxValue = item.value;
        if (item.status === "new") acc.newCount += 1;
        return acc;
    }, { totalCount: 0, sumValue: 0, maxValue: 0, newCount: 0 });
}

function isValidDateYMD(s) {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(s) && !isNaN(Date.parse(s));
}

function isValidTitle(s) {
    const re = /[<>{};]/;
    return !re.test(s);
}

function normalizeSpaces(s) {
    return s.replace(/\s+/g, " ").trim();
}

function validateRequired(value, fieldName) {
    if (!value || String(value).trim() === "") {
        return `${fieldName} is required`;
    }
    return null;
}

function validateNumberRange(n, min, max, fieldName) {
    if (isNaN(Number(n))) {
        return `${fieldName} is not a number`;
    }
    const num = Number(n);
    if (num < min || num > max) {
        return `Out of range`;
    }
    return null;
}

function buildRecordFromForm(raw) {
    return {
        title: normalizeSpaces(String(raw.title || "")),
        value: Number(raw.value),
        createdAt: String(raw.createdAt || ""),
        status: raw.status || "new"
    };
}

function collectErrors(record) {
    const errors = [];

    const titleReq = validateRequired(record.title, "Title");
    if (titleReq) errors.push(titleReq);
    else if (!isValidTitle(record.title)) {
        errors.push("Invalid character");
    }

    const valueErr = validateNumberRange(record.value, 0, 1000000, "Value");
    if (valueErr) errors.push(valueErr);

    const dateReq = validateRequired(record.createdAt, "Data");
    if (dateReq) errors.push(dateReq);
    else if (!isValidDateYMD(record.createdAt)) {
        errors.push("Invalid data format");
    }

    if (!["new", "done"].includes(record.status)) {
        errors.push("Invalid status");
    }

    return errors;
}

async function safeFetchJson(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return { ok: true, data };
    } catch (error) {
        return { ok: false, error: error.message };
    }
}