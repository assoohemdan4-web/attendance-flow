/* ==========================================
   admin.js
==========================================*/

"use strict";

const input = document.getElementById("excelFile");

input.addEventListener("change", loadExcelFile);

function loadExcelFile(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            // قراءة ملف Excel
            const workbook = XLSX.read(e.target.result, {
                type: "binary"
            });

            // عدد الشيتات
            document.getElementById("sheetCount").textContent =
                workbook.SheetNames.length;

            // البحث عن شيت السحب
            const sheet = workbook.Sheets["السحب"];

            if (!sheet) {

                alert("❌ لم يتم العثور على شيت (السحب)");

                return;

            }

            // قراءة البيانات
            attendanceData = parseAttendanceSheet(sheet);

            // تحديث الإحصائيات
            document.getElementById("employeeCount").textContent =
                getEmployeesCount();

            document.getElementById("rowCount").textContent =
                getRecordsCount();

            // Console للتأكد
            console.log("========== Attendance Data ==========");
            console.log(attendanceData);

            alert("✅ تم تحميل الملف بنجاح");

        }

        catch (error) {

            console.error(error);

            alert("❌ حدث خطأ أثناء قراءة الملف");

        }

    };

    reader.readAsBinaryString(file);

}
