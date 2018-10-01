
let sWiperTop = (function(){

    let site = document.getElementById('site-header');
    let lis = site.getElementsByTagName('li');
    let navContent = document.getElementById('nav-content');
    let logo = site.getElementsByClassName('header-logo')[0];
    let title = site.getElementsByClassName('header-title')[0];

    //获取数据
    let queryData = function queryData() {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest;
            xhr.open('get','data/nav-content.json',true);
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

        for (let i=0;i<result.length;i++){

            //移入显示对应数据
            site.addEventListener('mouseover',function(ev){
                navContent.parentNode.style.display = 'block';

                let target = ev.target;
                let value = target.innerText;
                let val = result[i][value];
                if(val !== undefined){

                    let str = ``;
                    for(let i=0;i<val.length;i++){

                        let dev = ``;
                        if(val[i].flag){
                            dev = `<div class="content-flag">${val[i].flag}</div>`;
                        }else{
                            dev = `<div>${val[i].flag}</div>`;
                        }

                        str += `
                            <li>
                                ${dev}
                                <div class="content-img">
                                    <img src="image/${val[i].img}" alt="">
                                </div>
                                <div class="content-title">${val[i].series}</div>
                                <span class="content-price">${val[i].price}</span>
                            </li>`;
                    }

                    navContent.innerHTML = str;
                }
            });

            site.addEventListener('mouseout',function(){
                navContent.parentNode.style.display = 'none';
            });
        }

        lis[8].addEventListener('mouseover',function(ev){
            ev.stopPropagation();
        });
        lis[9].addEventListener('mouseover',function(ev){
            ev.stopPropagation();
        });
        logo.addEventListener('mouseover',function(ev){
            ev.stopPropagation();
        });
        title.addEventListener('mouseover',function(ev){
            ev.stopPropagation();
        });

    };

    return {
        init:function(){
            let promise = queryData();
            promise.then(bindHTML);
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

        for (let i=0;i<result.length;i++){
            //移入显示对应数据
            slideLeft.addEventListener('mouseover',function(ev){

                slideMes.style.display = 'block';

                let target = ev.target;
                let value =  target.innerText.replace(/\s/g, "");
                let val = result[i][value];

                if(val !== undefined){

                    console.log(val);

                    let length = 0;
                    if (value.length % 6 === 0) {
                        length = value.length / 6;
                    } else {
                        length = Math.ceil(value.length / 6)
                    }
                    // for (let t = 0; i < length; t++) {
                    //     lisStr += `<ul>`;
                    //     for (let j = t * 6; j <= (1 + t) * 6 - 1; j++) {
                    //         if (value[j]) {
                    //             lisStr += `<li>
                    //                             <div>
                    //                                 <img src="image/logo.png" alt="">
                    //                             </div>
                    //                             <span>电话卡</span>
                    //                         </li>`;
                    //         }
                    //     }
                    //     lisStr += `</ul>`;
                    // }
                    // slideMes[i].innerHTML = lisStr;
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