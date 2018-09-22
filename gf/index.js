
let sWiperTop = (function(){

    let site = document.getElementById('site-header');
    let lis = site.getElementsByTagName('li');
    let navContent = document.getElementById('nav-content');

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


    };

    let swiperInit = function swiperInit(){

    }



    return {
        init:function(){
            let promise = queryData();
            promise.then(bindHTML).then(swiperInit);

        }
    }
})();

sWiperTop.init();