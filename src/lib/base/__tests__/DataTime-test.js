
'use strict';

jest.autoMockOff();

var DateTime  = require ('../DateTime');

describe('DateTime', () => {
    it('getFullDateTimeFormat', () => {
        var obj = DateTime.getFullDateTimeFormat();
        expect(obj).toBe('DD/MM/YYYY HH:mm:ss');
    });
    it('getDateFormat', () => {
        var obj = DateTime.getDateFormat();
        expect(obj).toBe('DD/MM/YYYY');
    }); 
    it('getTimeFormat', () => {
        var obj = DateTime.getTimeFormat();
        expect(obj).toBe('HH:mm:ss');
    });
    it('getFullFileSaverDateTimeFormat', () => {
    	var obj = DateTime.getFullFileSaverDateTimeFormat();
        expect(obj).toBe('YYMMDD_HHmmss');
    });
    var dt = new Date(2016,1,1,0,0,0);
    var dt1 = new Date(2016,1,2,0,0,0);
    it('format', () => {
        var obj = DateTime.format(dt,'YYYY');
        expect(obj).toBe('2016');
    });
    it('getdayOfWeek', () => {
        var obj = DateTime.getdayOfWeek(dt);
        expect(obj).toBe(1);
    }); 
    it('isValidDate', () => {
        var obj = DateTime.isValidDate(dt);
        expect(obj).toBe(true);
    });
    it('isValidDate invalid', () => {
        var obj = DateTime.isValidDate('test');
        expect(obj).toBe(false);
    });
    it('isValidDate invalid', () => {
        var obj = DateTime.isValidDate(null);
        expect(obj).toBe(false);
    });
    it('validateDateWithFormat', () => {
        var obj = DateTime.validateDateWithFormat('20161230','YYYYMMDD');
        expect(obj).toBe(true);
    }); 
    it('validateDateWithFormat invalid', () => {
        var obj = DateTime.validateDateWithFormat('20161230','MMDDYYYY');
        expect(obj).toBe(false);
    });
    it('validateDateWithFormat undefined', () => {
        var obj = DateTime.validateDateWithFormat('20161230');
        expect(obj).toBe(false);
    }); 
    it('convertToDateWithFormat', () => {
        var obj = DateTime.convertToDateWithFormat('20161230','YYYYMMDD');
        expect(obj.getUTCFullYear()).toBe(2016);
    }); 
    it('convertToDateWithFormat invalid', () => {
        var obj = DateTime.convertToDateWithFormat('20161230','MMDDYYYY');
        expect(obj).toBeTruthy();
    });
    it('convertToDateWithFormat noformat', () => {
        var obj = DateTime.convertToDateWithFormat('20161230');
       expect(obj.getUTCFullYear()).toBe(2016);
    });
    it('convertToDatetime', () => {
        var obj = DateTime.convertToDatetime('20161230');
        expect(obj.getUTCFullYear()).toBe(2016);
    });
    it('dateDiff', () => {
        var obj = DateTime.dateDiff(dt,dt1);
        expect(obj).toBe(-1);//chenh 1 ngay
    }); 
    it('timeDiff', () => {
        var obj = DateTime.timeDiff(dt,dt1);
        expect(obj).toBe(-86400000);//chenh 1 ngay theo mili second
    });  
    it('getDateOnly', () => {
        var obj = DateTime.getDateOnly(dt);
        expect(obj.getUTCFullYear()).toBe(2016);
    }); 
    it('getMiliSeconds', () => {
        var obj = DateTime.getMiliSeconds(1,1,1);
        expect(obj).toBe(3661000);
    }); 
    it('convertToUTCTime', () => {
        var obj = DateTime.convertToUTCTime(dt);
        console.info('utc:'+obj.toString());
        expect(DateTime.compareDateTime(obj,dt)).toBe(0);
    });
    it('getCurrentYear', () => {
        var obj = DateTime.getCurrentYear();
        expect(obj).toBe(new Date().getFullYear());
    }); 

    it('inRange left array', () => {
        var obj = DateTime.inRange(dt,dt1,dt);
        expect(obj).toBe(true);
    });
    it('inRange right array', () => {
        var obj = DateTime.inRange(dt,dt1,dt1);
        expect(obj).toBe(true);
    }); 
    it('inRange out of array', () => {
        var obj = DateTime.inRange(dt,dt1,new Date(2014,1,1,10,0,0));
        expect(obj).toBe(false);
    }); 
    it('compareDateTime same', () => {
        var obj = DateTime.compareDateTime(dt,dt);
        expect(obj).toBe(0);
    }); 
    it('compareDateTime older', () => {
        var obj = DateTime.compareDateTime(dt,dt1);
        expect(obj).toBe(-1);
    }); 
    it('compareDateTime younger', () => {
        var obj = DateTime.compareDateTime(dt1,dt);
        expect(obj).toBe(1);
    }); 

    it('compareDate same', () => {
        var obj = DateTime.compareDate(dt,dt);
        expect(obj).toBe(0);
    }); 
    it('compareDate older', () => {
        var obj = DateTime.compareDate(dt,dt1);
        expect(obj).toBe(-1);
    }); 
    it('compareDate younger', () => {
        var obj = DateTime.compareDate(dt1,dt);
        expect(obj).toBe(1);
    }); 
    it('getStartOfMonth', () => {
        var obj = DateTime.getStartOfMonth(dt,2);
        expect(obj.getUTCFullYear()).toBe(2015);
    }); 
    it('getEndOfMonth', () => {
        var obj = DateTime.getEndOfMonth(dt,2);
        expect(obj.getUTCFullYear()).toBe(2015);
    }); 
    it('convertToDate', () => {
        var obj = DateTime.convertToDate('27/11/2015');//"DD/MM/YYYY"
        expect(obj.getUTCFullYear()).toBe(2015);
    });
    it('addSecondsToTime', () => {
        var second = 5;
        var obj = DateTime.addSecondsToTime(dt,second);
        expect(obj.getUTCSeconds()).toBe(second);
    }); 
    it('addDaysToTime', () => {
        var day = 5;
        var obj = DateTime.addDaysToTime(dt, day);
        expect(obj.getDate()).toBe(day + dt.getDate());
    }); 
     it('addWeekToTime', () => {
        var week = 1;
        var obj = DateTime.addWeekToTime(dt, week);
        expect(obj.getDate()).toBe(week*7+dt.getDate());
    }); 
    it('addMonthsToTime', () => {
        var month = 1;
        var obj = DateTime.addMonthsToTime(dt, month);
        expect(obj.getUTCMonth()).toBe(month+dt.getUTCMonth());
    }); 
    it('convertToLocalTime', () => {
        var obj = DateTime.convertToLocalTime(dt);
        console.info('local:'+obj.toString());
        expect(DateTime.compareDateTime(obj,dt)).toBe(0);
    });
    it('convertToLocalTimeString', () => {
        var obj = DateTime.convertToLocalTimeString('2016/01/01');
        expect(obj.getHours()).toBe(dt.getHours());
    });

    it('getDateString null', () => {
        var obj = DateTime.getDateString(null);
        expect(obj).toBe(null);
    }); 
    it('getDateString string', () => {
        var obj = DateTime.getDateString('01/01/2016');//"DD/MM/YYYY"
        expect(obj).toBe('01/01/2016');
    });
    it('getDateString date', () => {
        var obj = DateTime.getDateString(dt);
        expect(obj).toBe('01/02/2016');
    }); 

    it('getTimeString null', () => {
        var obj = DateTime.getTimeString(null);
        expect(obj).toBe(null);
    }); 
    it('getTimeString string', () => {
        var obj = DateTime.getTimeString('09:59:52');//"HH:mm:SS"
        expect(obj).toBe('09:59:52');
    });
    it('getTimeString date', () => {
        var obj = DateTime.getTimeString(dt);
        expect(obj).toBe('00:00:00');
    }); 

    it('getDateTimeFullString null', () => {
        var obj = DateTime.getDateTimeFullString(null);
        expect(obj).toBe(null);
    }); 
    it('getDateTimeFullString string', () => {
        var obj = DateTime.getDateTimeFullString('01/01/2016 09:59:52');//"HH:mm:SS"
        expect(obj).toBe('01/01/2016 09:59:52');
    });
    it('getDateTimeFullString date', () => {
        var obj = DateTime.getDateTimeFullString(dt);
        expect(obj).toBe('01/02/2016 00:00:00');
    }); 
});