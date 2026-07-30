Enter/* ==========================================
   Attendance Management System
   utils.js
   Common Utility Functions
==========================================*/

"use strict";

/* ==========================================
   Convert Excel Value To JavaScript Date
==========================================*/
function excelToDate(value) {

    if (value == null || value === "") return null;

    // JavaScript Date
    if (value instanceof Date) {
        return value;
    }

    // Excel Serial Number
    if (typeof value === "number") {

        const parsed = XLSX.SSF.parse_date_code(value);

        if (!parsed) return null;

        return new Date(
            parsed.y,
            parsed.m - 1,
            parsed.d,
            parsed.H,
            parsed.M,
            parsed.S || 0
        );
    }

    // String Date
    const date = new Date(value);

    if (isNaN(date)) return null;

    return date;
}

/* ==========================================
   Format Date
   26/06/2026
==========================================*/
function formatDate(date) {

    if (!date) return "";

    date = excelToDate(date);

    if (!date) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

}

/* ==========================================
   Format Time
   08:35
==========================================*/
function formatTime(date) {

    if (!date) return "";

    date = excelToDate(date);

    if (!date) return "";

    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${hour}:${minute}`;

}

/* ==========================================
   Format DateTime
==========================================*/
function formatDateTime(date) {

    return `${formatDate(date)} ${formatTime(date)}`;

}

/* ==========================================
   YYYY-MM-DD
==========================================*/
function formatISODate(date) {

    date = excelToDate(date);

    if (!date) return "";

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;

}

/* ==========================================
   Day Name
==========================================*/
function getDayName(date) {

    date = excelToDate(date);

    if (!date) return "";

    const days = [

        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"

    ];

    return days[date.getDay()];

}

/* ==========================================
   Time To Minutes
   08:35 => 515
==========================================*/
function timeToMinutes(time) {

    if (!time) return 0;

    const parts = time.split(":");

    return Number(parts[0]) * 60 + Number(parts[1]);

}

/* ==========================================
   Minutes To Time
   515 => 08:35
==========================================*/
function minutesToTime(minutes) {

    if (minutes < 0)
        minutes = 0;

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

}

/* ==========================================
   Difference Between Times
==========================================*/
function minutesBetween(start, end) {

    return timeToMinutes(end) - timeToMinutes(start);

}

/* ==========================================
   Safe String
==========================================*/
function safeString(value) {

    if (value == null)
        return "";

    return String(value).trim();

}

/* ==========================================
   Safe Number
==========================================*/
function safeNumber(value) {

    const n = Number(value);

    return isNaN(n) ? 0 : n;

}

/* ==========================================
   Sort Times
==========================================*/
function sortTimes(times) {

    return times.sort((a, b) => {

        return timeToMinutes(a) - timeToMinutes(b);

    });

}

/* ==========================================
   Get First Punch
==========================================*/
function firstPunch(times) {

    if (!times.length)
        return "";

    return sortTimes([...times])[0];

}

/* ==========================================
   Get Last Punch
==========================================*/
function lastPunch(times) {

    if (!times.length)
        return "";

    const list = sortTimes([...times]);

    return list[list.length - 1];

}

/* ==========================================
   Unique Array
==========================================*/
function unique(array) {

    return [...new Set(array)];

}

/* ==========================================
   Deep Copy
==========================================*/
function deepCopy(object) {

    return JSON.parse(JSON.stringify(object));

}

console.log("✅ utils.js Loaded");
