/*console.log(helloFromLogic());
const message = document.getElementById("message");
message.textContent = "DOM работает";

const p1 = document.createElement("p");
p1.textContent = "TEXT1";
const p2 = document.createElement("p");
p2.textContent = "TEXT2";
const p3 = document.createElement("p");
p3.textContent = "TEXT3";

demoList.appendChild(p1);
demoList.appendChild(p2);
demoList.appendChild(p3);*/

// script.js

const listEl = document.getElementById("list");
const messageEl = document.getElementById("message");
const formErrorsEl = document.getElementById("formErrors");

const btnAll = document.getElementById("btnAll");
const btnNew = document.getElementById("btnNew");
const btnSort = document.getElementById("btnSort");
const btnStats = document.getElementById("btnStats");
const btnData = document.getElementById("btnData");

const form = document.querySelector("form");
const titleInput = document.getElementById("titleInput");
const valueInput = document.getElementById("valueInput");
const createdAtInput = document.getElementById("createdAtInput");
const statusInput = document.getElementById("statusInput");

function renderList(itemsToRender) {
    listEl.innerHTML = "";

    itemsToRender.forEach(item => {
        const row = document.createElement("div");
        row.className = "request-row";
        row.innerHTML = 
            `<span class="req-id">#${item.id}</span>
            <span class="req-title">${item.title}</span>
            <span class="req-value">value: ${item.value}</span>
            <span class="req-status">${item.status}</span>
            <span class="req-date">${item.createdAt}</span>`;

        const btnRemove = document.createElement("button");
        btnRemove.textContent = "Delete";
        btnRemove.className = "btn-remove";
        btnRemove.dataset.id = item.id;

        btnRemove.addEventListener("click", () => {
            const index = items.findIndex(i => i.id === item.id);
            if (index !== -1) {
                items.splice(index, 1);
                renderList(items);
            }
        });

        row.appendChild(btnRemove);
        listEl.appendChild(row);
    });
}

btnAll.addEventListener("click", () => {
    renderList(items);
    messageEl.textContent = "All requests";
});

btnNew.addEventListener("click", () => {
    const newItems = filterByStatus(items, "new");
    renderList(newItems);
    messageEl.textContent = `New requests: ${newItems.length}`;
});

btnSort.addEventListener("click", () => {
    const sorted = sortByValueDesc(items);
    renderList(sorted);
    messageEl.textContent = "Sorted requests";
});

btnStats.addEventListener("click", () => {
    const stats = buildStats(items);
    messageEl.textContent = 
        `Total requests: ${stats.totalCount} | ` +
        `Total value: ${stats.sumValue} | ` +
        `Max value: ${stats.maxValue} | ` +
        `New requests: ${stats.newCount}`;
});

window.addEventListener("load", () => {
    renderList(items);
});

form.addEventListener("submit", e => {
    e.preventDefault();

    formErrorsEl.innerHTML = "";
    messageEl.textContent = "";

    const raw = {
        title: titleInput.value,
        value: valueInput.value,
        createdAt: createdAtInput.value,
        status: statusInput.value
    };

    const record = buildRecordFromForm(raw);
    const errors = collectErrors(record);

    if (errors.length > 0) {
        formErrorsEl.innerHTML = errors
            .map(err => `<p style="margin:2px 0;">${err}</p>`)
            .join("");
        return;
    }

    const maxId = items.length > 0 ? Math.max(...items.map(i => i.id)) : 0;
    const newItem = { ...record, id: maxId + 1 };

    items.push(newItem);
    renderList(items);
    form.reset();
});

btnData.addEventListener("click", async () => {
    messageEl.textContent = "Loading...";
    formErrorsEl.innerHTML = "";

    const result = await safeFetchJson("https://jsonplaceholder.typicode.com/todos?_limit=6");

    if (result.ok) {
        const maxId = items.length > 0 ? Math.max(...items.map(i => i.id)) : 0;
        let nextId = maxId + 1;

        const newItems = result.data.map(todo => ({
            id: nextId++,
            title: normalizeSpaces(`Foreign: ${todo.title}`),
            value: 2000 + (todo.id * 73 % 1500),
            status: todo.completed ? "done" : "new",
            createdAt: "2000-01-01"
        }));

        items.push(...newItems);
        renderList(items);
        messageEl.textContent = `${newItems.length} requests loaded`;
    } else {
        messageEl.textContent = `Not loaded: ${result.error}`;
        console.error(result.error);
    }
});