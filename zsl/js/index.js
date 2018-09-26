//header 选项卡
let header = document.getElementById('header');
let lis = header.getElementsByTagName('li');
let ulbox = header.getElementsByClassName('ulbox');
let time_down = document.getElementById('time_down');



//header选项卡
for (var i = 0; i < lis.length; i++) {
    lis[i].index = i;
    lis[i].onmouseover = function () {
        ulbox[this.index].style.display = 'block'
    };
    lis[i].onmouseout = function () {
        ulbox[this.index].style.display = 'none'
    }
};

//hd切换
let hd_left = document.getElementById('hd_left');
let hd_right = document.getElementById('hd_right');
let hd_ul = document.getElementById('hd_ul');
hd_left.addEventListener('click',function () {
    hd_ul.style.left = 0+'px';
},false);
hd_right.addEventListener('click',function () {
    hd_ul.style.left = -729+'px';
},false);

//为你推荐
let commend_left = document.getElementById('commend_left');
let commend_right = document.getElementById('commend_right');
let commend_ul = document.getElementById('commend_ul');
let step = 0;
commend_left.addEventListener('click',function () {
    step += 1200;
    if(step>=1200){
        step = 0;
        commend_ul.style.left = step+'px';
        commend_left.removeAttribute('a');
    }
    commend_ul.style.left = step+'px';
},false);
commend_right.addEventListener('click',function () {
    step += -1200;
    if(step<=-3600){
        step = -2400;
        commend_ul.style.left = -2400+'px';
        commend_left.removeAttribute('a');
    }
    commend_ul.style.left = step+'px';
},false);




//倒计时


   function lastTime (time){
       // 现在的时间
       var date = new Date().getTime()
       // 计算时间差 => 终点的时间-现在的时间
       var targetTime = new Date(time)-date;
       // targetTime =>
       // 日期
       var day = Math.floor(targetTime/(1000*60*60*24));//4.2
       // 3.1 =>3  3.9 => 3
       var hour = Math.floor(targetTime%(1000*60*60*24)/(1000*60*60));//0.2
       var minute = Math.floor(targetTime%(1000*60*60*24)%(1000*60*60)/(1000*60));//0.2
       var second = Math.floor(targetTime%(1000*60*60*24)%(1000*60*60)%(1000*60)/1000);

       time_down.innerHTML = `<div class="box">${hour}</div>
                <div class="dosh">:</div>
                <div class="box">${minute}</div>
                <div class="dosh">:</div>
                <div class="box">${second}</div>`
   }

   setInterval(function () {
       lastTime('2018-09-30 18:00:00');
   },1000);



// let tabList = {
//
// };
//家电选项卡
let pro2_hd_right = document.getElementById('pro2_hd_right');
let pro2_lis = pro2_hd_right.getElementsByTagName('li');
let pro2_right_box = document.getElementById('pro2_right_box');
let pro2_uls = pro2_right_box.getElementsByTagName('ul');

for (let i = 0; i < pro2_lis.length; i++) {
    pro2_lis[i].index = i;

        pro2_lis[i].onmouseover = function () {
            for (let j = 0; j < pro2_lis.length; j++) {
                pro2_uls[j].style.display = 'none';
            }
            pro2_uls[this.index].style.display = 'block';
        };
}

//header绑定数据
let data = [];
let pro2_data = [];
function ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open('get','data/data.json',false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}
ajax();
function pro2_ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open('get','data/data_pro2.json',false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            pro2_data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}
pro2_ajax();
//热门产品数据
let hot_data = [];
function hot_ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open('get','data/data_news.json',false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            hot_data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}
hot_ajax();




/*
*@fileName:header绑定数据
*@注意:
* 一、先判断点击的元素、身上的自定义标签、是xx、则加载对应的数据
* 二、数据的个数用固定数字6，
* 三、循环遍历对应的数据json、
*/
let xiaomi_phone = document.getElementById('xiaomi_phone');
function BindHtml(ele,num,d) {
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        d[i].xiaoMi.forEach(function (item,index) {
            if(index<num){
                str += `<div class="ulbox-list">
                    <div class="${item.new == '' ? 'ulbox-titleno': 'ulbox-title'}">${item.new}</div>
                   <div class="ulbox-img"><img src="${item.src}"/></div>
                   <p class="ulbox-p">${item.title}</p>
                   <div class="ulbox-price">${item.price}元</div>
                    </div>`
            }

        })
    }
    ele.innerHTML = str;
}
BindHtml(xiaomi_phone,6,data)
BindHtml(hongmi,6,data)
BindHtml(dianshi,6,data)
BindHtml(bijiben,6,data)
BindHtml(kongtiao,6,data)
BindHtml(xinpin,6,data)
BindHtml(luyouqi,6,data)
BindHtml(yingjian,6,data)
BindHtml(fuwu,6,data)
BindHtml(shequ,6,data)



/*
*@fileName:slide导航
*@注意
*/
/*轮播图左边选项卡*/
let boradL = (function () {
    let lis = document.getElementsByClassName('d_lis');
    let divs = document.getElementsByClassName('d_divs');
    let slide_data = null;

    function ajax() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'data/broad1.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                slide_data = JSON.parse(xhr.responseText);
                bindHtml()
            }
        };
        xhr.send();
    }

    function bindHtml() {
        slide_data.forEach(function (item, index) {
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
boradL.init2()










//手机
let pro1_ul = document.getElementById('pro1_ul');
function BindHtml_pro1(ele,num,d) {
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        d[i].xiaoMi.forEach(function (item,index) {
            if(index<num){
                str += ` <li>
                    <div class="top-title">减50元</div>
                    <div class="img"><img src="${item.src}"/></div>
                    <h3 class="title">花花草草监测仪</h3>
                    <p class="p">OLED显示屏幕/激光颗粒</p>
                    <div class="price">
                        <span>1</span>
                        <span>&nbsp;</span>
                        <span>元</span>
                        <span>&nbsp;</span>
                        <del>49元</del>
                    </div>
                </li>`
            }

        })
    }
    ele.innerHTML = str;
}
BindHtml_pro1(pro1_ul,8,data)

//家电
let pro2_ul_1 = document.getElementById('pro2_ul_1');
function BindHtml_pro2(ele,num,d) {
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        d[i].xiaoMi.forEach(function (item,index) {
            if(index<num){
                str += `<li>
                        <div class="top-title">减50元</div>
                        <div class="img"><img src="${item.src}"/></div>
                        <h3 class="title">${item.title}</h3>
                        <p class="p">OLED显示屏幕/激光颗粒</p>
                        <div class="price">
                            <span>${item.price}</span>
                            <span>&nbsp;</span>
                            <span>元</span>
                            <span>&nbsp;</span>
                            <del>5999元</del>
                        </div>
                        <div class="position">
                            <p>评价第二行评价第二行评价第二行评价</p>
                            <p style="color:rgba(255,255,255,0.6)">来自于：xxx的评价</p>
                        </div>
                    </li>`
            }

        })
    }
    ele.innerHTML = str+`<div class="little">
                        <div class="little-img"><img src="img/nav01.png"/></div>
                        <h3 class="little-title">小米净水器小米净水器</h3>
                        <p class="little-price">1799元</p>
                    </div>
                    <div class="little">
                        <div class="little-img"><img src="img/nav01.png"/></div>
                        <h3 class="little-title">小米净水器小米净水器</h3>
                        <p class="little-price">1799元</p>
                    </div>`;
}
BindHtml_pro2(pro2_ul_1,7,data);
BindHtml_pro2(pro2_ul_2,7,pro2_data);
BindHtml_pro2(pro2_ul_3,7,data);
BindHtml_pro2(pro2_ul_4,7,pro2_data);

//配件
let pro3_ul = document.getElementById('pro3_ul');
function BindHtml_pro3(ele,num,d) {
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        d[i].xiaoMi.forEach(function (item,index) {
            if(index<num){
                str += `<li>
                        <div class="top-title">减50元</div>
                        <div class="img"><img src="${item.src}"/></div>
                        <h3 class="title">${item.title}</h3>
                        <p class="p">OLED显示屏幕/激光颗粒</p>
                        <div class="price">
                            <span>${item.price}</span>
                            <span>&nbsp;</span>
                            <span>元</span>
                            <span>&nbsp;</span>
                            <del>5999元</del>
                        </div>
                        <div class="position">
                            <p>评价第二行评价第二行评价第二行评价</p>
                            <p style="color:rgba(255,255,255,0.6)">来自于：xxx的评价</p>
                        </div>
                    </li>`
            }

        })
    }
    ele.innerHTML = str+`<div class="little">
                        <div class="little-img"><img src="img/nav01.png"/></div>
                        <h3 class="little-title">小米净水器小米净水器</h3>
                        <p class="little-price">1799元</p>
                    </div>
                    <div class="little">
                        <div class="little-img"><img src="img/nav01.png"/></div>
                        <h3 class="little-title">小米净水器小米净水器</h3>
                        <p class="little-price">1799元</p>
                    </div>`;
}
BindHtml_pro3(pro3_ul,7,pro2_data);
//闪购
function BindHtml_buy(ele,num,d) {
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        d[i].xiaoMi.forEach(function (item,index) {
            if(index<num){
                str += `<li>
                    <div class="${item.new == '' ? 'buy-swiper-titleno': 'buy-swiper-title'}">${item.new}</div>
                    <div class="buy-swiper-img"><img src="${item.src}"/></div>
                    <h3 class="title">花花草草监测仪</h3>
                    <p class="p">OLED显示屏幕/激光颗粒</p>
                    <div class="price">
                        <span>1</span>
                        <span>&nbsp;</span>
                        <span>元</span>
                        <span>&nbsp;</span>
                        <del>49元</del>
                    </div>
                </li>`
            }

        })
    }
    ele.innerHTML = str;

}
BindHtml_buy(hd_ul,8,pro2_data);
//推荐
function BindHtml_commend(ele,num,d) {
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        d[i].xiaoMi.forEach(function (item,index) {
            if(index<num){
                str += `<li>
                        <div class="commend-title"></div>
                        <div class="commend-img"><img src="${item.src}"/></div>
                        <h3 class="title">${item.title}</h3>
                        <p class="p">激光颗粒</p>
                        <div class="price">
                            <span>${item.price}</span>
                            <span>&nbsp;</span>
                            <span>元</span>
                            <span>&nbsp;</span>
                            <del>1000元</del>
                        </div>
                    </li>`
            }

        })
    }
    ele.innerHTML = str;

}
BindHtml_commend(commend_ul,15,pro2_data);
//热门产品
let hot_ul = document.getElementById('hot_ul');
function BindHtml_hot(ele,num,d) {
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        for (var j = 0; j < d[i].xiaoMi.length; j++) {
            let randNum = Math.round(Math.random()*6);
            var cur = d[i].xiaoMi[randNum];
            if(j<num){
                str += `<li>
                        <div class="hot-pro-img"><img src="${cur.src}"/></div>
                        <div class="hot-content">
                            <p class="p">${cur.title}</p>
                            <p class="form">来自于 ${cur.form}的评价</p>
                            <div class="price">
                                <span class="b">${cur.name}</span>
                                <span>|</span>
                                <span class="g">${cur.price}元</span>
                            </div>
                        </div>
                    </li>`
            }

        }
    }
    ele.innerHTML = str;
}
BindHtml_hot(hot_ul,4,hot_data)

/*
*@fileName:搜索框
*@注意
*/
function oSearchSuggest(searchFuc) {
    var input = $('#gover_search_key');
    var suggestWrap = $('#gov_search_suggest');
    var key = "";
    var init = function(){
        input.bind('keyup',sendKeyWord);
        input.bind('blur',function(){setTimeout(hideSuggest,100);})
    }
    var hideSuggest = function(){
        suggestWrap.hide();
    }
    //发送请求，根据关键字到后台查询
    var sendKeyWord = function(event){
        //键盘选择下拉项
        if(suggestWrap.css('display')=='block'&&event.keyCode == 38||event.keyCode == 40)
        {
            var current = suggestWrap.find('li.hover');
            if(event.keyCode == 38)
            {
                if(current.length>0)
                {
                    var prevLi = current.removeClass('hover').prev();
                    if(prevLi.length>0)
                    {
                        prevLi.addClass('hover');
                        input.val(prevLi.html());
                    }
                }
                else
                {
                    var last = suggestWrap.find('li:last');
                    last.addClass('hover');
                    input.val(last.html());
                }
            }
            else if(event.keyCode == 40)
            {
                if(current.length>0)
                {
                    var nextLi = current.removeClass('hover').next();
                    if(nextLi.length>0)
                    {
                        nextLi.addClass('hover');
                        input.val(nextLi.html());
                    }
                }
                else
                {
                    var first = suggestWrap.find('li:first');
                    first.addClass('hover');
                    input.val(first.html());
                }
            }
            //输入字符
        }
        else
        {
            var valText = $.trim(input.val());
            if(valText ==''||valText==key)
            {
                return;
            }
            searchFuc(valText);
            key = valText;
        }
    }
    //请求返回后，执行数据展示
    this.dataDisplay = function(data){
        if(data.length<=0)
        {
            suggestWrap.hide();
            return;
        }
        //往搜索框下拉建议显示栏中添加条目并显示
        var li;
        var tmpFrag = document.createDocumentFragment();
        suggestWrap.find('ul').html('');
        for(var i=0; i<data.length; i++)
        {
            li = document.createElement('LI');
            li.innerHTML = data[i];
            tmpFrag.appendChild(li);
        }
        suggestWrap.find('ul').append(tmpFrag);
        suggestWrap.show();
        //为下拉选项绑定鼠标事件
        suggestWrap.find('li').hover(function(){
            suggestWrap.find('li').removeClass('hover');
            $(this).addClass('hover');
        },function(){
            $(this).removeClass('hover');
        }).bind('click',function(){
            $(this).find("span").remove();
            input.val(this.innerHTML);
            suggestWrap.hide();
        });
    }
    init();
};
//实例化输入提示的JS,参数为进行查询操作时要调用的函数名
var searchSuggest = new oSearchSuggest(sendKeyWordToBack);
//这是一个模似函数，实现向后台发送ajax查询请求，并返回一个查询结果数据，传递给前台的JS,再由前台JS来展示数据。本函数由程序员进行修改实现查询的请求
//参数为一个字符串，是搜索输入框中当前的内容
function sendKeyWordToBack(keyword){
    var aData = [];
    aData.push('<span class="num_right">约100个</span>'+keyword+'返回数据1');
    aData.push('<span class="num_right">约200个</span>'+keyword+'返回数据2');
    aData.push('<span class="num_right">约100个</span>'+keyword+'返回数据3');
    aData.push('<span class="num_right">约50000个</span>'+keyword+'返回数据4');
    aData.push('<span class="num_right">约1044个</span>'+keyword+'2012是真的');
    aData.push('<span class="num_right">约100个</span>'+keyword+'2012是假的');
    aData.push('<span class="num_right">约100个</span>'+keyword+'2012是真的');
    aData.push('<span class="num_right">约100个</span>'+keyword+'2012是假的');
    //将返回的数据传递给实现搜索输入框的输入提示js类
    searchSuggest.dataDisplay(aData);
}