function searchEmployee() {
    let code = document.getElementById("empCode").value;

    if (code == "") {
        alert("Please enter employee code");
        return;
    }

    alert("Employee Code : " + code);
}
