function searchEmployee() {
    let code = document.getElementById("empCode").value.trim();

    if (code === "") {
        alert("Please enter employee code");
        return;
    }

    window.location.href = "report.html?code=" + encodeURIComponent(code);
}
