const input = document.getElementById("excelFile");

input.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets["داتا"];

        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        alert("عدد الصفوف = " + rows.length);

        console.log(rows);

    };

    reader.readAsArrayBuffer(file);

});
