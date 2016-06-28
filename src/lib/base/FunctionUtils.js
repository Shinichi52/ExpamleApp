'use strict';
require('regenerator/runtime');

import _ from 'underscore';


let dicKey = null,
    byPass = true;
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function formatNumber(input, decimal, isFixedFormat) {
    try {
        if (input == null) return input;
        if (isNaN(input)) return input;
        if (typeof decimal !== "undefined") input = round(input, decimal);
        input = input.toString().split('.');
        input[0] = input[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        return isFixedFormat ? changeFixed(input.join('.')) : input.join('.');
    } catch (ex) {
        console.error(ex);
    }
    return input;
}
export function round(input, decimal) {
    if (input % 1 === 0) return input;
    input = parseFloat(input).toString().split(".");
    if (decimal > 0) {
        if (input[1].length > decimal) return parseInt(input[0]) + Math.round(parseFloat(input[1].substring(0, decimal) + "." + input[1].substring(decimal))) / Math.pow(10, decimal);
        return parseFloat(input.join("."));
    } else {
        return parseInt(input[0]) + Math.round(parseFloat("0." + input[1]));
    }
}

export function changeFixed(strInput) {
    try {
        if (strInput == null)
            return strInput;
        if (!isNaN(strInput))
            strInput = strInput.toString();
        if (isNullOrEmpty(strInput))
            return '';
        if (strInput.endsWith(".000000"))
            return strInput.replace(".000000", "");
        if (strInput.endsWith(".000000)")) return strInput.replace(".000000", ")");
        if (strInput.endsWith(".00000"))
            return strInput.replace(".00000", "");
        if (strInput.endsWith(".00000)")) return strInput.replace(".00000", ")");
        if (strInput.endsWith(".0000"))
            return strInput.replace(".0000", "");
        if (strInput.endsWith(".0000)")) return strInput.replace(".0000", ")");
        if (strInput.endsWith(".000"))
            return strInput.replace(".000", "");
        if (strInput.endsWith(".000)"))
            return strInput.replace(".000", ")");
        if (strInput.endsWith(".00"))
            return strInput.replace(".00", "");
        if (strInput.endsWith(".00)"))
            return strInput.replace(".00", ")");
        if (strInput.endsWith(".0"))
            return strInput.replace(".0", "");
        if (strInput.endsWith(".0)"))
            return strInput.replace(".0", ")");
        if (strInput.indexOf('.') >= 0) {

            if (strInput.endsWith("000000"))
                return strInput.replace("000000", "");
            if (strInput.endsWith("000000)"))
                return strInput.replace("000000", ")");
            if (strInput.endsWith("00000"))
                return strInput.replace("00000", "");
            if (strInput.endsWith("00000)"))
                return strInput.replace("00000", ")");
            if (strInput.endsWith("0000"))
                return strInput.replace("0000", "");
            if (strInput.endsWith("0000)"))
                return strInput.replace("0000", ")");
            if (strInput.endsWith("000"))
                return strInput.replace("000", "");
            if (strInput.endsWith("000)"))
                return strInput.replace("000", ")");
            if (strInput.endsWith("00"))
                return strInput.replace("00", "");
            if (strInput.endsWith("00)"))
                return strInput.replace("00", ")");
            if (strInput.endsWith("0)"))
                return strInput.replace("0)", ")");
            if (strInput.endsWith("0")) {
                strInput = strInput.substring(0, strInput.length - 1);
            }
        }
        return strInput;
    } catch (ee) {
        console.error(ee);
    }
    return strInput;
}

//tuong tu voi ham List.FindAll cua C#
//tra ve tat ca cac ban ghi co cung tham so truyen vao
export function findAll(list, callback, uniqueParam) {
    let matches = [];
    let dic = {};
    try {
        if (list == null) return matches;
        if (Array.isArray(list)) {
            let i = 0,
                length = list.length;
            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                try {
                    if (callback == null || callback(list[i])) {
                        if (uniqueParam && list[i][uniqueParam]) {
                            if (dic[list[i][uniqueParam]])
                                continue;
                            else {
                                matches.push(list[i]);
                                dic[list[i][uniqueParam]] = true;
                            }
                        } else
                            matches.push(list[i]);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        } else {
            for (let key in list) {
                try {
                    if (callback == null || callback(list[key])) {
                        if (uniqueParam && list[key][uniqueParam]) {
                            if (dic[list[key][uniqueParam]])
                                continue;
                            else {
                                matches.push(list[key]);
                                dic[list[key][uniqueParam]] = true;
                            }
                        } else
                            matches.push(list[key]);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
    } catch (ex) {
        console.error(ex);
    }
    return matches;
}

export

function toString(input) {
    //do dac diem cua javascript hieu lung tung giua bien string va float nen dung ham nay se chac chan chuyen ve string
    if (!isNaN(input)) return input.toString(); //Neu la so chuyen qua kieu string
    return input; //kieu string roi thi cu the return thoi
}

export

function roundFloat(numberFloat, lenght) {
    try {
        if (numberFloat == null || lenght == null)
            return numberFloat;
        let itenDivison = '1';
        for (let i = 0; i < lenght; i++) {
            itenDivison += '0';
        }
        const division = Number(itenDivison);
        return (Math.round(numberFloat * division) / division).toFixed(lenght);
    } catch (e) {
        console.error(e);
    }
    return 0;
}

//tuong tu voi ham List.FirstOrDefault cua C#
//tra ve ban ghi dau tien hoac null neu ko ton tai
export

function firstOrDefault(list, callback) {
    try {
        if (list == null || list.length === 0) return null;
        if (Array.isArray(list)) {
            let i = 0,
                length = list.length;
            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                try {
                    if (callback(list[i])) {
                        return list[i];
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        } else {
            for (let key in list) {
                try {
                    if (callback(list[key])) {
                        return list[key];
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
    } catch (ex) {
        console.error(ex);
    }
    return null;
}

//ghi nhan 1 ban ghi duy nhat
export

function getDistinctList(arr, uniqueParam) {
    if (arr == null || arr.length <= 0) return arr;
    if (!uniqueParam) return arr;
    let dic = {};
    let list = [];
    let item;
    for (let i = 0; i < arr.length; i++) {
        item = arr[i];
        if (item[uniqueParam]) {
            if (dic[item[uniqueParam]])
                continue;
            else {
                list.push(item);
                dic[item[uniqueParam]] = true;
            }
        }
    }
    return list;
}
export function convertFormatToNumber(stringNumber) {
  //le.bui dung dai ka nao xoa ham nay cua e di nha :(
  try {
      if (isNullOrEmpty(stringNumber)) return 0;
        if (isNaN(stringNumber)) {
            var stringNumberTemp = stringNumber.replace(/,/gi, "");
            if (isNaN(stringNumberTemp)) {
                stringNumberTemp = stringNumberTemp.replace(/\(/gi, ""); //truong hop nay khi string duoc format thanh dang () se la so am nen se cong them dau -
                stringNumberTemp = stringNumberTemp.replace(/\)/gi, "");
                stringNumberTemp = "-" + stringNumberTemp;
                return parseFloat(stringNumberTemp);
            }
            return parseFloat(stringNumberTemp);
        }
        return parseFloat(stringNumber);
  } catch (e) {
      console.error(e);
  }
  return 0;
}
//tra ve object sau khi da clone
export function clone(objData) {
    if (objData == null) return objData;
    return _.clone(objData);
}
//tra ve object sau khi da clone
export function cloneNewAddressMemory(objData) {
    if (objData == null) return objData;
    let stringJson = JSON.stringify(objData);
    return JSON.parse(stringJson);
}

//ghi log cho viec phat trien
export function log(strLog) {
    console.log(strLog);
}
//merge du lieu cua 2 list vao list dau tien
export

function mergeList(first, second) {
    try {
        let len = second.length,
            j = 0,
            i = first.length;
        for (; j < len; j++) {
            first[i++] = second[j];
        }
        first.length = i;
    } catch (e) {
        console.error(e);
    }
    return first;
}

//merge du lieu cua doi tuong options vao defaults, neu ton tai property bi trung thi se lay gia tri cua options
export

function merge(defaults, options) {
    try {
        return _.extend({}, defaults, options);
    } catch (e) {
        console.error(e);
    }
    return defaults;
}

//get json Object key
export

function getKey(objKey) {
    return this.getJsonMsg(objKey);
}

//get Json Msg
export

function getJsonMsg(objKey) {
    return JSON.stringify(objKey);
}

export

function getStompUrl(arr) {
    if (Array.isArray(arr)) {
        const len = arr.length;
        if (len <= 0) return null;
        if (len === 1) return arr[0];
        return arr[Math.floor(Math.random() * len)];
    } else {
        return arr;
    }
}

export

function replaceComma(str) {
    str = str.replace('<sub>', '');
    str = str.replace('</sub>', '');
    str = str.replace('<sup>', '');
    str = str.replace('</sup>', '');
    if (str[str.length - 1] === ',') {
        str = str.substring(0, str.length - 1);
        str += '\r\n';
    }
    return str;
}

export

function fromNetworkMessage(jsonMessage) {
    if (!_.isNull(jsonMessage) && !_.isUndefined(jsonMessage) && jsonMessage !== '') {
        const msg = formatExt(jsonMessage);
        let message = JSON && JSON.parse(msg);
        if (message == null) {
            message = eval('(' + msg + ')');
        }
        return message;
    }
    return null;
}

export

function getJsonObject(obj) {
    if (obj == null || obj === '') {
        return null;
    }
    return JSON && JSON.parse(obj);
}

export

function toNetworkMessage(obj) {
    const json = JSON.stringify(obj);
    const msg = formatExt(json);
    return msg;
}

export

function formatExt(msg) {
    if (byPass)
        return msg;
    if (dicKey == null) {
        dicKey = {};
        const list = '{$type:QuanEdg.MsRqSikrGmo, V=10ClPbcKTWDvL[NIfAh\\F3B25-78w}94OH6UZXY_()/J]x@j&z#%+;!*?\'';
        const len = list.length;
        for (let i = 0; i < len; i++) {
            const ctx = list.charCodeAt(i);
            if (dicKey[ctx]) {
                continue;
            }
            const chx = list[len - i - 1];
            dicKey[ctx] = chx;
            if (dicKey[chx.charCodeAt(0)]) {
                continue;
            }
            dicKey[chx.charCodeAt(0)] = list[i];
        }
    }
    let str = '';
    const len = msg.length;
    for (let i = 0; i < len; i++) {
        if (dicKey[msg.charCodeAt(i)])
            str += dicKey[msg.charCodeAt(i)];
        else
            str += msg[i];
    }
    return str;
}
export function isNullOrEmpty(data) {

    if (_.isNull(data))
        return true;
    if (data==undefined) {
      return true;
    }
    let output = data;
    if (typeof output === 'string') {

    } else {
        output = output.toString();
    }
    output = output.trim();

    return output.length <= 0;
}
export


function StringFormat(format, args) {
    /// <summary>Replaces the format items in a specified String with the text equivalents of the values of   corresponding object instances. The invariant culture will be used to format dates and numbers.</summary>
    /// <param name='format' type='String'>A format string.</param>
    /// <param name='args' parameterArray='true' mayBeNull='true'>The objects to format.</param>
    /// <returns type='String'>A copy of format in which the format items have been replaced by the   string equivalent of the corresponding instances of object arguments.</returns>
    try {
        var value = format;
        var i;
        if (args instanceof Array) {
            for (i = 0; i < args.length; i++) {
                value = value.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
            }
            return value;
        }
        if (arguments == null || arguments.length == null || arguments.length <= 0) return null;
        for (i = 0; i < arguments.length - 1; i++) {
            value = value.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
        }
        return value;
    } catch (ex) {
        console.error(ex);
    }
    return null;
}

export function getRealtimeKey(type) {
    try {
        if (type == null || typeof type != 'string' || type.length <= 0)
            return null;
        //exp: QuantEdge.Entity.Entities.Brand, Entity, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
        var val = type.replace('Version=1.0.0.0, ', ''); //clean '.' char
        //after: QuantEdge.Entity.Entities.Brand, Entity, Culture=neutral, PublicKeyToken=null
        var start = val.lastIndexOf('.') + 1;
        var end = val.indexOf(',');
        //get Entity name = Brand (from last '.' to first ',')
        var entityName = val.substring(start, end);
        return entityName;
    } catch (e) {
        console.error(e);
    }
    return null;
}
