const input = document.getElementById("excelFile");

input.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, { type: "array" });

        alert("Sheets:\n\n" + workbook.SheetNames.join("\n"));

    };

    reader.readAsArrayBuffer(file);

});
