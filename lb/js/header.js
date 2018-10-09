/**
 * Created by Mayday on 2018/9/19.
 */
let little_rice = function () {

    /*头部选项卡*/
    let header = (function () {
        let b_tab = document.getElementById('b_tab');
        let nav = b_tab.getElementsByTagName('a');
        let b_tab1 = document.getElementById('b_tab1');
        let uls = b_tab1.getElementsByTagName('div');
        let button = document.getElementById('b_search2');
        let box = document.getElementById('b_tab2');
        let data = null;

        function ajax() {
            let xhr = new XMLHttpRequest();
            xhr.open('get', 'header_0.json', false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    data = JSON.parse(xhr.responseText);
                    bindHtml()
                }
            };
            xhr.send();
        }

        function bindHtml() {
            let sur = ``, lis = ``;
            data.forEach(function (item) {
                sur += `<a href="javascript:;">${item.title}</a>`;
                lis += `<div><ul>`;
                for (let i = 0; i < item.value.length; i++) {
                    let cur = item.value[i];
                    lis += `<li>
                          <a href="javascript:;"><img src="img/${cur.img}" alt=""></a>
                          <p>${cur.pag}</p>
                          <span>${cur.money}</span>
                          </li>`;
                }
                lis += `</ul></div>`;
            });
            b_tab.innerHTML = sur;
            b_tab1.innerHTML = lis;
            var aa = '';
            for (let i = 0; i < nav.length; i++) {
                nav[i].index = i;
                nav[i].addEventListener('mouseover', function () {
                    uls[i].style.display = 'none';
                    uls[this.index].style.display = 'block';
                    aa = this.index;
                });
                nav[i].addEventListener('mouseout', () => {
                    uls[i].style.display = 'none'
                });
                b_tab1.addEventListener('mouseover', function () {
                    if (aa) {
                        uls[aa].style.display = 'block';
                    }
                });
                b_tab1.addEventListener('mouseout', function () {
                    uls[i].style.display = 'none';
                })
            }
        }

        return {
            init: function () {
                ajax();
                /*点击盒子显示*/
                button.onfocus = function () {
                    box.style.display = 'block';
                    box.onmouseenter = function () {
                        button.onblur = null;
                    };
                    box.onclick = function () {
                        box.style.display = 'none';
                    }
                };
                box.onmouseleave = function () {
                    button.onblur = function () {
                        box.style.display = 'none';
                    }
                }
            }
        }
    })();

    /*中部轮播图*/
    let boradR = (function () {
        let box = document.getElementById('c_broad');
        let swiper = document.getElementById('c_imgs');
        let focus = document.getElementById('c_uls');
        let imgs = swiper.getElementsByTagName('img');
        let lis = focus.getElementsByTagName('li');
        let left = box.getElementsByTagName('a')[0];
        let right = box.getElementsByTagName('a')[1];
        let data = null;
        let timer = null;
        let step = 0;

        function ajax() {
            let xhr = new XMLHttpRequest();
            xhr.open('get', 'broad.json', false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    data = JSON.parse(xhr.responseText);
                }
            };
            xhr.send();
        }

        //插入图片
        function bindHtml() {
            let imgStr = ``, lisStr = ``;
            for (let i = 0; i < data.length; i++) {
                imgStr += `<div><img data-src="img/${data[i].img}" alt=""></div>`;
                lisStr += `<li class="${i === 0 ? 'selected' : ''}"></li>`
            }
            imgStr += `<div><img data-src="img/${data[0].img}" alt=""></div>`;
            swiper.innerHTML = imgStr;
            focus.innerHTML = lisStr;
            $(swiper).width(1200.17 * (data.length + 1));
            lazyImg()
        }

        //加载图片
        function lazyImg() {
            for (let i = 0; i < imgs.length; i++) {
                let cur = imgs[i];
                let newImg = new Image;
                let url = cur.getAttribute('data-src');
                newImg.src = url;
                newImg.onload = function () {
                    cur.src = this.src;
                    newImg = null;
                }
            }
        }

        //图片轮播
        function auto() {
            timer = setInterval(autoMove, 2000)
        }

        function autoMove() {
            if (step >= data.length) {
                step = 0;
                $(swiper).css('left', 0)
            }
            step++;
            $(swiper).css('left', -1200.17 * step);
            lisMove();
        }

        //小圆点跟随
        function lisMove() {
            for (let i = 0; i < lis.length; i++) {
                if (step === i) {
                    lis[i].classList.add('selected')
                } else {
                    lis[i].classList.remove('selected')
                }
                if (step === data.length) {
                    lis[0].classList.add('selected')
                }
            }
        }

        //移入停止
        function mouseMove() {
            box.onmouseover = function () {
                clearInterval(timer)
            };
            box.onmouseout = function () {
                timer = setInterval(autoMove, 2000)
            }
        }

        //点击小圆点
        function click1() {
            for (let i = 0; i < lis.length; i++) {
                lis[i].onclick = function () {
                    step = i - 1;
                    autoMove();
                }
            }
        }

        //点击左右按钮
        function click2() {
            right.onclick = function () {
                autoMove();
            };
            left.onclick = function () {
                if (step <= 0) {
                    step = data.length;
                    $(swiper).css('left', -1200.17 * step)
                }
                step--;
                $(swiper).css('left', -1200.17 * step);
                lisMove();
            }
        }

        return {
            init1: function () {
                ajax();
                bindHtml();
                auto();
                mouseMove();
                click1();
                click2();
            }
        }
    })();

    /*轮播图左边选项卡*/
    let boradL = (function () {
        let lis = document.getElementsByClassName('d_lis');
        let divs = document.getElementsByClassName('d_divs');
        let data = null;

        function ajax() {
            let xhr = new XMLHttpRequest();
            xhr.open('get', 'broad1.json', false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    data = JSON.parse(xhr.responseText);
                    bindHtml()
                }
            };
            xhr.send();
        }

        function bindHtml() {
            data.forEach(function (item, index) {
                let lisStr = ``;
                let value = item.value;
                let length = 0;
                if (value.length % 6 === 0) {
                    length = value.length / 6;
                } else {
                    length = Math.ceil(value.length / 6)
                }
                for (let i = 0; i < length; i++) {
                    lisStr += `<ul>`;
                    for (let j = i * 6; j <= (1 + i) * 6 - 1; j++) {
                        if (value[j]) {
                            lisStr += `<li><a href="javascript:;">
                                   <img src="img/${value[j].img}" alt="">
                                   <span>${value[j].pag}</span>
                                   </a></li>`;
                        }
                    }
                    lisStr += `</ul>`;
                }
                divs[index].innerHTML = lisStr;
            });
        }

        function navS() {
            for (let i = 0; i < lis.length; i++) {
                lis[i].index = i;
                lis[i].onmouseover = function () {
                    divs[i].style.display = 'none';
                    divs[this.index].style.display = 'block'
                };
                lis[i].onmouseout = function () {
                    divs[i].style.display = 'none';
                }
            }
        }

        return {
            init2: function () {
                ajax();
                navS();
            }
        }
    })();

    /*倒计时抢购  轮播图*/
    !(function () {
        let box = document.getElementById('f_time');
        let left = document.getElementById('e_shopLeft');
        let right = document.getElementById('e_shopRight');
        let box1 = document.getElementById('f_boxR1');
        /*定时器*/
        function lastTime(time) {
            // 现在的时间
            var date = new Date().getTime();
            // 计算时间差 => 终点的时间-现在的时间
            var targetTime = new Date(time) - date;
            // targetTime =>
            // 日期
            var day = Math.floor(targetTime / (1000 * 60 * 60 * 24));//4.2
            // 3.1 =>3  3.9 => 3
            var hour = Math.floor(targetTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));//0.2
            var minute = Math.floor(targetTime % (1000 * 60 * 60 * 24) % (1000 * 60 * 60) / (1000 * 60));//0.2
            var second = Math.floor(targetTime % (1000 * 60 * 60 * 24) % (1000 * 60 * 60) % (1000 * 60) / 1000);

            box.innerHTML = `<div class="f_time1">${hour}</div>
                <div class="f_time2">:</div>
                <div class="f_time1">${minute}</div>
                <div class="f_time2">:</div>
                <div class="f_time1">${second}</div>`
        }

        setInterval(function () {
            lastTime('2019-10-30 20:00:00');
        }, 1000);

        /*轮播图*/
        left.onclick = function () {
            box1.style.left = 0 + 'px';
        };
        right.onclick = function () {
            box1.style.left = -1000.17 + 'px';
        };

    })();

    header.init();
    boradR.init1();
    boradL.init2();
};