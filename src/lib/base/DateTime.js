
/**
* Class that handles Date and Time related operations.
*/
import moment from 'moment';
import {isNullOrEmpty,StringFormat} from './FunctionUtils'

moment.locale('en');//set time theo chuan quoc te


//format time full theo chuan vietnam
export function getFullDateTimeFormat () {
    return "DD/MM/YYYY HH:mm:ss";
};

//format date theo chuan vietnam
export function getDateFormat () {
    return "DD/MM/YYYY";
};

//format time theo chuan vietnam
export function getTimeFormat () {
    return "HH:mm:ss";
};

//format time full to file
export function getFullFileSaverDateTimeFormat () {
    return "YYMMDD_HHmmss";
};

//format time
export function format (date,format) {
    return moment(date).format(format);
};

//truyen vao datetime, tra ra la 1 so tu 0-6
export function getdayOfWeek (date) {
    return moment(date).day();
};

//check value is Date
export function isValidDate (value) {
    if (value == null) return false;
    if (value.getDate) {
        return true;
    }
    return false;
};

//valid string to date with format
export function validateDateWithFormat (datetimeString, format) {
    try {
        if (format !== undefined)
            return moment(datetimeString, format, true).isValid();
        return false;
    } catch (e) {
        console.error(e);
    }
    return false;
};


//convert string to date with format
export function convertToDateWithFormat (datetimeString, format) {
    try {
        if (format !== undefined)
            return moment(datetimeString, format).toDate();
        return convertToDatetime(datetimeString);
    } catch (e) {
        console.error(e);
    }
    return null;
};

//convert string to date
export function convertToDatetime (datetimeString) {
    try {
        return moment(datetimeString,
            [getFullDateTimeFormat(),getDateFormat(),getFullFileSaverDateTimeFormat(), moment.ISO_8601])
        .toDate();
    } catch (e) {
        console.error(e);
    }
    return null;
};

//tra ve do chenh lech giua 2 khoang thoi gian tinh theo ngay
export function dateDiff (date1, date2) {
    return moment(date1).diff(moment(date2), 'days');
};

//tra ve do chenh lech giua 2 khoang thoi gian tinh theo mili giay
export function timeDiff (date1, date2) {
    return moment(date1).diff(moment(date2));
};

//dau vao la datetime, dau ra la datetime chi ghi nhan ngay, khong co gio
export function getDateOnly (time) {
    return moment(time).startOf('day').toDate();
};

//lay tong so minisecond theo time truyen vao
export function getMiliSeconds (hour, minutes, second) {
    return hour * 3600000 + minutes * 60000 + second * 1000;
};

//chuyen thoi gian sang UTC
export function convertToUTCTime (localTime) {
    return moment(localTime).utc().format();
};

//ham tra ve nam tai thoi diem hien tai
export function getCurrentYear () {
    var d = new Date();
    var y = d.getFullYear();
    return y;
};

//kiem tra xem time co trong khoang thoi gian start end hay ko?
export function inRange (timeStart, timeEnd, timeCheck) {
    if (moment(timeStart).isSame(timeCheck))
        return true;
    if (moment(timeEnd).isSame(timeCheck))
        return true;
    else {
        if (moment(timeCheck).isBefore(timeEnd) && moment(timeStart).isBefore(timeCheck))
            return true;
    }
    return false;
};


//neu time1 > time2 => 1
//neu time1 = time2 => 0
//neu time1 < time2 => -1
export function compareDateTime (time1, time2) {
    if (moment(time1).isSame(time2))
        return 0;
    else {
        if (moment(time1).isBefore(time2))
            return -1;
        else
            return 1;
    }
};

//neu time1 > time2 => 1
//neu time1 = time2 => 0
//neu time1 < time2 => -1
export function compareDate (time1, time2) {
    var change = moment(time1).diff(moment(time2), 'days');
    if (change < 0) return -1;
    if (change > 0) return 1;
        return 0;
};

//tra ve ngay dau tien cua thang
export function getStartOfMonth (time, month) {
    var date = new Date(time.getFullYear(), month, 1); //chon ngay dau thang
    if (compareDate(time, date) < 0)
        date = moment(date).subtract(1, 'y').toDate(); //lui ve nguyen 1 nam
    return date;
};

//tra ve ngay cuoi cung cua thang
export function getEndOfMonth (time, month) {
    var date = moment({ y: time.getFullYear(), M: month, d: 1 }).add(1, 'M').subtract(1, 'd').toDate(); //chon thang dau thang tiep theo, lui ve ngay cuoi thang
    if (compareDate(time, date) < 0) {
        if (compareDate(time, moment(date).subtract(1, 'M').toDate()) < 0) { //kiem tra xem co trong thang hay ko
            date = moment(date).subtract(1, 'y').toDate(); //lui ve nguyen 1 nam
        }
    }
    return date;
};

//convert string "DD/MM/YYYY" to date.
export function convertToDate (datetimeString) {
    try {
        if (isNullOrEmpty(datetimeString)) return null;
        if (typeof datetimeString != 'string' || !datetimeString instanceof String) {
            return datetimeString;
        }
        return moment(datetimeString,
            [getFullDateTimeFormat(),getDateFormat(),getFullFileSaverDateTimeFormat(), moment.ISO_8601]
            ).startOf('day').toDate();
    } catch (e) {
        console.error(e);
    }
    return null;
};

//them sec vao date
export function addSecondsToTime (time, secs) {
    return moment(time).add(secs, 's').toDate();
};
//them ngay vao date va chuyen ve chi ghi nhan ngay, ko co gio
export function addDaysToTime (time, days) {
    return moment(time).add(days, 'd').startOf('day').toDate();
};
//them tuan vao date va chuyen ve chi ghi nhan ngay, ko co gio
export function addWeekToTime (time, days) {
    return moment(time).add(days, 'w').startOf('day').toDate();
};
//them thang vao date va chuyen ve chi ghi nhan ngay, ko co gio
export function addMonthsToTime (time, months) {
    return moment(time).add(months, 'M').startOf('day').toDate();
};
//chuyen ve gio local
export function convertToLocalTime (utcTime) {
    return moment.utc(utcTime).local().toDate();;
};

//chuyen tu string datetime utc thanh gio local
export function convertToLocalTimeString (strUtcTime) {
    var utcTime = convertToUTCTime(convertToDatetime(strUtcTime));
    return convertToLocalTime(utcTime);
};

//tra ve string date
export function getDateString (input) {
    if (input == null) return input;
    if (typeof input === 'string' || input instanceof String) {
        //neu la string thi convert theo format
        return moment(input,
            [getFullDateTimeFormat(),getDateFormat(),getFullFileSaverDateTimeFormat(), moment.ISO_8601])
        .format(getDateFormat());
    } else {
        //neu khac thi de moment tu convert
        return moment(input).format(getDateFormat());;
    }
};

//tra ve string time
export function getTimeString (input) {
    if (input == null) return input;
    if (typeof input === 'string' || input instanceof String) {
        //neu la string thi convert theo format
        return moment(input, getTimeFormat()).format(getTimeFormat());
    } else {
        return moment(input).format(getTimeFormat());
    }
};

//tra ve string date time
export function getDateTimeFullString (input) {
    if (input == null) return input;
    if (typeof input === 'string' || input instanceof String) {
        //neu la string thi convert theo format
        return moment(input,
            [getFullDateTimeFormat(),getDateFormat(),getFullFileSaverDateTimeFormat(), moment.ISO_8601])
        .format(getFullDateTimeFormat());
    } else {
        //neu khac thi de moment tu convert
        return moment(input).format(getFullDateTimeFormat());;
    }
};
