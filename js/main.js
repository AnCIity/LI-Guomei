// 初始化对象
var Scroll = new TestScroll(); // 网页滚动操作

// 划出栏
var musicSlide = document.getElementsByClassName("music-slide");

// 国美会员特权
var oPriv = document.getElementsByClassName("priv")[0];
var privIndex = 0;

// to left
oPriv.children[0].onclick = function () {
    privIndex--;
    if (privIndex < 0) {
        privIndex = 0;
        return false;
    }

    movePriv(privIndex);
};

// to right
oPriv.children[1].onclick = function () {
    privIndex++;
    if (privIndex > 2) {
        privIndex = 2;
        return false;
    }

    movePriv(privIndex);
};

// move
function movePriv(index) {
    bufferMove(
        oPriv.children[2].children[0],
        { "margin-left": -198 * index },
        15
    );
}



// 顶部搜索框
var searchTypeInner = document.getElementById("search-type-inner");
var searchTypeList = document.getElementById("search-type-list");

// select type
searchTypeList.onclick = function (ev) {
    var ev = window.event || ev;
    var target = ev.target || ev.srcElement;
    searchTypeInner.innerHTML = target.innerHTML;
    searchTypeList.style.display = "none";
}

// set list display event
searchTypeList.parentNode.onmouseover = function () { searchTypeList.style.display = "block"; }
searchTypeList.parentNode.onmouseout = function () { searchTypeList.style.display = "none"; }

var searchForm = document.getElementById("top-search-form");
var searchInput = searchForm.topSearch;
var searchLabel = searchInput.previousElementSibling;
var labelTime = 0;
// start label cut
randomLabel();
autoLabel();

// set label event
searchLabel.onclick = function () {
    searchLabel.style.display = "none";
    searchInput.focus();
    clearInterval(labelTime);
}
searchInput.onblur = function () {
    if (searchInput.value == "") {
        searchLabel.style.display = "block";
        autoLabel();
    }
}

// auto
function autoLabel() {
    labelTime = setInterval(() => {
        randomLabel()
    }, 5000);
}

// get random label content
function randomLabel() {
    var arr = searchLabel.getAttribute("default").split(";")
    searchLabel.innerHTML = arr[Math.floor(Math.random() * 5)]
}



// 导航栏滚动效果
var hdrsRollbtn = document.getElementsByClassName("hdrsRollbtn")[0].getElementsByTagName("a");
var adnavSide = document.getElementsByClassName("adnavside")[0].getElementsByTagName("ul")[0];
var hdrsIndex = 0;
var hdrsTimer = 0;

// start auto
autoHdrs(5000);

// to top
hdrsRollbtn[0].onclick = function () {
    moveHdrs(hdrsIndex--);
}

// to bottom
hdrsRollbtn[1].onclick = function () {
    moveHdrs(hdrsIndex++);
}

// auto
function autoHdrs(time) {
    hdrsTimer = setInterval(() => {
        moveHdrs(hdrsIndex++);
    }, time);
}

// move
function moveHdrs(index) {
    clearInterval(hdrsTimer);

    if (hdrsIndex < 0) {
        hdrsIndex = 2;
        adnavSide.style.marginTop = "-120px";
    }

    if (hdrsIndex > 3) {
        hdrsIndex = 1;
        adnavSide.style.marginTop = "0px";
    }

    bufferMove(adnavSide, { "margin-top": -40 * hdrsIndex }, 15)

    autoHdrs(5000);
}



// 主导航
var navDom = document.getElementsByClassName("focus-solt")[0].getElementsByTagName("li");
ajax({
    "url": "./json/navDat.json",
    "type": "get",
    "success": function (res) {
        var data = res.ch.fc.te;
        data.forEach((element, index) => {
            let value = element.ch;

            // 导航主标题
            let title = "";
            value.fct.cl.forEach(element => {
                title += `<a href="${element.h}" title="${element.t}">${element.t}<i></i></a>`;
            })

            // 导航分类
            let items = "";
            value.ta.ch.tc.te.forEach(element => {

                let str = "";
                element.ch.tc.cl.forEach(value => {
                    let className = value.linkOtherAttr ? `class="${value.linkOtherAttr.ir}"` : "";
                    str += `<a href="${value.h}" ${className} title="${value.t}">${value.t}</a>`;
                })

                items += `<div class="full-item">
                            <div class="full-item-title">
                                ${element.mn}
                            </div>
                            <div class="full-item-list">
                                ${str}
                            </div>
                        </div>`;
            })

            // logos
            let logos = "";
            value.fcb.il.forEach(element => {
                logos += `<a href="${element.h}" title="${element.t}">
                            <img src="${element.s}" alt="${element.a}">
                        </a>`;
            })

            // img
            let img = "";
            if (value.fcbp.il != undefined) {
                img = `<a href="${value.fcbp.il[0].h}" title="${value.fcbp.il[0].t}">
                                <img src="${value.fcbp.il[0].s}">
                            </a>`;
            } else {
                img = "";
            }


            let soltFull = `<div class="solt-full">
                <div class="full-left">
                    <div class="full-title">
                        ${title}
                    </div>
                    <div class="full-items">
                        ${items}
                    </div>
                </div>
                <div class="full-right">
                    <div class="full-logos clearfix">
                        ${logos}
                    </div>
                    <div class="full-img">
                        ${img}
                    </div>
                </div>
            </div>`

            navDom[index].innerHTML += soltFull;
        });
    }
})



// 轮播图
var carouselImgData = [
    { "href": "//prom.gome.com.cn/html/prodhtml/topics/201912/27/2020year.html?intcmp=sy-1000060757-1", "src": "//gfs12.gomein.net.cn/T1ZbJCB5hv1RCvBVdK.jpg" },
    { "href": "//prom.gome.com.cn/html/prodhtml/topics/202001/8/1148097437.html?intcmp=sy-1000066394-1", "src": "//gfs12.gomein.net.cn/T1JsYCB4DT1RCvBVdK.jpg" },
    { "href": "//prom.gome.com.cn/html/prodhtml/topics/201912/31/ktnewyear.html", "src": "//gfs12.gomein.net.cn/T1KshCB4Wv1RCvBVdK.jpg" },
    { "href": "//prom.gome.com.cn/html/prodhtml/topics/201912/31/8784318458.html", "src": "//gfs10.gomein.net.cn/T1O3dCBsET1RCvBVdK.jpg" },
    { "href": "//prom.gome.com.cn/html/prodhtml/topics/201912/31/8645305452.html", "src": "//gfs13.gomein.net.cn/T1c9KCBKYT1RCvBVdK.jpg" },
    { "href": "//prom.gome.com.cn/html/prodhtml/topics/201912/30/7312707618.html", "src": "//gfs13.gomein.net.cn/T1_gDCBbxT1RCvBVdK.jpg" },
    { "href": "//prom.gome.com.cn/html/prodhtml/topics/201912/30/5921931428.html", "src": "//gfs11.gomein.net.cn/T1o1CCBvbT1RCvBVdK.jpg" },
    { "href": "//prom.gome.com.cn/html/prodhtml/topics/201705/9/1606222683.html?intcmp=sy-1000066396-1", "src": "//gfs11.gomein.net.cn/T1FqbCBydv1RCvBVdK.jpg" }
];
var carouselNavs = [];
var carouselImgs = [];
var carouselIndex = 0;
var carouselTimer = 0;
var dirCarousel = musicSlide[0].getElementsByClassName("chunk")

carouselImgData.forEach((element, index) => {
    carouselNavs.push(addElement(document.getElementsByClassName("carousel-nav")[0], "i", ""));
    carouselNavs[index].index = index;
    carouselNavs[index].onmouseover = function () {
        carouselIndex = cutCarousel(carouselIndex, this.index, carouselImgs.length)
    }

    carouselImgs.push(addElement(document.getElementsByClassName("carousel-img")[0], "li", `<a href="${element.href}"><img src="${element.src}"></a>`));
})

// mouse over out event 
document.getElementsByClassName("focus-center")[0].onmouseover = function () {
    // clear timer
    clearInterval(carouselTimer);
}
document.getElementsByClassName("focus-center")[0].onmouseout = function () {
    // start timer
    autoCarousel()
}

// start init
carouselNavs[carouselIndex].className = "select";
bufferMove(carouselImgs[carouselIndex], { "opacity": 100 }, 1);

// to left
dirCarousel[0].onclick = function () {
    carouselIndex = cutCarousel(carouselIndex, carouselIndex - 1, carouselImgs.length)
}

// to right
dirCarousel[1].onclick = function () {
    carouselIndex = cutCarousel(carouselIndex, carouselIndex + 1, carouselImgs.length)
}

// auto
autoCarousel()

// auto function
function autoCarousel() {
    carouselTimer = setInterval(() => {
        carouselIndex = cutCarousel(carouselIndex, carouselIndex + 1, carouselImgs.length)
    }, 4000);
}

// cut function
function cutCarousel(lastIndex, index, length) {
    if (index == length) {
        index = 0;
    }
    if (index < 0) {
        index = length - 1;
    }

    // cut nav select
    carouselNavs[lastIndex].className = "";
    carouselNavs[index].className = "select";

    // cut img
    bufferMove(carouselImgs[lastIndex], { "opacity": 0 }, 15);
    bufferMove(carouselImgs[index], { "opacity": 100 }, 15);

    return index
}



// 充值模块
var payMove = document.getElementsByClassName("pay-move");
var serverPay = document.getElementsByClassName("server-pay")[0];
var payPopup = document.getElementsByClassName("pay-popup");
var payShow = false;
var payIndex = 0;

for (let i = 0; i < payMove.length; i++) {
    const element = payMove[i];
    element.index = i;
    element.onmouseover = function () {
        payPopup[payIndex].style.display = "none";
        payPopup[this.index].style.display = "block";
        payIndex = this.index;

        if (payShow == false) {
            bufferMove(serverPay, { "top": 226 }, 2);
            payShow = true;
        }

    }
}
var payClose = document.getElementsByClassName("pay-close");
for (let i = 0; i < payClose.length; i++) {
    const element = payClose[i];
    element.onclick = function () {
        bufferMove(serverPay, { "top": 460 }, 4);
        payShow = false;
    }
}


// 美日必抢
var countUl = document.getElementsByClassName("countdown-list")[0].getElementsByTagName("ul");
var dirCount = musicSlide[1].getElementsByClassName("chunk")
var countFlag = true;

countUl[0].style.display = "block";

dirCount[0].onclick = cutCount;
dirCount[1].onclick = cutCount;

function cutCount() {

    if (countFlag) {
        countUl[0].style.display = "none";
        countUl[1].style.display = "block";
        countFlag = false;
    } else {
        countUl[1].style.display = "none";
        countUl[0].style.display = "block";
        countFlag = true;
    }
}


// 猜你喜欢
var guessInner = document.getElementsByClassName("guess-inner")[0];
var guessUl = [];
var guessControl = document.getElementsByClassName("guess-control")[0].getElementsByTagName("i");
var guessIndex = 0;
ajax({
    "url": "./json/guess.json",
    "type": "get",
    "success": function (res) {
        let list = res.lst;
        let listGroup = Math.ceil(list.length / 6);
        let listUl = [];

        for (let i = 0; i < listGroup; i++) {
            listUl.push(list.slice(i * 6, (i + 1) * 6));
        }

        listUl.forEach(element => {
            let listLi = "";

            element.forEach(element => {
                listLi += `<li>
                    <a href="${element.purl}">
                        <img src="${element.iurl}" alt="${element.pn}">
                        <p class="guess-title">
                            ${element.pn}
                        </p class="guess-title">
                        <p class="guess-price">${element.price}</p>
                    </a>
                </li>`
            })

            guessUl.push(addElement(guessInner, "ul", listLi))

        })

        guessUl[0].style.opacity = "1";

        guessControl[0].onclick = function () {
            guessIndex = cutGuess(guessIndex, guessIndex - 1)
        }
        guessControl[1].onclick = function () {
            guessIndex = cutGuess(guessIndex, guessIndex + 1)
        }

        function cutGuess(lastIndex, index) {
            index = index < 0 ? guessUl.length - 1 : index;
            index = index > guessUl.length - 1 ? 0 : index;

            bufferMove(guessUl[lastIndex], { "opacity": 0 }, 6)
            bufferMove(guessUl[index], { "opacity": 100 }, 6)

            return index
        }

    }
})


//  楼层模块
var oFloors = document.getElementsByClassName("floor");

for (let i = 0; i < oFloors.length; i++) {
    const element = oFloors[i];
    ajax({
        "url": `https://www.gome.com.cn/floor${i + 1}.html?_=${getNowUnix()}`,
        "type": "get",
        "success": (res) => {
            element.innerHTML = res;

            let imgs = element.getElementsByTagName("img");
            for (let i = 0; i < imgs.length; i++) {
                const element = imgs[i];
                element.src = element.getAttribute("data-lazy-init");
            }

            // 楼层页面切换
            new Carousel(
                false,
                element.getElementsByClassName("main"),
                {
                    "navs": element.getElementsByClassName("tab")[0].getElementsByTagName("li"),
                    "navCallback": (lastElement, element) => {
                        lastElement.children[0].style.backgroundColor = "white";
                        element.children[0].style.backgroundColor = element.parentNode.getAttribute("hcolor");
                    },
                    "btns": [false, element.getElementsByClassName("page_slider")[0].getElementsByClassName("next")[0]],
                    "timing": false
                },
                (element, index) => {
                    element.last.style.display = "none";
                    if (index.next != 0) {
                        if (element.next.getAttribute("tab-data-load") == "0") {
                            ajax({
                                "url": `./json/floor/floor${i + 1}/tab${index.next}.json`,
                                "type": "get",
                                "success": (res) => {
                                    let str = "";
                                    res.forEach(element => {
                                        str += `<li> 
                                                <a href="${element.detailHref}" data-code="1000060877-1" target="_blank"
                                                    title="${element.name}"> <img class="lazyloading"
                                                        src="${element.goodsImgs[0].src}_130.jpg" alt="${element.name}" width="130"
                                                        height="130">
                                                    <p class="p_name">${element.name}</p>
                                                    <p class="p_price" productid="${element.productid}" sku="${element.sku}" priceflag="false"><span>¥</span>${element.gomePrice}</p>
                                                </a> 
                                            </li>`
                                    })
                                    element.next.innerHTML = `<ul class="main_inner">
                                                            ${str}
                                                        </ul>`
                                    element.next.setAttribute("tab-data-load", "1")
                                }
                            })
                        }
                    }
                    element.next.style.display = "block";
                }
            );

            // 楼层轮播切换
            var logos = element.getElementsByClassName("brand_slider")[0].getElementsByTagName("ul");
            new Carousel(
                element.getElementsByClassName("mc_c")[0],
                element.getElementsByClassName("slider")[0].getElementsByTagName("li"),
                {
                    "navs": element.getElementsByClassName("mc_c")[0].getElementsByClassName("nav")[0].getElementsByTagName("li"),
                    "navCallback": false,
                    "btns": [element.getElementsByClassName("slider_page")[0].getElementsByClassName("prev")[0],
                    element.getElementsByClassName("slider_page")[0].getElementsByClassName("next")[0]],
                    "timing": 8000
                },
                (element, index) => {
                    element.next.style.opacity = ".4";
                    bufferMove(element.last, { "opacity": 0 }, 10);
                    bufferMove(element.next, { "opacity": 100 }, 10);
                    element.last.style.display = "none";
                    logos[index.last].style.display = "none";
                    element.next.style.display = "block";
                    logos[index.next].style.display = "block";
                }
            );

            // 初始检测导航楼层
            scrollFloor();

        }
    })

}

// 左侧楼层导航
var elevator = document.getElementById("elevator");
elevator.index = 0;
var elevatorLis = elevator.getElementsByTagName("li");
var elevatorTwo = document.getElementsByClassName("fl_goto")[0].getElementsByTagName("li");
var elevOnScroll = true;
var elevIndex = 0;

// 导航定位事件
for (let i = 0; i < elevatorLis.length; i++) {
    const element = oFloors[i];
    elevatorLis[i].index = i;
    elevatorLis[i].onclick = function () {
        elevOnScroll = false;
        elevIndex = this.index;
        elevatorLis[elevator.index].classList.remove("current");
        elevatorLis[elevIndex].classList.add("current");

        window.scrollTo({
            top: element.offsetTop - 20,
            behavior: "smooth"
        });
    }
}

elevatorTwo[0].onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

elevatorTwo[1].onclick = function () {
    window.scrollTo({
        top: document.body.clientHeight,
        behavior: "smooth"
    });
}

// 添加滚动楼层监控
Scroll.add(scrollFloor);

function scrollFloor(top) {
    if (Scroll.inView(document.getElementsByClassName("floor-box")[0])) {
        showDom(elevator);

        if (elevOnScroll == false) {
            if (parseInt(top) == oFloors[elevIndex].offsetTop - 20) {
                elevOnScroll = true;
            }
        }

        if (elevOnScroll) {
            for (let i = 0; i < oFloors.length; i++) {
                if (Scroll.allInView(oFloors[i])) {
                    elevator.index = i;
                } else {
                    elevatorLis[i].classList.remove("current");
                }
            }
            elevatorLis[elevator.index].classList.add("current");
        }

    } else {
        hideDom(elevator);
    }
}



//  固定部分
var stickNav = document.getElementsByClassName("stick-nav")[0];
var fixedSearch = document.getElementById("top-search-form");
var fixedCate = document.getElementById("category-top");
var fixedSolt = document.getElementsByClassName("focus-left")[0];
var fixedSoltFocus = false;

function showSolt() {
    fixedSolt.classList.add("solt-fixed");
}
function hideSolt() {
    fixedSolt.classList.remove("solt-fixed");
}
function moveSolt() {
    fixedCate.addEventListener("mouseover", showSolt);
    fixedCate.addEventListener("mouseout", hideSolt);
    fixedSolt.addEventListener("mouseover", showSolt);
    fixedSolt.addEventListener("mouseout", hideSolt);
}
function removeSolt() {
    fixedCate.removeEventListener("mouseover", showSolt);
    fixedCate.removeEventListener("mouseout", hideSolt);
    fixedSolt.removeEventListener("mouseover", showSolt);
    fixedSolt.removeEventListener("mouseout", hideSolt);
}

Scroll.add(top => {
    if (top > 630) {
        fixedSearch.classList.add("topSearch-fixed");
        fixedCate.classList.add("category-fixed");
        moveSolt();
        stickNav.style.display = "block";
    } else {
        fixedSearch.classList.remove("topSearch-fixed");
        fixedCate.classList.remove("category-fixed");
        removeSolt();
        stickNav.style.display = "none";
    }
})


// 侧边栏

// 购物车
var userCart = false;
document.getElementsByClassName("user-cart")[0].onclick = function () {
    if (userCart) {
        bufferMove(document.getElementsByClassName("user-cart-move")[0], { "right": -240 }, 4);
        userCart = false;
    } else {
        bufferMove(document.getElementsByClassName("user-cart-move")[0], { "right": 35 }, 4);
        userCart = true;
    }

}

document.getElementsByClassName("user-cart-close")[0].onclick = function () {
    bufferMove(document.getElementsByClassName("user-cart-move")[0], { "right": -240 }, 4);
    userCart = false;
}

// APP模块
document.getElementsByClassName("aside-app")[0].onmouseover = function () {
    document.getElementsByClassName("aside-app-move")[0].style.transform = "translate(0px, 0px)";
    this.getElementsByTagName("b")[0].style.backgroundPosition = "-40px -464px";
}

function closeApp() {
    document.getElementsByClassName("aside-app-move")[0].style.transform = "translate(150%, 0px)";
    document.getElementsByClassName("aside-app")[0].getElementsByTagName("b")[0].style.backgroundPosition = "";
}

document.body.onclick = function () {
    closeApp();
}

document.getElementsByClassName("aside-app-move")[0].onclick = function (ev) {
    var ev = window.event || ev;
    stopPropagation(ev);
}

var asideLi = document.getElementsByClassName("bar-aside")[0].getElementsByTagName("li");

for (let i = 1; i < asideLi.length; i++) {
    const element = asideLi[i];
    element.onmouseover = function () {
        closeApp();
    }
}

// 到顶部
Scroll.add(top => {
    if (top > 100) {
        document.getElementsByClassName("aside-backtop")[0].style.visibility = "visible";
    } else {
        document.getElementsByClassName("aside-backtop")[0].style.visibility = "hidden";
    }
})

document.getElementsByClassName("aside-backtop")[0].onclick = function () {
    window.scrollTo({
        "top": 0,
        behavior: "smooth"
    })
}