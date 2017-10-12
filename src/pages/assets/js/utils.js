let Base64 = require('js-base64').Base64;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();

    document.cookie = cname + "=" + Base64.encode(escape(cvalue)) + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            var cnameValue = unescape(c.substring(name.length, c.length));
            return Base64.decode(cnameValue);
        }
    }
    return "";
}

function clearCookie(cname) {
    setCookie(cname, "", -1);
}

export default {
    clearCookie(cname) {
        setCookie(cname, "", -1);
    },
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                var cnameValue = unescape(c.substring(name.length, c.length));
                return Base64.decode(cnameValue);
            }
        }
        return "";
    },
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();

        document.cookie = cname + "=" + Base64.encode(escape(cvalue)) + "; " + expires;
    }
}