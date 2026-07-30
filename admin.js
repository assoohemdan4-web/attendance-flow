"use strict";

console.log("✅ admin.js Loaded");

const input = document.getElementById("excelFile");

if (!input) {
    console.error("❌ excelFile input not found");
} else {
    input.addEventListener("change", loadExcelFile);
}

function loadExcelFile(event) {

    console.log("📁 File Selected");

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const workbook = XLSX.read(e.target.result, {
                type: "binary"
            });

            console.log(workbook);

            document.getElementById("sheetCount").textContent =
                workbook.SheetNames.length;

            const sheet = workbook.Sheets["السحب"];

            if (!sheet) {

                alert("❌ لم يتم العثور على شيت (السحب)");

                return;

            }

            attendanceData = parseAttendanceSheet(sheet);

            document.getElementById("employeeCount").textContent =
                getEmployeesCount();

            document.getElementById("rowCount").textContent =
                getRecordsCount();

            console.log(attendanceData);

            alert("✅ تم تحميل الملف بنجاح");

        } catch (err) {

            console.error(err);

            alert("❌ " + err.message);

        }

    };

    reader.readAsBinaryString(file);

}
