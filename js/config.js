/* ==========================================
   Attendance Management System
   config.js
   Project Configuration
==========================================*/

"use strict";

const CONFIG = {

    /* ==========================
       Company Information
    ========================== */

    COMPANY_NAME: "Attendance Management System",

    VERSION: "1.0.0",

    DEFAULT_SHEET: "السحب",

    /* ==========================
       Standard Working Days
    ========================== */

    WORKING_HOURS: {

        Sunday: {
            start: "08:00",
            end: "16:00"
        },

        Monday: {
            start: "08:00",
            end: "16:00"
        },

        Tuesday: {
            start: "08:00",
            end: "16:00"
        },

        Wednesday: {
            start: "08:00",
            end: "16:00"
        },

        Thursday: {
            start: "08:00",
            end: "14:00"
        },

        Saturday: {
            start: "09:00",
            end: "16:00"
        }

    },

    /* ==========================
       Weekend
    ========================== */

    WEEKEND: [

        "Friday"

    ],

    /* ==========================
       Morning Overtime
    ========================== */

    MORNING_OVERTIME: {

        start: "07:00",

        end: "08:00"

    },

    /* ==========================
       Evening Overtime
    ========================== */

    EVENING_OVERTIME: {

        start: "16:00",

        end: "17:00"

    },

    /* ==========================
       Attendance
