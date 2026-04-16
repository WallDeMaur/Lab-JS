/*'use strict'

function calcTotal(a, b){
    return(a+b);
};
console.log(calcTotal(10, 5));

function formatRecord(id, title, status){
    return `#${id} ${title} [${status}]`;
};
console.log(formatRecord(3, "Тестовая записб", "new"));

const values = [1200, 500, 800, 1500];
let sum = 0;
for(let i = 0; i < values.length; i++){
    sum += values[i];
};
console.log(sum);
console.log(values.filter(value => value >= 800));

const object = {
id: 1, title: 'title', value: 2000, status: 'new', createdAt: '2000-01-01',
};
const objet = {
    id: 1, title: 'title', value: 2000, status: 'new', createdAt: '2000-01-01'
};
console.log(object);
object.status = 'done';
console.log(object);

function isNew(record){
    switch (record.status){
        case 'new':
            return true;
            break;
        default:
            return false;
    }
}
console.log(isNew(object));
console.log(isNew(objet));

const testItmes = [
    {id: 1, value: 2000},
    {id: 2, value: 2000},
    {id: 3, value: 2000},
    {id: 4, value: 2000},
];

function findById(items, id) {
  return items.find(item => item.id === id) || null;
};
console.log(findById(testItmes, 8));

function buildStats(items) {
  return items.reduce((acc, item) => {
    acc.totalCount += 1;
    acc.sumValue += item.value;
    return acc;
  }, { totalCount: 0, sumValue: 0});
};
console.log(buildStats(testItmes));*/