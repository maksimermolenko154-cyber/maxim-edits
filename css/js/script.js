function loadPrices() {
    let prices = JSON.parse(localStorage.getItem("prices")) || { p1: "", p2: "", p3: "" };
    if (prices.p1 && document.getElementById("display-p1")) document.getElementById("display-p1").innerText = prices.p1;
    if (prices.p2 && document.getElementById("display-p2")) document.getElementById("display-p2").innerText = prices.p2;
    if (prices.p3 && document.getElementById("display-p3")) document.getElementById("display-p3").innerText = prices.p3;
}
function sendOrder(event) {
    event.preventDefault();
    let name = document.getElementById("clientName").value.trim();
    let email = document.getElementById("clientEmail").value.trim();
    let telegram = document.getElementById("clientTg").value.trim();
    let plan = document.getElementById("clientPlan").value;
    let text = document.getElementById("clientText").value.trim();
    let dateStr = new Date().toLocaleDateString("ru-RU");

    let newOrder = { name, email: email || "Не указан", telegram, plan, text: text || "Без описания", date: dateStr, status: "Новый" };
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Спасибо! Заказ успешно отправлен.");
    if (document.getElementById("orderForm")) document.getElementById("orderForm").reset();
}
document.addEventListener("DOMContentLoaded", function() {
    loadPrices();
    let orderForm = document.getElementById("orderForm");
    if (orderForm) orderForm.addEventListener("submit", sendOrder);
});
