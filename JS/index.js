
var currentPage = 0;

function changePage(pagenum) {
	if(pagenum > currentPage)
	{
		changeAnimeUP(pagenum);
	}
	else if(pagenum < currentPage)
	{
		changeAnimeDOWN(pagenum);
	}
}

function changeAnimeUP(pagenum) {
	$('#ChangeBG').removeClass('top').addClass('bottom').animate({height:'100%'},1000,'easeInOutCubic',function(){
		$('#page-'+pageDict[currentPage]).css("visibility","hidden");
		$('#page-'+pageDict[pagenum]).css("visibility","visible");
		$('#sideBar').css('visibility','visible');
		$('title').text(pageDict[pagenum]+'Page');
		$('#ChangeBG').removeClass('bottom').addClass('top');
		currentPage = pagenum;
	});
	$('#ChangeBG').animate({height:'0%'},1000,'easeInOutQuad',function() {
		$('#ChangeBG').removeClass('top').addClass('bottom');
	});
}

function changeAnimeDOWN(pagenum) {
	$('#ChangeBG').removeClass('bottom').addClass('top').animate({height:'100%'},1000,'easeInOutCubic',function(){
		$('#page-'+pageDict[currentPage]).css("visibility","hidden");
		$('#page-'+pageDict[pagenum]).css("visibility","visible");
		if(pagenum == 0){$('#sideBar').css('visibility','hidden');}
		$('title').text(pageDict[pagenum]+'Page');
		$('#ChangeBG').removeClass('top').addClass('bottom');
		currentPage = pagenum;
	});
	$('#ChangeBG').animate({height:'0%'},1000,'easeInOutQuad',function() {
		$('#ChangeBG').removeClass('bottom').addClass('top');
	});
}

function ToIndex() {
	changePage(0);
}
function ToAnime() {
	changePage(1);
}
function ToResume() {
	changePage(2);
}
function ToNoth() {
	changePage(3);
}

function indexOnclick() {
	changePage(1);
}

function animeOnclick() {
	changePage(0);
}

function animeToresumeOnclick() {
	changePage(2);
}

function resumeTohomeOnclick() {
	changePage(0);
}

var timer = null;
var element = document.getElementById('sideBar');
var musicBar = document.getElementById('musicBar');

function mouseHover() {
	sideBarAnime(element,150,5,'right');
}
function mouseOut() {
	sideBarAnime(element,0,-5,'right');
}
function musicBarHover() {
	sideBarAnime(musicBar,0,5,'left');
}
function musicBarOut() {
	sideBarAnime(musicBar,-100,-5,'left');
}
function sideBarAnime(element,end,speed,direction) {
	clearInterval(timer);
	timer =setInterval(function () {
		if(direction == 'right'){
			element.style.right = window.innerWidth-element.offsetLeft- 150 + speed + 'px';
			if(speed > 0){
				if((window.innerWidth-element.offsetLeft) >= end){
					clearInterval(timer);
					element.style.right = end - 150 + 'px';
				}
			}
			else{
				if((window.innerWidth-element.offsetLeft) <= end){
					clearInterval(timer);
					element.style.right = end - 150 + 'px';
				}
			}
		}
		if(direction == 'left'){
			element.style.left = element.offsetLeft + speed + 'px';
			if(speed > 0){
				if(element.offsetLeft >= end){
					clearInterval(timer);
					element.style.left = end + 'px';
				}
			}
			else{
				if(element.offsetLeft <= end){
					clearInterval(timer);
					element.style.right = end + 'px';
				}
			}
		}
	},10);
}

