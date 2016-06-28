var I18n = require('react-native-i18n');
// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;
var deviceLocale = I18n.locale;
// SET DEAFULT
//
// I18n.defaultLocale = "pt-BR";
// I18n.locale = "pt-BR";
// I18n.currentLocale();

I18n.translations.vi= {
    greeting: 'Xin Chào!',
    username: 'Tên Đăng Nhập',
    password: 'Mật Khẩu',
    register : 'Đăng Ký',
    email:'Email',
    Code: 'Mã',
    Side: 'Mua/Bán',
    Size: 'cỡ',
    LimitPrice: 'Giá giới hạn',
    StopPrice: 'Giá dừng',
    UpdateState: 'Cập nhập trạng thái',
    signin:'Đăng nhập',
    resetPassword:'Lấy lại mật khẩu',
    logout: 'Đăng xuất',
    navigateToSubView: 'Dịch hộ e phát =))',
    sell: "Bán",
    buy: 'Mua',
    markertOrder: '',
    limitOrder:'',
    stopOrder: '',
    stopLimitOrder : '',
    GoodTillCancelled:'',
    modifyOrder:'',
    cancelOrder:'',
    error_Username: 'Must have 6-12 characters and/or numbers',
    error_Email: 'Please enter valid email',
    updateProfile: 'Update Profile',
    emailVerified: 'Email verified (display only)',
    subview: "Subview",
    back:"Back",
    instruments:'BẢNG GIÁ',
    LimitType:'GIỚI HẠN',
    AddCode:'GIỚI HẠN',
    SearchInputText:'Tim Kiem Ma / Ten',
    AddUpper:'THEM',
    ReduceUpper:'BOT',
    'BuyUpper':'MUA',
    'SellUpper':'BÁN',
    NewOrderLimitAlert:'{0} {1} / {2} @ LMT {3}',
    NewOrderStopLimitAlert:'{0} {1} / {2} @ LMT {3} / STP {4}',
    NewOrderMarketAlert:'{0} {1} / MKT {2} @ MARKET',
    NewOrderStopAlert:'{0} {1} / {2} @ STP {3}',
    CreateNewOrderSuccess:'Đặt thành công giao dịch',
    DoYouWantCancelOrder:'Bạn có muốn hủy lệnh ?',
    ModifyOrderTextContent:'MODIFY {0} / {1} {2} @ {3}',
}
