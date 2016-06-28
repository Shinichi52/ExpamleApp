const MessageType = require('./../enum/MessageType');
const RequestType = require('./../enum/RequestType');

//dinh nghia message
export function RealtimeEntity(entity, action, actor, time) {
    this.BaseEntity = entity;
    this.EntityAction = action;
    this.Actor = actor;
    this.LastUpdate = time;
}

export function NetworkStatusBroadcast(isConnected) {
    this.IsConnected = isConnected;
    this.Reason = '';
    this.RetryCount = 0;
}

export function CompressedMessage() {
    this.$type = 'QuantEdge.Message.Common.CompressedMessage, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MainMsgType = '';
    this.MainRequestKey = '';
    this.RawMessage = '';
}

export function PartialMessage() {
    this.$type = 'QuantEdge.Message.Common.PartialMessage, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.Count = 0;
    this.Index = 0;
    this.MainMsgType = '';
    this.MainRequestKey = '';
    this.RawMessage = '';
}

export function PingRequest() {
    this.$type = 'QuantEdge.Message.Request.Authentication.PingRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Authentication;
    this.Ttl = 60;
    this.IsNotPersist = true;
    this.IsRunOnHoliday = true;
    this.UserId = 0;
    this.SessionKey = 0;
}

export function SubscribeEntityRequest(issubscribe, keysubscribe, listentityname) {
    this.$type = 'QuantEdge.Message.Request.Authentication.SubscribeEntityRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Authentication;
    this.IsSubscribe = issubscribe; //subscribe or un subscribe
    this.KeySubscribe = keysubscribe; //Ten form hoac ma form (Co the trung voi truong RequestKey)
    this.ListEntityName = listentityname; //list entity name
}

export function FirstLoginRequest() {
    this.$type = 'QuantEdge.Message.Request.Authentication.FirstLoginRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Authentication;
    this.Ttl = 60;
    this.IsNotPersist = true;
    this.IsRunOnHoliday = true;
    this.UserName = '';
    this.Password = '';
    this.ReceiveTopic = '';
}

export function SecondLoginRequest() {
    this.$type = 'QuantEdge.Message.Request.Authentication.SecondLoginRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Authentication;
    this.Ttl = 60;
    this.IsNotPersist = true;
    this.IsRunOnHoliday = true;
    this.UserName = '';
    this.Password = '';
    this.OtpPass = '';
    this.ReceiveTopic = '';
}

export function UserLogoutRequest() {
    this.$type = 'QuantEdge.Message.Request.Authentication.UserLogoutRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Authentication;
    this.Ttl = 60;
    this.IsNotPersist = true;
    this.IsRunOnHoliday = true;
    this.UserLayout = null;
}

export function GetUserLayoutRequest() {
    this.$type = 'QuantEdge.Message.Request.DataProvider.GetUserLayoutRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.DataProvider;
    this.Ttl = 60;
    this.IsNotPersist = true;
    this.IsRunOnHoliday = true;
    this.IsCustomer = true;
    this.UserId = 0;
}

export function ResendOtpPassRequest() {
    this.$type = 'QuantEdge.Message.Request.User.ResendOtpPassRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.User;
    this.IsRunOnHoliday = true;
    this.UserName = '';
    this.Password = '';
    this.ReceiveTopic = '';
}

export function CreateTerminalEnvironmentRequest() {
    this.$type = 'QuantEdge.Message.Request.Authentication.CreateTerminalEnvironmentRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Authentication;
    this.IsRunOnHoliday = true;
    this.IsNotPersist = true;
}

export function GetListTradingDealRequest(fromTime, toTime, requestType, clientOrderId, listOrderTypeEnum, isRequestAll, listCurrentState,memberId) {
    this.$type = 'QuantEdge.Message.Request.DataProvider.GetListTradingDealRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.DataProvider;
    this.FromTime = fromTime;
    this.ToTime = toTime;
    this.ClientOrderId = clientOrderId;
    this.RequestType = requestType;
    this.ListOrderTypeEnum = listOrderTypeEnum;
    this.ListCurrentState = listCurrentState;
    this.IsRequestAll = isRequestAll;
    this.MemberId=memberId;
}


export function GetListBussinessInfo() {
    this.$type = 'QuantEdge.Message.Request.Margin.GetListBussinessInfoRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Margin;
    this.IsOpenForm = true;
    // this.PartnerId = PartnerId;
}

export function PriceSubscribeRequest(lst, issubscribe) {
    this.$type = 'QuantEdge.Message.Request.Pricing.PriceSubscribeRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Pricing;
    this.IsRunOnHoliday = true;
    this.IsNotPersist = true;
    this.ListSymbolId = lst;
    this.IsSubscribe = issubscribe;
}
export function GetListSymbolRequest() {
    this.$type = 'QuantEdge.Message.Request.Dealing.GetListSymbolRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Dealing;
    this.Target = RequestType.GetListActive;
    this.IsCustomer = true;
}
export function UpdateUserInfoRequest(userInfo, requestType) {
    this.$type = 'QuantEdge.Message.Request.User.UpdateUserInfoRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.User;
    this.IsRunOnHoliday = true;
    this.IsNotPersist = true;
    this.UserInfo = userInfo;
    this.RequestType = requestType;
}
export function GetListMemberSymbolMappingRequest( requestType) {
    this.$type = 'QuantEdge.Message.Request.DataProvider.GetListMemberSymbolMappingRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Dealing;
    this.RequestType = requestType;
}
export function UpdateUserLayoutRequest(userlayout) {
    this.$type = 'QuantEdge.Message.Request.Authentication.UpdateUserLayoutRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Authentication;
    this.IsRunOnHoliday = true;
    this.IsNotPersist = true;
    this.UserLayout = userlayout;
}

export function NewOrderSingleRequest(newOrderSingleObject) {
    this.$type = 'QuantEdge.Message.Request.PreTrade.NewOrderSingleRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.PreTrade;
    this.IsRunOnHoliday = true;
    this.IsNotPersist = true;
    this.NewOrderSingleObject = newOrderSingleObject;
}
export function GetListAccountRequest(memberId,requestType) {
    this.$type = 'QuantEdge.Message.Request.Risk.GetListAccountRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.Risk;
    this.IsRunOnHoliday = true;
    this.IsNotPersist = true;
    this.MemberId = memberId;
    this.Target = requestType;
}
export function CancelOrderRequest(tradingDeal) {
    this.$type = 'QuantEdge.Message.Request.PreTrade.CancelOrderRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.PreTrade;
    this.IsRunOnHoliday = true;
    this.IsNotPersist = true;
    this.TradingDeal = tradingDeal;
}
export function UpdateOrderRequest(tradingDeal) {
    this.$type = 'QuantEdge.Message.Request.PreTrade.UpdateOrderRequest, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    this.MessageType = MessageType.PreTrade;
    this.IsRunOnHoliday = true;
    this.IsNotPersist = true;
    this.TradingDeal = tradingDeal;
}
//dinh nghia message khac
