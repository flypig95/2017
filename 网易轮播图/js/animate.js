/**
 * Created by chencong on 2017/8/2.
 */
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;
        var current = 0;
        for (var k in json) {
            if (k == "opacity") {
                current = parseInt(getStyle(obj, k) * 100) || 0; //ie,6,7,8 中不支持opacity，返回值为undefined，所以解决方案是，将current 取 0.
            } else {
                current = parseInt(getStyle(obj, k));
            }

            var step = (json[k] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            if (k == "opacity") //判断改变的属性里是否有opacity
            {
                if ("opacity" in obj.style) //判断浏览器是否支持opacity属性
                {
                    obj.style.opacity = (current + step) / 100;
                } else //IE6,7,8 透明度的写法
                {
                    obj.style.filter = "alpha(opacity = " + (current + step) * 10 + ")";
                }
            } else if (k == "zIndex") {
                obj.style[k] = json[k];
            } else {
                obj.style[k] = current + step + "px";
            }


            if (current != json[k]) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 20);


}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}