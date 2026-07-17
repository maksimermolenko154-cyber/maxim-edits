function checkClientLogin(event) {
    event.preventDefault();
    let inputTg = document.getElementById("clientTelegramInput").value.trim().toLowerCase();
    let errorBlock = document.getElementById("errorBlock");
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let hasOrder = orders.some(o => o.telegram.toLowerCase() === inputTg || o.telegram.toLowerCase() === '@' + inputTg || '@' + o.telegram.toLowerCase() === inputTg);

    if (hasOrder) {
        errorBlock.style.display = "none";
        let cleanTg = inputTg.startsWith('@') ? inputTg : '@' + inputTg;
        localStorage.setItem("currentClientTg", cleanTg);
        window.location.href = "account.html";
    } else {
        errorBlock.style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    let loginForm = document.querySelector("form");
    if (loginForm) loginForm.addEventListener("submit", checkClientLogin);
});
