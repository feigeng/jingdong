
(function(){

    //左右移动，下方滑出
    let sWiperTop = (function(){
        let site = document.getElementById('site-header');
        let navContent = document.getElementById('nav-content');
        let lis = site.getElementsByTagName('li');
        let logo = site.getElementsByClassName('header-logo')[0];
        let title = site.getElementsByClassName('header-title')[0];
        let url = 'data/nav-content.json';
        let headerNav = site.getElementsByClassName('header-nav')[0];

        let swiper = function(){
            let bubble = [lis[8],lis[9]];
            // 事件委托的对象 headerNav  遍历内容 navContent  阻止冒泡的对象 lis 接口地址 url
           let slide =  new Swip(url,headerNav,navContent,bubble);

           //添加订阅
           let navOut = function(ele){
               ele.parentNode.style.display = 'none';
           };
           slide.add(navOut);
        };

        return {
            init:function(){
                swiper();
            }
        }
    })();
    sWiperTop.init();

    //左侧菜单
    let navMenu = (function(){

        let slideLeft = document.getElementById('slideLeft');
        let slideMes = document.getElementById('slideMes');

        let queryData = function queryData() {
            return new Promise(resolve => {
                let xhr = new XMLHttpRequest;
                xhr.open('get','data/nav-menu.json',true);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
                xhr.send(null);
            });

        }

        //绑定数据
        let bindHTML = function bindHTML(result){

            for (let t=0;t<result.length;t++){

                //移入显示对应数据
                slideLeft.addEventListener('mouseover',function(ev){
                    slideMes.style.display = 'block';
                    let target = ev.target;
                    let value =  target.innerText.replace(/\s/g, "");
                    let val = result[t][value];

                    if(val !== undefined){

                        let length = 0;
                        if (val.length % 6 === 0) {
                            length = val.length / 6;
                        } else {
                            length = Math.ceil(val.length / 6)
                        }

                        let lisStr = ``;
                        for (let i = 0; i < length; i++) {
                            lisStr += `<ul>`;
                            for (let j = i * 6; j <= val.length ; j++) {
                                if (val[j]) {
                                    lisStr += `<li>
                                                    <div>
                                                        <img src="image/${val[j].img}" alt="">
                                                    </div>
                                                    <span>${val[j].series}</span>
                                                </li>`;
                                }
                            }
                            lisStr += `</ul>`;
                        }

                        slideMes.innerHTML = lisStr;

                    }
                });

                slideLeft.addEventListener('mouseout',function(){
                    slideMes.style.display = 'none';
                });
            }
        };

        return {
            init:function(){
                let promise = queryData();
                promise.then(bindHTML);

            }
        }
    })();

    navMenu.init();

    let mySwiper = (function(){
        return {
            init:function(){
                let mySwiper = new Swiper('.swiper-container', {
                    autoplay:2000,
                    loop: true,
                    pagination : '.swiper-pagination',
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    paginationClickable :true,

                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            }
        }
    })();

    mySwiper.init();

    let content = (function(){
        let slideAni = document.getElementById('slideAni');
        let ul = slideAni.getElementsByTagName('ul')[0];
        let contentNav = document.getElementById('contentNav');
        let iconZuo = contentNav.getElementsByClassName('icon-zuoyou')[0];
        let iconyou = contentNav.getElementsByClassName('icon-zuoyou1')[0];
        let date = document.getElementById('date');
        let box = date.getElementsByClassName('box');

        let contentRight = document.getElementsByClassName('contentRight')[0];
        let contentLeft = document.getElementById('contentLeft').getElementsByTagName('p')[0];

        //搜索
        let headerSearch = document.getElementById('header-search');
        let siteHeader = document.getElementById('site-header');
        let navSearch = siteHeader.getElementsByClassName('nav-search')[0];

        let queryData = function queryData(url) {
            return new Promise(resolve => {
                let xhr = new XMLHttpRequest;
                xhr.open('get',url,true);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
                xhr.send(null);
            });
        }

        let bindHTML = function(result){
            let str = ``;
            for(let i=0;i<result.length;i++){
                str += `<li>
                            <p>${result[i].flag}</p>
                            <p><img src="image/${result[i].img}" alt=""></p>
                            <p>${result[i].name}</p>
                            <p>${result[i].describe}</p>
                            <p>
                                <span>${result[i].price}</span>&nbsp;<span>元</span>&nbsp;&nbsp;<span>${result[i].price}</span><span>元</span>
                            </p>
                        </li>`;
            }

            ul.innerHTML = str;

            return result;
        }

        let slideImg = function(result){

            let step = 0;
            iconZuo.onclick = function(ev){
                step ++;
                if(step>=2){
                    this.onclick = null
                }
                animate(slideAni,{left:-960*step},1000);
            }

            iconyou.onclick = function(ev){
                step --;
                if(step<=0){
                    this.onclick = null
                }
                animate(slideAni,{left:960*step},1000);
            }
        }

        let search = function(){

            headerSearch.addEventListener('mouseover',function(ev){

                let input = this.children[0];
                let i = this.children[1];

                input.style.border = '1px solid rgb(179 175 169)';
                i.style.border = '1px solid rgb(179 175 169)';
                navSearch.style.border = '1px solid rgb(179 175 169)';

                input.onfocus = function(){
                    navSearch.style.display = 'block';
                    navSearch.onmouseover = function(ev){
                        ev.target.style.background = '#e0e0e0';
                    }

                    navSearch.onmouseout = function(ev){
                        ev.target.style.background = '#fff';
                    }
                }

                input.onblur = function(){
                    navSearch.style.display = 'none';
                }

                headerSearch.addEventListener('mouseout',function(ev){
                    input.style.border = '1px solid #e0e0e0';
                    i.style.border = '1px solid  #e0e0e0';
                    navSearch.style.border = '1px solid  #e0e0e0';
                })
            })

        }

        let lastTimes = ()=>{

            let time = '2018/10/11 18:00:00';
            contentLeft.innerHTML = time;

            let date = document.getElementById('date');
                autoTimer = null,
                _serverTime = null;

            //=>从服务器获取时间（获取响应头中的时间信息即可）
            let queryTime = function queryTime() {
                if (_serverTime) {
                    _serverTime = new Date(_serverTime.getTime() + 1000);
                    return _serverTime;
                }

                return new Promise(resolve => {
                    let xhr = new XMLHttpRequest(),
                        serverTime = null;
                    xhr.open('HEAD', 'data/head_content.json');
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 2) {
                            serverTime = new Date(xhr.getResponseHeader('date'));
                            _serverTime = serverTime;
                            resolve(serverTime);
                        }
                    };
                    xhr.send(null);
                });
            };

            let computedTime = function computedTime() {

                let promise = queryTime();
                promise instanceof Promise ? promise.then(fn) : fn(promise);

                function fn(serverTime) {
                    let nowTime = serverTime,
                        tarTime = new Date('2018/10/11 18:00:00'),
                        diffTime = tarTime - nowTime;

                    if (diffTime >= 0) {
                        let hours = Math.floor(diffTime / (1000 * 60 * 60));
                        diffTime = diffTime - hours * 3600000;
                        let minutes = Math.floor(diffTime / (1000 * 60));
                        diffTime = diffTime - minutes * 60000;
                        let seconds = Math.floor(diffTime / 1000);

                        hours < 10 ? hours = '0' + hours : null;
                        minutes < 10 ? minutes = '0' + minutes : null;
                        seconds < 10 ? seconds = '0' + seconds : null;

                        date.innerHTML = `
                                    <span class="box">${hours}</span>
                                    <span class="dosh">:</span>
                                    <span class="box">${minutes}</span>
                                    <span class="dosh">:</span>
                                    <span class="box">${seconds}</span>`;
                        return;
                    }

                    //=>已经到达抢购的时间了
                    date.innerHTML = `<span class="box">--</span>
                                    <span class="dosh">:</span>
                                    <span class="box">--</span>
                                    <span class="dosh">:</span>
                                    <span class="box">--</span>`;
                    clearInterval(autoTimer);
                }
            };

            computedTime();
            autoTimer = setInterval(computedTime, 1000);

        }

        return {
            init:function(){

                //右侧跑马灯
                let url = 'data/slide-content.json';
                let promise = queryData(url);
                promise.then(bindHTML).then(slideImg);

                //倒计时
                lastTimes();

                //搜索
                search();

            }
        }
    })();

    content.init();

})();
