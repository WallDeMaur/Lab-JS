'use strict'
//К заданию 1.3
const appConfig = {
    appTitle: "Request counter",
    defaultStatus: "New",
    minValueForFilter: 800,
}
let actionCount = 0;
actionCount = actionCount + 1;
actionCount += 1;
actionCount++
console.log("Action Count: ", actionCount, "appConfig: ", appConfig);
appConfig.minValueForFilter = 4000;

//К заднию 1.4
const entity0 = {
    id: 80,
    title: "Request Entity",
    value: 12,
    status: "done",
    createdAt: "2000-01-01"
}

const entity1 = {
    id: 81,
    title: "Request Entity",
    value: 4000,
    status: "new",
    createdAt: "2000-01-01"
}

const entity2 = {
    id: 82,
    title: "Request Entity",
    value: 13000,
    status: "new",
    createdAt: "2000-01-01"
}

const entity3 = {
    id: 83,
    title: "Request Entity",
    value: 12,
    status: "new",
    createdAt: "2000-01-01"
}

const entity4 = {
    id: 84,
    title: "Request Entity",
    value: 12,
    status: "new",
    createdAt: "2000-01-01"
}

const entity5 = {
    id: 85,
    title: "Request Entity",
    value: 12,
    status: "new",
    createdAt: "2000-01-01"
}

console.log("Request list: ", entity0, entity1, entity2, entity3, entity4, entity5);

//К заданию 1.5
const inputMinValue = "800";
const minValue = Number(inputMinValue);
if (Number.isNaN(minValue)){
    console.log("Error");
} else {
    console.log("minValue: ", minValue);
}

//К заданию 1.6
const userAge = 19;
const isBlocked = false;
const hasAccess = userAge >= 18 && userAge < 65 && !isBlocked;
console.log("Acess: ", hasAccess);

//К заданию 1.7
switch (entity0.status) {
  case "new":
    console.log("Новая запись");
    break;
  case "done":
    console.log("Завершено");
    break;
  default:
    console.log("Неизвестный статус");
}
if (entity0.value >= 1000) {
    console.log("Высокое значение")
} else if (entity0.value >= 700) {
    console.log("Среднее значение")
} else {
    console.log("Низкое значение")
}

//К заданию 1.8
const entities = [entity0, entity1, entity2, entity3, entity4, entity5];
let counter = 0;
for (let i = 0; i < entities.length; i++){
    if (entities[i].status === "new"){
        counter += 1;
    }
}
console.log(counter)

//Задание 3
const btnAll   = document.getElementById('btnAll');
const btnNew   = document.getElementById('btnNew');
const btnStatus = document.getElementById('btnStatus');
const output   = document.getElementById('output');

btnAll.addEventListener('click', () => {
    let text = "Все записи:\n";
    for (let i = 0; i < entities.length; i++) {
        text += `${i + 1}. ${JSON.stringify(entities[i], null, 2)}\n`;
    }  
    output.textContent = text;
});

btnNew.addEventListener('click', () => {
    let text = "Записи со статусом new:\n";
    let found = 0;
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].status === "new") {
            found++;
            text += `${found}. ${JSON.stringify(entities[i], null, 2)}\n`;
        }
    }
    output.textContent = text;
});

btnStatus.addEventListener('click', () => {
    let total = entities.length;
    let sumValue = 0;
    let maxValue = -Infinity;
    let newCount = 0;
    const minFilter = appConfig.minValueForFilter;
    let filteredCount = 0;
    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        sumValue += entity.value;
        if (entity.value > maxValue) maxValue = entity.value;
        if (entity.status === "new") newCount++;
        if (entity.value >= minFilter) filteredCount++;
    }
    let text = `Данные корректны\n`;
    text += `Всего записей: ${total}\n`;
    text += `Сумма value: ${sumValue}\n`;
    text += `Максимум value: ${maxValue}\n`;
    text += `Количество status= new: ${newCount}\n`;
    text += `Фильтр value >= ${minFilter}: ${filteredCount}\n`;
    output.textContent = text;
});