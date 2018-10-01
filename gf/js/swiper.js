
~function (){

    class Swip extends Subscribe{

        //事件委托的对象 entrust  绑定数据标签 bindHtml  阻止冒泡的对象 bubble 接口地址 url
        constructor(url='',entrust={},bindHtml={},bubble=[]){
            super();
            this.url = url;
            this.entrust = entrust;
            this.bindHtml = bindHtml;
            this.bubble = bubble;

            //获取数据
            this.queryData = function queryData() {
                return new Promise(resolve => {
                    let xhr = new XMLHttpRequest;
                    xhr.open('get',this.url,true);
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState === 4 && xhr.status === 200){
                            resolve(JSON.parse(xhr.responseText));
                        }
                    }
                    xhr.send(null);
                });

            }
            this.promise = this.queryData();

            //添加事件
            this.bindHTML = (result)=>{
                for (let i=0;i<result.length;i++){
                    this.MOUSEOVER = this.over.bind(this,result[i]);
                    this.entrust.addEventListener('mouseover',this.MOUSEOVER)

                    //划出盒子隐藏，添加事件
                    this.MOUSEOUT = this.out.bind(this);
                    this.entrust.addEventListener('mouseout',this.MOUSEOUT)
                }
            }

            this.plink = this.promise.then(this.bindHTML);
        }

        over(item,ev){

            this.bindData = () =>{

                this.bindHtml.parentNode.style.display = 'block';

                let target = ev.target;
                let value = target.innerText;
                let val = item[value];
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

                    this.bindHtml.innerHTML = str;
                }
            }

            this.plink.then(this.bindData);

            //阻止冒泡
            for(let i=0;i<this.bubble.length;i++){
                this.bubble[i].addEventListener('mouseover',function(ev){
                    ev.stopPropagation();
                });
            }
        }

        out(){
            // 订阅发布
            this.fire(this.bindHtml);
        }
    }

    window.Swip = Swip;
}();
