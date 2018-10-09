(function () {

    class Shuffling {
        constructor(ele, time, button1, button2) {
            this.ele = ele;
            this.button1 = button1;
            this.button2 = button2;
            this.time = time;
            this.num = 0;
            this.imgs = this.ele.getElementsByTagName("img");
            this.lis = this.button1.getElementsByTagName("li");
            this.span = this.button2.getElementsByTagName("span");
            this.ele.timer = setInterval(this.dinghsi.bind(this), this.time);
            this.ele.addEventListener("mouseover", () => {
                clearInterval(this.ele.timer);
            });
            this.ele.addEventListener("mouseout", () => {
                this.ele.timer = setInterval(this.dinghsi.bind(this), this.time);
            });
            this.dianji1()
            this.dianji2()
        }

        dinghsi() {

            this.num++;
            this.num = this.num > 4 ? 0 : this.num;
            for (var i = 0; i < this.imgs.length; i++) {
                if (i !== this.num) {
                    this.imgs[i].style = "opacity : 0";
                    this.lis[i].style = "background : #000";
                }
            }
            this.imgs[this.num].style = "opacity : 1";
            this.lis[this.num].style = "background : #fff";
        }


        dianji1() {
            let these = this
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].onclick = function () {
                    this.style = "background : #fff";
                    these.imgs[i].style = "opacity : 1";
                    for (var j = 0; j < these.lis.length; j++) {
                        if (j !== i) {
                            these.lis[j].style = "background : #000";
                            these.imgs[j].style = "opacity : 0";
                        }
                    }
                    these.num = i;
                }
            }
        }


        dianji2() {
            this.span[0].onclick = () => {
                this.num--;
                this.num = this.num < 0 ? 4 : this.num;
                for (var i = 0; i < this.imgs.length; i++) {
                    if (i !== this.num) {
                        this.imgs[i].style = "opacity : 0";
                        this.lis[i].style = "background : #000";
                    }
                }
                this.imgs[this.num].style = "opacity : 1";
                this.lis[this.num].style = "background : #fff";
            };

            this.span[1].onclick = () => {
                this.num++;
                this.num = this.num > 4 ? 0 : this.num;
                for (var i = 0; i < this.imgs.length; i++) {
                    if (i !== this.num) {
                        this.imgs[i].style = "opacity : 0";
                        this.lis[i].style = "background : #000";
                    }
                }
                this.imgs[this.num].style = "opacity : 1";
                this.lis[this.num].style = "background : #fff";
            };

        }

    }
    window.Shuffling = Shuffling;
})();
