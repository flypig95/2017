window.onload = function() {
    function $(id) {
        return document.getElementById(id);
    }
    var slider_main = $("slider_main");
    var slider_ctrl = $("slider_ctrl");
    var js_slider = $("js_slider");
    var w_slider = $("w_slider");
    var imgs = slider_main.children;
    //创建span
    for (var i = 0; i < imgs.length; i++) {
        var spans = document.createElement("span");
        spans.className = "slider-ctrl-con";
        spans.innerHTML = imgs.length - i;
        slider_ctrl.insertBefore(spans, slider_ctrl.children[1]);
    }

    //设置当前span
    var spans = slider_ctrl.children;
    spans[1].setAttribute("class", "slider-ctrl-con current");

    //将除1外其余的图片移到右边去
    var scrollWidth = js_slider.offsetWidth;
    for (var i = 1; i < imgs.length; i++) {
        imgs[i].style.left = scrollWidth + "px";
    }


    //遍历三个按钮
    var iNow = 0;
    for (var k in spans) //k为索引号，spans是8个按钮
    {
        spans[k].onclick = function() {
            if (this.className == "slider-ctrl-prev") {
                animate(imgs[iNow], {
                    left: scrollWidth
                });
                --iNow < 0 ? iNow = imgs.length - 1 : iNow;
                imgs[iNow].style.left = -scrollWidth + "px";
                animate(imgs[iNow], {
                    left: 0
                });
                setSquare();
            } else if (this.className == "slider-ctrl-last") {
                autoPlay();
            } else {
                var that = this.innerHTML - 1;
                if (that > iNow) {
                    animate(imgs[iNow], {
                        left: -scrollWidth
                    });
                    imgs[that].style.left = scrollWidth + "px";
                } else if (that < iNow) {
                    animate(imgs[iNow], {
                        left: scrollWidth
                    });
                    imgs[that].style.left = -scrollWidth + "px";
                }
                iNow = that;
                animate(imgs[iNow], {
                    left: 0
                });
                setSquare();
            }
        }
    }

    function setSquare() {
        for (var i = 1; i < spans.length - 1; i++) {
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow + 1].className = "slider-ctrl-con current";
    }

    var timer = null;
    timer = setInterval(autoPlay, 2000);

    function autoPlay() {
        animate(imgs[iNow], {
            left: -scrollWidth
        });
        ++iNow > imgs.length - 1 ? iNow = 0 : iNow;
        imgs[iNow].style.left = scrollWidth + "px";
        animate(imgs[iNow], {
            left: 0
        });
        setSquare();
    }
    w_slider.onmouseover = function() {
        clearInterval(timer);
    }
    w_slider.onmouseout = function() {
        clearInterval(timer);
        timer = setInterval(autoPlay, 2000);
    }

}