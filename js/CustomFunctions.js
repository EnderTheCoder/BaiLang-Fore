function resultHandler(result) {
    switch (result['action']) {
        case 'alert':
            alert(result['msg']);
            break;
        case 'jump':
            if (result['msg'] != null)
                alert(result['msg']);
            window.location.href = result['value'];
    }
}

(function ($) {
    $.getUrlParam = function (name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);