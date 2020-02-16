// Init
clickInit();

function clickInit() {
    $(".login").click(function () {
        login();
    });
    $(".switchToReg1").click(function () {
        $("#login-form").hide();
        $("#register-form-1").show();
    });
    $(".next").click(function () {
        Reg1();
    });
    $(".register").click(function () {
        Reg2();
    });
    $(".send-phone-captcha").click(function () {
       requestPhoneCaptcha();

    });
}

/*Login*/
function login() {
    let ID = $("#ID").val();
    let Password = $("#Password").val();
    let Captcha = $("#Captcha-input").val();
    if (!(ID && Password && Captcha)) return;
    $.ajax({
        url: "https://api.aiim.ren/Identify.php",
        type: "POST",
        dataType: 'json',
        async: true,
        timeout: 5000,
        data: {
            'type': 'login',
            'ID': ID,
            'password': Password,
            'captcha': Captcha
        },
        success: function (result) {
            const jsons = eval(result);
            resultHandler(jsons);
        },
        error: function () {
            alert("服务器错误");
        }
    });
}


/*Register*/
let NickName, PhoneNum, Email, Password, RePassword;

function Reg1() {
    NickName = $("#nickName").val();
    Email = $("#email").val();
    Password = $("#reg-password").val();
    RePassword = $("#reg-rePassword").val();
    if (Password !== RePassword) {
        alert("两次提交密码不同！");
        return;
    }

    $("#register-form-1").hide();
    $("#register-form-2").show();
}

function requestPhoneCaptcha() {
    let captcha = $("#reg-captcha-input").val();
    PhoneNum = $("#phone").val();
    if (!(captcha && PhoneNum)) {
        alert("请输入手机号和验证码！")
        return;
    }
        $.ajax({
            url: "https://api.aiim.ren/Identify.php",
            type: "POST",
            dataType: 'json',
            async: true,
            timeout: 5000,
            data: {
                'type': 'phoneVerify',
                'nickName': NickName,
                'captcha': captcha,
                'phone': PhoneNum,
            },
            success: function (result) {
                const jsons = eval(result);
                resultHandler(jsons);
            },
            error: function () {
                alert("服务器错误");
            }
        });
}

function Reg2() {
    PhoneNum = $("#phone").val();
    $.ajax({
        url: "https://api.aiim.ren/Identify.php",
        type: "POST",
        dataType: 'json',
        async: true,
        timeout: 5000,
        data: {
            'type': 'register',
            'SMS_Captcha': $("#phone-captcha").val(),
            'phone': PhoneNum,
            'nickName': NickName,
            'password': Password,
            'email': Email,
        },
        success: function (result) {
            const jsons = eval(result);
            resultHandler(jsons);
        },
        error: function () {
            alert("服务器错误");
        }
    });
}