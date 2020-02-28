/**
 * @author City
 * @method bufferMove - 属性动画
 * @param {HTMLElement} elem - 运动对象
 * @param {Object} attrs - 运动属性
 * @param {Number} time - 运动时长
 * @returns {Number} - 时钟指针
 */

function bufferMove(elem, attrs, time) {
    clearInterval(parseInt(elem.timer));

    elem.timer = setInterval(function () {
        var flag = true;

        for (const key in attrs) {
            // 获取当前值
            if (key === "opacity") {
                var cur = parseInt(getStyle(elem, key) * 100);
            } else {
                var cur = parseInt(getStyle(elem, key));
            }

            // 计算步长
            var speed = (attrs[key] - cur) / time;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 清除定时器
            if (cur != attrs[key]) {
                flag = false;
            }

            // 让div移动
            if (key === "opacity") {
                elem.style[key] = (cur + speed) / 100;
                elem.style.filter = "alpha(opacity=" + (cur + speed) + ")";
            } else {
                elem.style[key] = cur + speed + "px";
            }
        }

        if (flag) {
            clearInterval(parseInt(elem.timer));
        }
    }, 30);

    return elem.timer;
}

/**
 * @author City
 * @method getStyle - 获取元素属性
 * @param {Object} obj 元素对象
 * @param {String} attr 属性
 * @returns {String} - 获取到的属性值
 */

function getStyle(obj, attr) {
    return obj.currentStyle
        ? obj.currentStyle[attr]
        : getComputedStyle(obj)[attr];
}

/**
 * @author City
 * @method addElement - 追加元素
 * @param {HTMLElement} obj - 父级对象
 * @param {String} element - 标签
 * @param {String} content - 添加内容
 * @returns {HTMLElement} - 创建元素对象
 */

function addElement(obj, element, content) {
    // 创建元素
    let createElement = document.createElement(element);
    // 添加元素innerHTML
    createElement.innerHTML = content;
    // 向父级追加新建元素
    obj.appendChild(createElement);
    // 返回当前新建元素对象
    return createElement;
}

/**
 * @author City
 * @method bindEvent - 绑定事件
 * @param {HTMLElement} obj - html对象
 * @param {String} event - 事件，不加on
 * @param {Function} func - 事件处理函数
 * @param {Boolean} cat - 默认false：冒泡，true：捕获
 */

function bindEvent(obj, event, func, cat = false) {
    obj.addEventListener
        ? obj.addEventListener(event, func, cat)
        : obj.attachEvent("on" + event, func);
}

/**
 * @author City
 * @method cancelEvent - 取消事件
 * @param {HTMLElement} obj - html对象
 * @param {String} event - 事件，不加on
 * @param {Function} func - 事件处理函数
 */

function cancelEvent(obj, event, func) {
    obj.removeEventListener
        ? obj.removeEventListener(event, func)
        : obj.detachEvent("on" + event, func);
}

/**
 * @author City
 * @method stopPropagation - 阻止冒泡
 * @param {Event} ev - 事件对象
 */

function stopPropagation(ev) {
    ev.stopPropagation ? ev.stopPropagation() : (ev.cancelBubble = true);
}

/**
 * @author City
 * @method prevent - 阻止默认事件
 * @param {Event} ev - 事件对象
 */

function prevent(ev) {
    ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false);
}

/**
 * @author City
 * @method mouseWheelDirection - 判断滚轮滚动方向
 * @param {Event} ev - 事件对象
 * @returns {Boolean} - 向上：true，向下：false
 */

function mouseWheelDirection(ev) {
    let key = ev.wheelDelta ? ev.wheelDelta : ev.detail;
    let top = Math.abs(key) == 120 ? 120 : -3;
    return key == top ? true : false;
}

/**
 * @author City
 * @method setCookie - 设置 cookie
 * @param {String} key - cookie 键
 * @param {String} value - cookie 值
 * @param {Number} day - cookie 保存事件
 */

function setCookie(key, value, day) {
    let oDate = new Date();
    oDate.setSeconds(oDate.getSeconds() + day);
    document.cookie = `${key}=${value};expires=${oDate}`;
}

/**
 * @author City
 * @method getCookie - 获取 cookie
 * @param {String} key - cookie 键
 * @returns {String} - 成功返回值，失败返回-1
 */

function getCookie(key) {
    let attr = document.cookie.split("; ");
    for (let i = 0; i < attr.length; i++) {
        const element = attr[i].split("=");
        if (element[0] == key) {
            return element[1];
        }
    }

    return -1;
}

// 删除cookie  重复生成字符串

/**
 * @author City
 * @method ajax - 发送AJAX请求
 * @param {Object} res - 请求对象
 * {
 *     "url": "请求地址",
 *     "type": "请求类型",
 *     "data": "请求参数",
 *     "success": function (res) {
 *        console.log(res);
 *      }
 * }
 */

function ajax(res) {
    let ajax = new XMLHttpRequest();

    if (res.type == "get") {
        res.url = res.data ? `${res.url}?${res.data}` : res.url;
    }

    ajax.open(res.type, res.url);

    if (res.type == "get") {
        ajax.send();
    } else {
        ajax.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        ajax.send(res.data);
    }

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            if (isJSON(ajax.responseText)) {
                res.success(JSON.parse(ajax.responseText));
            } else {
                res.success(ajax.responseText);
            }
        }
    };
}



/**
 * @author City
 * @method isJSON - 是否为 JSON
 * @param {String} str - 判断文本
 * @returns {Boolean} - 成功返回 True，失败返回 False
 */

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }
}



/**
 * @author City
 * @method showDom - 显示DOM
 * @param {HTMLElement} element - 操作DOM
 */

function showDom(element) {
    element.style.display = "block";
}



/**
 * @author City
 * @method hideDom - 隐藏DOM
 * @param {HTMLElement} element - 操作DOM
 */

function hideDom(element) {
    element.style.display = "none";
}



/**
 * @author City
 * @method getNowUnix - 取现行时间戳
 * @returns {Number} - 13位时间戳
 */

function getNowUnix() {
    return new Date().valueOf()
}



/**
 * @author City
 * @method getRect - 取元素基于视口坐标
 * @returns {Object} - top, bottom, left, right
 */

function getRect(element) {
    var rect = element.getBoundingClientRect();
    var top = document.documentElement.clientTop;
    var left = document.documentElement.clientLeft;

    return {
        top: rect.top - top,
        bottom: rect.bottom - top,
        left: rect.left - left,
        right: rect.right - left
    }
}



class TestScroll {
    constructor() {
        this.top = 0;
        this.testObjs = [];
        this.init();
    }

    init() {
        document.body.onscroll = () => {
            this.top = document.documentElement.scrollTop;
            this.test();
        }
    }

    /** function || Object: {
            "callback": function () {},
            "elements": li,
            "index": 0
        }*/

    // add testObj
    add(testObj) {
        if (typeof testObj == "function") {
            this.testObjs.push(testObj);
        } else {
            testObj.index = 0;
            this.testObjs.push(testObj);
        }
    }

    // remove testObj
    remove(testObj) {
        this.testObjs.splice(this.testObjs.indexOf(testObj), 1)
    }

    // test testObj
    test() {
        this.testObjs.forEach(value => {
            if (typeof value == "function") {
                value(this.top);
            } else {
                let flag = true;

                for (let i = 0; i < value.elements.length; i++) {
                    const element = value.elements[i];

                    if (this.top < element.clientHeight + element.offsetTop && this.top > element.offsetTop) {

                        if (value.index != i) {
                            value.callback({
                                "last": value.elements[value.index],
                                "next": value.elements[i]
                            }, {
                                "last": value.index,
                                "next": i
                            })
                            value.index = i;
                        }

                        flag = false;
                        break;
                    }

                }

                if (flag) {
                    value.index = undefined;
                }
            }
        })
    }

    // 完全处于视口
    allInView(element) {
        let rect = this.getRect(element);
        return rect.top + element.clientHeight <= (window.innerHeight || document.documentElement.clientWidth || document.body.clientWidth) && rect.top >= 0
    }

    // 处于视口
    inView(element) {
        let rect = this.getRect(element);
        return rect.top <= (window.innerHeight || document.documentElement.clientWidth || document.body.clientWidth) && rect.top + element.clientHeight > 0
    }

    // 获取元素基于视口坐标
    getRect(element) {
        var rect = element.getBoundingClientRect();
        var top = document.documentElement.clientTop;
        var left = document.documentElement.clientLeft;

        return {
            top: rect.top - top,
            bottom: rect.bottom - top,
            left: rect.left - left,
            right: rect.right - left
        }
    }

}


class CurDom {
    constructor(elements, callback = function () { }) {
        this.elements = elements;
        this.length = elements.length
        this.index = 0;
        this.callback = callback
    }

    init() {
        for (let i = 0; i < this.length; i++) {
            const element = this.elements[i];
            element.index = i;
            element.onmouseover = () => {
                this.elements[this.index].classList.remove("cur");

                this.callback(this.elements[this.index], element);

                element.classList.add("cur");
                this.index = element.index;
            }
        }
    }
}


// 修改为 undefined
// 每项控件皆有一个回调函数
// 通一回调函数

class Carousel {
    constructor(obj, elements, oper, callback) {
        this.obj = obj;
        this.elements = elements;

        this.navs = oper.navs;
        this.navCallback = oper.navCallback;
        this.btns = oper.btns;
        this.timing = oper.timing;

        this.callback = callback;
        this.length = elements.length;
        this.index = 0;
        this.Timer = 0;

        this.init();
    }

    init() {

        // 焦点处理
        this.obj == false ? null : this.focus();

        // 左右控制
        this.btns[0] == false ? null : this.toLeft();
        this.btns[1] == false ? null : this.toRight();

        // 导航控制
        this.navs == false ? null : this.toNav();

        // 自动切换
        this.timing == false ? null : this.auto();

    }

    // Cut Function
    cutCarousel(wantIndex) {
        if (wantIndex == this.index) {
            return false
        }
        if (wantIndex == this.length) {
            wantIndex = 0;
        }
        if (wantIndex < 0) {
            wantIndex = this.length - 1;
        }

        // navs cut
        if (this.navs) {
            this.navCallback == false ? null : this.navCallback(this.navs[this.index], this.navs[wantIndex]);
            this.navs[this.index].classList.remove("cur");
            this.navs[wantIndex].classList.add("cur");
        }

        // callback(lastElement,element)
        this.callback({
            "last": this.elements[this.index],
            "next": this.elements[wantIndex]
        }, {
            "last": this.index,
            "next": wantIndex
        });

        this.index = wantIndex
    }

    // oper onfocus
    focus() {
        this.obj.onmouseover = () => {
            clearInterval(this.Timer)
        }

        this.obj.onmouseout = () => {
            this.auto()
        }
    }

    // oper toLeft
    toLeft() {
        this.btns[0].onclick = () => this.cutCarousel(this.index - 1)
    }

    // oper toRight
    toRight() {
        this.btns[1].onclick = () => this.cutCarousel(this.index + 1)
    }

    // oper toNav
    toNav() {
        for (let i = 0; i < this.navs.length; i++) {
            const element = this.navs[i];
            element.index = i;
            element.onmouseover = () => this.cutCarousel(element.index);
        }
    }

    // oper auto
    auto() {
        this.Timer = setInterval(() => {
            this.cutCarousel(this.index + 1)
        }, this.timing);
    }
}