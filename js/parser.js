/* ==========================================
   parser.js
   Attendance Parser
==========================================*/

"use strict";

let attendanceData = {};

/* ==========================================
   قراءة شيت السحب
==========================================*/
function parseAttendanceSheet(sheet) {

    attendanceData = {};

    const rows = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        raw: true
    });

    if (rows.length === 0) return {};

    // أول صف هو رؤوس الأعمدة
    const headers = rows[0].map(h => String(h).trim());

    const idIndex = headers.indexOf("EnrollNumber");
    const nameIndex = headers.indexOf("Name");
    const dateTimeIndex = headers.indexOf("Date/Time");

    if (idIndex === -1 || nameIndex === -1 || dateTimeIndex === -1) {

        alert("❌ الملف غير صحيح.\nتأكد من وجود الأعمدة:\nEnrollNumber\nName\nDate/Time");

        return {};

    }

    // قراءة الصفوف
    for (let i = 1; i < rows.length; i++) {

        const row = rows[i];

        const employeeId = safeString(row[idIndex]);

        if (employeeId === "") continue;

        const employeeName = safeString(row[nameIndex]);

        const dateObj = excelToDate(row[dateTimeIndex]);

        if (!dateObj) continue;

        const isoDate = formatISODate(dateObj);

        const date = formatDate(dateObj);

        const time = formatTime(dateObj);

        const day = getDayName(dateObj);

        // إنشاء الموظف
        if (!attendanceData[employeeId]) {

            attendanceData[employeeId] = {

                employeeId: employeeId,

                employeeName: employeeName,

                records: {}

            };

        }

        // إنشاء اليوم
        if (!attendanceData[employeeId].records[isoDate]) {

            attendanceData[employeeId].records[isoDate] = {

                date: date,

                isoDate: isoDate,

                day: day,

                punches: []

            };

        }

        // إضافة البصمة
        attendanceData[employeeId]
            .records[isoDate]
            .punches
            .push(time);

    }

    // ترتيب البصمات
    Object.values(attendanceData).forEach(employee => {

        Object.values(employee.records).forEach(record => {

            record.punches.sort((a, b) => {

                return timeToMinutes(a) - timeToMinutes(b);

            });

        });

    });

    return attendanceData;

}

/* ==========================================
   عدد الموظفين
==========================================*/
function getEmployeesCount() {

    return Object.keys(attendanceData).length;

}

/* ==========================================
   عدد الأيام
==========================================*/
function getRecordsCount() {

    let total = 0;

    Object.values(attendanceData).forEach(employee => {

        total += Object.keys(employee.records).length;

    });

    return total;

}

/* ==========================================
   البحث بالكود
==========================================*/
function getEmployee(employeeId) {

    return attendanceData[employeeId] || null;

}

/* ==========================================
   البحث بالاسم
==========================================*/
function findEmployeeByName(name) {

    name = safeString(name).toLowerCase();

    return Object.values(attendanceData).find(emp =>

        emp.employeeName.toLowerCase().includes(name)

    ) || null;

}

/* ==========================================
   Debug
==========================================*/
function printAttendanceData() {

    console.log(attendanceData);

}

console.log("✅ parser.js Loaded");
