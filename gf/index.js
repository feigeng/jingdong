
let sWiperTop = (function(){

    let container = document.getElementById('container');
    let nav = document.getElementById('header-nav');
    let lis = nav.getElementsByTagName('li');

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
            nav.addEventListener('mouseover',function(ev){
                let target = ev.target;
                let value = target.innerText;
                let v = result[i][value];
                if(v !== undefined){
                    console.log(v);
                }

            })

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