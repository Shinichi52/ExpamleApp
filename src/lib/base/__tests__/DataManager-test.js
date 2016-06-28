'use strict';

jest.autoMockOff();

const Global = require('./../../enum/Global');
var DataManager = require('../DataManager').default;
const MsgBroadcast = require('./../../enum/MsgBroadcast');
const RealtimeKey = require('./../../enum/RealtimeKey');
var NetworkManager = require('../NetworkManager').default;
const MsgEntity = require('./../../enum/MsgEntity');
const MsgResponse = require('./../../enum/MsgResponse');
if (!Global.NetworkManager)
    Global.NetworkManager = new NetworkManager();

var obj = new NetworkManager();


describe('DataManager', () => {
    var obj = new DataManager();
    it('contructor default', () => {
        expect(obj).not.toBeNull();
    });

    var obj = new DataManager();
    it('regisResponseHandler', () => {
        expect(obj.regisResponseHandler(function() {}, true)).not.toBeNull();
    });
    it('clearReciveDataDic', () => {
        expect(obj.clearReciveDataDic()).not.toBeNull();
    });

    it('processReceiveMsg With MsgBroadcast = UpdateEntityBroadcast', () => {
        let objectData = {
            $type: MsgBroadcast.UpdateEntityBroadcast,
            ListEntityChanged : [{
                BaseEntity: {
                    $type: ''
                },
                EntityAction: ''
            }]
        };
        expect(obj.processReceiveMsg(objectData)).not.toBeNull();
    });

    it('processReceiveMsg With MsgBroadcast = mem', () => {
        let objectData = {
            RequestKey: 'mem121312312312332132131212312312312321',
        };
        expect(obj.processReceiveMsg(objectData)).not.toBeNull();
    });

    it('processReceiveMsg With MsgBroadcast = req', () => {
        let objectData = {
            RequestKey: 'req321321321312312312232132131232321312312',
        };
        expect(obj.processReceiveMsg(objectData)).not.toBeNull();
    });

    it('processReceiveMsg With MsgBroadcast = mem', () => {
        let objectData = {
            RequestKey: 'req',
        };
        expect(obj.processReceiveMsg(objectData)).not.toBeNull();
    });

    it('processReceiveMsg With MsgBroadcast = broadcast', () => {
        let objectData = {
            RequestKey: 'broadcast8093489032849083290483920',
        };
        expect(obj.processReceiveMsg(objectData)).not.toBeNull();
    });

    it('processReceiveMsg With MsgBroadcast = broadcast', () => {
        let objectData = {
            RequestKey: 'broadcast8093489032849083290483920',
        };
        expect(obj.processReceiveMsg(objectData)).not.toBeNull();
    });
    it('processReceiveMsg With objectData = null', () => {
        expect(obj.processReceiveMsg(null)).not.toBeNull();
    });
    it('regisRealtimeHandler requestKey= null', () => {
        expect(obj.regisRealtimeHandler(null,function () {
        })).not.toBeNull();
    });


    it('regisRealtimeHandler requestKey = RealtimeKey.UserLogin 1', () => {
        expect(obj.regisRealtimeHandler(RealtimeKey.UserLogin,function () {
        })).not.toBeNull();
    });
    it('regisRealtimeHandler requestKey = RealtimeKey.UserLogin 2', () => {
        expect(obj.regisRealtimeHandler(RealtimeKey.UserLogin,function () {
        })).not.toBeNull();
    });

    it('regisRealtimeHandler requestKey = Array', () => {
        expect(obj.regisRealtimeHandler([RealtimeKey.UserLogin,RealtimeKey.BasinInfo],function () {
        })).not.toBeNull();
    });
    it('regisFunction requestKey 1', () => {
        expect(obj.regisFunction(RealtimeKey.BasinInfo,function () {
        })).not.toBeNull();
    });
    it('regisFunction requestKey 2', () => {
        expect(obj.regisFunction(RealtimeKey.BasinInfo,function () {
        })).not.toBeNull();
    });
    it('unregisFunction', () => {
        expect(obj.unregisFunction(RealtimeKey.BasinInfo,function () {
        })).not.toBeNull();
    });
    it('regisListDataRealtimeHandler', () => {
        expect(obj.regisListDataRealtimeHandler(RealtimeKey.BasinInfo,function () {
        })).not.toBeNull();
    });

    it('unregisListDataRealtimeHandler', () => {
        expect(obj.unregisListDataRealtimeHandler(RealtimeKey.BasinInfo,function () {
        })).not.toBeNull();
    });

    it('regisListDataRealtimeHandler requestKey = Array', () => {
        expect(obj.regisListDataRealtimeHandler([RealtimeKey.UserLogin,RealtimeKey.BasinInfo],function () {
        })).not.toBeNull();
    });

    it('unregisListDataRealtimeHandler requestKey = Array', () => {
        expect(obj.unregisListDataRealtimeHandler([RealtimeKey.UserLogin,RealtimeKey.BasinInfo],function () {
        })).not.toBeNull();
    });

    it('regisBroadcastHandler requestKey 1', () => {
        expect(obj.regisBroadcastHandler(RealtimeKey.UserLogin,function () {
        })).not.toBeNull();
    });
    it('regisBroadcastHandler requestKey 2', () => {
        expect(obj.regisBroadcastHandler(RealtimeKey.UserLogin,function () {
        })).not.toBeNull();
    });
    it('processResponse', () => {
      let key=obj.getRequestKey(true);
        expect(obj.processResponse(key,{})).not.toBeNull();
    });
    it('reProcessResponse', () => {
      let key=obj.getRequestKey(true);
        expect(obj.reProcessResponse(key,{})).not.toBeNull();
    });
    it('unregisBroadcastHandler', () => {
        expect(obj.unregisBroadcastHandler(RealtimeKey.UserLogin,function () {
        })).not.toBeNull();
    });
    it('processRealtime', () => {
      obj.regisListDataRealtimeHandler([RealtimeKey.UserLogin,RealtimeKey.BasinInfo],function () {
      });
        expect(obj.processRealtime(RealtimeKey.UserLogin,{a:'a'})).not.toBeNull();
    });
    it('processListDataRealtime', () => {
      obj.regisFunction(RealtimeKey.BasinInfo,function () {
      });
        expect(obj.processListDataRealtime([{data:'data'}],RealtimeKey.BasinInfo)).not.toBeNull();
    });
    it('processBroadcast requestKey=null', () => {
        expect(obj.processBroadcast(null,{a:'a'})).not.toBeNull();
    });
    it('processBroadcast requestKey=null', () => {

      obj.regisBroadcastHandler('key',function () {

      });
        expect(obj.processBroadcast('key',{a:'a'})).not.toBeNull();
    });
    it('getRequestKey', () => {
        expect(obj.getRequestKey(true)).not.toBeNull();
    });
    it('updateMemmoryBroadcast type = ClientEnvironmentReadyBroadcast', () => {
      let objectData={
        $type:MsgBroadcast.ClientEnvironmentReadyBroadcast,
        TimeServer:'TimeServer'
      };
        expect(obj.updateMemmoryBroadcast(objectData)).not.toBeNull();
    });
    it('updateMemmoryBroadcast type = UpdateServerTimeBroadcast', () => {
      let objectData={
        $type:MsgBroadcast.UpdateServerTimeBroadcast,
        TimeServer:'TimeServer'
      };
        expect(obj.updateMemmoryBroadcast(objectData)).not.toBeNull();
    });
    it('updateMemmoryBroadcast type = UpdateServerTimeBroadcast', () => {
      let objectData={
        $type:MsgBroadcast.UpdateCurrentPriceBroadcast,
        TimeServer:'TimeServer'
      };
        expect(obj.updateMemmoryBroadcast(objectData)).not.toBeNull();
    });
    it('updateMemmoryBroadcast type = UpdateCurrentPriceBroadcast', () => {
      let objectData={
        $type:'',
        TimeServer:'TimeServer'
      };
        expect(obj.updateMemmoryBroadcast(objectData)).not.toBeNull();
    });
    it('updateMemmoryBroadcast type = ', () => {
      let objectData={
        $type:'',
        TimeServer:'TimeServer'
      };
        expect(obj.updateMemmoryBroadcast(objectData)).not.toBeNull();
    });
    it('updateMemmoryResponse type = ', () => {
      let objectData={
        $type:MsgResponse.SecondLoginResponse,
        TimeServer:'TimeServer',
        IsSuccess:true
      };
        expect(obj.updateMemmoryResponse(objectData)).not.toBeNull();
    });
    it('updateMemmoryResponse ObjectData Null ', () => {
      let objectData={
        $type:MsgResponse.SecondLoginResponse,
        TimeServer:'TimeServer',
        IsSuccess:true
      };
        expect(obj.updateMemmoryResponse(null)).not.toBeNull();
    });
    it('updateMemmoryResponse $type != SecondLoginResponse', () => {
      let objectData={
        $type:'MsgResponse.SecondLoginResponse',
        TimeServer:'TimeServer',
        IsSuccess:true
      };
        expect(obj.updateMemmoryResponse(objectData)).not.toBeNull();
    });
    it('updateMemmoryEntity BaseEntity null', () => {
      let objectData={
        EntityChanged:{
          BaseEntity:null,
          EntityAction:null
        }
      };
        expect(obj.updateMemmoryEntity(objectData)).not.toBeNull();
    });

    it('updateMemmoryEntity BaseEntity !=null', () => {
      let objectData={
        EntityChanged:{
          BaseEntity:{
            $type:MsgEntity.EmailConfig
          },
          EntityAction:null
        }
      };
        expect(obj.updateMemmoryEntity(objectData)).not.toBeNull();
    });

    it('updateMemmoryEntity BaseEntity !=null', () => {
      let objectData={
        EntityChanged:{
          BaseEntity:{
            $type:''
          },
          EntityAction:null
        }
      };
        expect(obj.updateMemmoryEntity(objectData)).not.toBeNull();
    });
    it('isHistory', () => {
        expect(obj.isHistory(true)).not.toBeNull();
    });
    it('processProadcastDone', () => {
        expect(obj.processProadcastDone('','')).not.toBeNull();
    });

});
