(function () {

    class ZMD {

        constructor(ele, button, juli1, juli2) {
            this.ele = ele;
            this.button = button;
            this.juli1 = juli1;
            this.juli2 = juli2;
            this.span = this.button.getElementsByTagName("span");
            this.lis = this.ele.getElementsByTagName("li");
            this.num = 0;
            this.juli = 0;
            this.w = this.lis[0].offsetWidth;
            this.span[0].addEventListener("click", this.left.bind(this));
            this.span[1].addEventListener("click", this.right.bind(this));
        }

        left() {
            if (this.num === 0) {
                return
            }
            this.num--;
            if (this.num === (parseInt(this.lis.length / 4) - 1)) {
                this.ele.timer = setInterval(this.ldingshi.bind(this, (this.lis.length % 4 * this.juli2)), 17);
            } else if (this.num >= 0) {
                this.ele.timer = setInterval(this.ldingshi.bind(this, this.juli1), 17);
            }


        }

        right() {
            if (this.num === (parseInt(this.lis.length / 4))) {
                return
            }
            this.num++;
            if (this.num <= (parseInt(this.lis.length / 4) - 1)) {
                this.ele.timer2 = setInterval(this.rdingshi.bind(this, this.juli1), 17);
            } else if (this.num === (parseInt(this.lis.length / 4))) {
                this.ele.timer2 = setInterval(this.rdingshi.bind(this, this.juli2 * (this.lis.length % 4)), 17);
            }


        }

        ldingshi(jl) {
            this.juli += 17;
            this.ele.scrollLeft -= 17;
            if (this.juli >= jl) {
                this.juli = 0;
                clearInterval(this.ele.timer);
            }
        };

        rdingshi(jl) {
            this.juli += 17;
            this.ele.scrollLeft += 17;
            if (this.juli >= jl) {
                this.juli = 0;
                clearInterval(this.ele.timer2);
            }
        };
    }

    window.ZMD = ZMD;
})();