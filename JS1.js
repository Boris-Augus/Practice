/**
 * Created by Augus on 2017/5/31.
 */
function f1() {
    var olis = document.getElementsByTagName("li");
    var oDl = document.getElementsByTagName("dl");
    for (var i = 0; i < olis.length; i++) {

        olis[i].onmouseover = function () {

            for (var j = 0; j < oDl.length; j++) {
                oDl[j].style.display = "none";
            }
            ;

            var dl = this.getElementsByTagName("dl");
            if (dl.length > 0) {
                dl[0].style.display = "block";
            }
        };

        olis[i].onmouseout = function () {

            for (var j = 0; j < oDl.length; j++) {
                oDl[j].style.display = "none";
            }
            ;

        };
    }
    ;
}

window.onload = function () {
    f1();
    f2();
    f3();
}


function f2() {
    var omain = document.getElementById("main");
    var obox1 = document.getElementById("box1");
    var obox2 = document.getElementById("box2");
    var timers = 100;
    omain.scrollTop =10;
    obox2.innerHTML = obox1.innerHTML;
    function scrollUp() {
        if (omain.scrollTop >= con1.scrollHeight) {
            omain.scrollTop = 0;
        } else {
            omain.scrollTop++;
        }
    }

    /*var myScroll = setInterval("scrollUp()", timers);
    omain.onmouseover = function () {
        clearInterval(myScroll);
    }
    omain.onmouseout = function () {
        myScroll = setInterval("scrollUp()", timers);
    }*/
}
function f3() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 5;
    var animated = false;
    var interval = 3000;
    var timer;


    function animate(offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 10;
        var speed = offset / (time / inteval);
        var left = parseInt(list.style.left) + offset;

        var go = function () {
            if ((speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else {
                list.style.left = left + 'px';
                if (left > -200) {
                    list.style.left = -600 * len + 'px';
                }
                if (left < (-600 * len)) {
                    list.style.left = '-600px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

    function play() {
        timer = setTimeout(function () {
            next.onclick();
            play();
        }, interval);
    }

    function stop() {
        clearTimeout(timer);
    }

    next.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 5) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-600);
        showButton();
    }
    prev.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 5;
        }
        else {
            index -= 1;
        }
        animate(600);
        showButton();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (animated) {
                return;
            }
            if (this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -600 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();


}



