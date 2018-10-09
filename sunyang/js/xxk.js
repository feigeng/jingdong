(function () {

    class XXK {
        constructor(buttons, box) {
            this.buttons = buttons;
            this.box = box;
            this.div = this.buttons.getElementsByTagName("div")[0];
            this.div.onmouseover = (e) => {
                if (e.target.id === "appHot") {
                    if (this.box[0].classList.length === 2) {
                        return;
                    }
                    this.box[0].classList.add("xianshi");
                    this.xunhuan(0);

                } else if (e.target.id === "appVideo") {
                    if (this.box[1].classList.length === 2) {
                        return;
                    }
                    this.box[1].classList.add("xianshi");
                    this.xunhuan(1);

                } else if (e.target.id === "appCom") {
                    if (this.box[2].classList.length === 2) {
                        return;
                    }
                    this.box[2].classList.add("xianshi");
                    this.xunhuan(2);

                } else if (e.target.id === "appHome") {
                    if (this.box[3].classList.length === 2) {
                        return;
                    }
                    this.box[3].classList.add("xianshi");
                    this.xunhuan(3);
                }
            }
        }

        xunhuan(n) {
            for (var i = 0; i < this.box.length; i++) {
                if (i !== n) {
                    this.box[i].classList.remove("xianshi");
                }
            }
        }


    }

    window.XXK = XXK;

})();