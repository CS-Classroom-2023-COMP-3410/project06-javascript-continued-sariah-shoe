document.addEventListener("DOMContentLoaded", () => {
    const periodicTable = document.getElementById("periodic-table");
    const searchInput = document.getElementById("search");
    const elementInfo = document.getElementById("element-info");

    const elements = [
        { number: 1, symbol: "H", name: "Hydrogen", group: 1 },
        { number: 2, symbol: "He", name: "Helium", group: 18 },
        { number: 3, symbol: "Li", name: "Lithium", group: 1 },
        { number: 4, symbol: "Be", name: "Beryllium", group: 2 },
        // Add more elements here...
    ];

    function renderTable() {
        periodicTable.innerHTML = "";
        elements.forEach(el => {
            const elementDiv = document.createElement("div");
            elementDiv.classList.add("element");
            elementDiv.textContent = el.symbol;
            elementDiv.dataset.number = el.number;
            elementDiv.dataset.group = el.group;
            elementDiv.addEventListener("click", () => displayElementInfo(el));
            periodicTable.appendChild(elementDiv);
        });
    }

    function displayElementInfo(el) {
        elementInfo.innerHTML = `
            <h2>${el.name} (${el.symbol})</h2>
            <p>Atomic Number: ${el.number}</p>
            <p>Group: ${el.group}</p>
        `;
        elementInfo.classList.remove("hidden");

        document.querySelectorAll(".element").forEach(e => e.classList.remove("selected", "group-highlight"));
        const selectedElement = document.querySelector(`[data-number='${el.number}']`);
        selectedElement.classList.add("selected");

        document.querySelectorAll(`[data-group='${el.group}']`).forEach(e => e.classList.add("group-highlight"));
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll(".element").forEach(el => {
            const name = elements.find(e => e.symbol === el.textContent).name.toLowerCase();
            const symbol = el.textContent.toLowerCase();
            const number = el.dataset.number.toString();

            if (name.includes(query) || symbol.includes(query) || number.includes(query)) {
                el.style.backgroundColor = "lightcoral";
            } else {
                el.style.backgroundColor = "white";
            }
        });
    });

    renderTable();
});
