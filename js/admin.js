function initAdmin() {
    let prices = JSON.parse(localStorage.getItem("prices")) || { p1: "", p2: "", p3: "" };
    if (document.getElementById("price1")) document.getElementById("price1").value = prices.p1;
    if (document.getElementById("price2")) document.getElementById("price2").value = prices.p2;
    if (document.getElementById("price3")) document.getElementById("price3").value = prices.p3;
    renderOrders();
}
function savePrices() {
    let prices = {
        p1: document.getElementById("price1").value.trim(),
        p2: document.getElementById("price2").value.trim(),
        p3: document.getElementById("price3").value.trim()
    };
    localStorage.setItem("prices", JSON.stringify(prices));
    alert("Цены обновлены!");
}
function renderOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let tbody = document.getElementById("ordersTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#8b8ba3;">Новых заказов нет</td></tr>`;
        return;
    }
    orders.forEach((order, index) => {
        let statusClass = order.status === "Новый" ? "status-new" : "status-done";
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${order.date}</td>
            <td><b>${order.name}</b></td>
            <td><a href="https://t.me/${order.telegram.replace('@','')}" target="_blank" style="color:#765cff; text-decoration:none;">${order.telegram}</a></td>
            <td><span style="color:#b55cff; font-weight:bold;">${order.plan}</span></td>
            <td style="max-width:250px; white-space:pre-wrap;">${order.text}</td>
            <td><span class="status-badge ${statusClass}">${order.status}</span></td>
            <td>${order.status === "Новый" ? `<button class="actions-btn" onclick="toggleStatus(${index})">Выполнено</button>` : '—'}</td>`;
        tbody.appendChild(tr);
    });
}
function toggleStatus(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders[index]) { orders[index].status = "Выполнен"; localStorage.setItem("orders", JSON.stringify(orders)); renderOrders(); }
}
function clearOrders() {
    if (confirm("Удалить все заказы?")) { localStorage.removeItem("orders"); renderOrders(); }
}
window.addEventListener("DOMContentLoaded", initAdmin);
