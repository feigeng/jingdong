(function () {

    class bindAjax {
        constructor(url) {
            this.url = url;
            this.data = null;
            this.ajax(this.url);
        }

        ajax(url) {
            let xhr = new XMLHttpRequest();
            xhr.open("get", url, false);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    this.data = JSON.parse(xhr.responseText);
                }
            }
            xhr.send();
        }

        bind(ele, num) {
            ele.innerHTML = "";
            var str = "";
            if (Math.floor(this.data[num]["module"].length / 6)) {
                for (var i = 0; i < Math.floor(this.data[num]["module"].length / 6); i++) {
                    ele.innerHTML += "<ul></ul>";
                    for (var j = 0; j < 6; j++) {
                        ele.childNodes[i].innerHTML += `<a href="javascript:;">
                <li>
                    <img src="${this.data[num]["module"][j + 6 * i].img}" alt="">
                    <span>${this.data[num]["module"][j + 6 * i].text}</span>
                </li>
            </a>`
                    }
                }

                if (this.data[num]["module"].length % 6) {
                    ele.innerHTML += "<ul></ul>";
                    for (var i = 0; i < (this.data[num]["module"].length % 6); i++) {
                        str += `<a href="javascript:;">
                <li>
                    <img src="${this.data[num]["module"][this.data[num]["module"].length - this.data[num]["module"].length % 6 + i].img}" alt="">
                    <span>${this.data[num]["module"][this.data[num]["module"].length - this.data[num]["module"].length % 6 + i].text}</span>
                </li>
            </a>`
                    }
                    ele.lastChild.innerHTML += str;
                }
            }


            else {
                ele.innerHTML = "<ul></ul>";

                for (var i = 0; i < this.data[num]["module"].length; i++) {
                    strLi += `<a href="javascript:;">
                <li>
                    <img src="${this.data[num]["module"][i].img}" alt="">
                    <span>${this.data[num]["module"][i].text}</span>
                </li>
            </a>`
                }
                ele.firstChild.innerHTML = strLi;
            }
        }

        bind2(ele, num2) {
            var str = "";
            for (var i = 0; i < this.data[num2]["module"].length; i++) {
                str +=`<li>
            <div class="navFoot1">
                热卖
            </div>
            <img src="${this.data[num2]["module"][i].img}" alt="">
            <h3>${this.data[num2]["module"][i].text}</h3>
            <p>${this.data[num2]["module"][i].price}</p>
        </li>`
            }
            ele.firstChild.innerHTML = str;
        }

    }


    window.bindAjax = bindAjax;
})();