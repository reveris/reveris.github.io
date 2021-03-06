var currentPage = 0;
var ismusicBarOpen = false;

function changePage(pagenum) {
    if (pagenum > currentPage) {
        changeAnimeUP(pagenum);
    } else if (pagenum < currentPage) {
        changeAnimeDOWN(pagenum);
    }
}

function changeAnimeUP(pagenum) {
    $('#ChangeBG').removeClass('top').addClass('bottom').animate({ height: '100%' }, 1000, 'easeInOutCubic', function() {
        $('#page-' + pageDict[currentPage]).css("visibility", "hidden");
        $('#page-' + pageDict[pagenum]).css("visibility", "visible");
        //$('#sideBar').css('visibility','visible');
        $('title').text('Reveris的' + pageDict[pagenum] + 'Page');
        $('#ChangeBG').removeClass('bottom').addClass('top');
        currentPage = pagenum;
    });
    $('#ChangeBG').animate({ height: '0%' }, 1000, 'easeInOutQuad', function() {
        $('#ChangeBG').removeClass('top').addClass('bottom');
    });
}

function changeAnimeDOWN(pagenum) {
    $('#ChangeBG').removeClass('bottom').addClass('top').animate({ height: '100%' }, 1000, 'easeInOutCubic', function() {
        $('#page-' + pageDict[currentPage]).css("visibility", "hidden");
        $('#page-' + pageDict[pagenum]).css("visibility", "visible");
        //if(pagenum == 0){$('#sideBar').css('visibility','hidden');}
        $('title').text(pageDict[pagenum] + 'Page');
        $('#ChangeBG').removeClass('top').addClass('bottom');
        currentPage = pagenum;
    });
    $('#ChangeBG').animate({ height: '0%' }, 1000, 'easeInOutQuad', function() {
        $('#ChangeBG').removeClass('bottom').addClass('top');
    });
}

function ToPage(num) {
    var x = $('div#content').children();
    x[currentPage].style.color = '';
    x[currentPage].style.fontSize = '';
    changePage(num);
    x[num].style.color = '#FFF';
    x[num].style.fontSize = '25px';
}

var timer = null;
var element = document.getElementById('sideBar');
var musicBar = document.getElementById('musicBar');

function mouseHover() {
    sideBarAnime(element, 150, 10, 'right');
}

function mouseOut() {
    sideBarAnime(element, 0, -10, 'right');
}

function musicBarCtrl() {
    if (ismusicBarOpen) {
        sideBarAnime(musicBar, -100, -10, 'left');
        $('#musicCenter').css('color', '#E8E8E8FF')
    } else {
        sideBarAnime(musicBar, 0, 10, 'left');
        $('#musicCenter').css('color', '#ff9866');
    }
    ismusicBarOpen = !ismusicBarOpen;
}
// function musicBarHover() {
// 	sideBarAnime(musicBar,0,10,'left');
// }
// function musicBarOut() {
// 	sideBarAnime(musicBar,-100,-10,'left');
// }
function sideBarAnime(element, end, speed, direction) {
    clearInterval(timer);
    timer = setInterval(function() {
        if (direction == 'right') {
            element.style.right = window.innerWidth - element.offsetLeft - 150 + speed + 'px';
            if (speed > 0) {
                if ((window.innerWidth - element.offsetLeft) >= end) {
                    clearInterval(timer);
                    element.style.right = end - 150 + 'px';
                }
            } else {
                if ((window.innerWidth - element.offsetLeft) <= end) {
                    clearInterval(timer);
                    element.style.right = end - 150 + 'px';
                }
            }
        }
        if (direction == 'left') {
            element.style.left = element.offsetLeft + speed + 'px';
            if (speed > 0) {
                if (element.offsetLeft >= end) {
                    clearInterval(timer);
                    element.style.left = end + 'px';
                }
            } else {
                if (element.offsetLeft <= end) {
                    clearInterval(timer);
                    element.style.right = end + 'px';
                }
            }
        }
    }, 10);
}