
var audio = $('#bgMusic')[0];
var isaudioChange = false;

// var pageDict = ['index','anime','resume','noth'];
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
	if(pagenum == 0)
	{
		if(isaudioChange)
		{
			bgMusic();
			isaudioChange = false;
		}
	}
	else
	{
		if(!audio.paused)
		{
			bgMusic();
			isaudioChange = true;
		}
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

function bgMusic() {
	if(audio.paused)
	{
		audio.play();
		$('#audio').removeClass('fa-play').addClass('fa-pause').css('margin-left','6px');
	}
	else
	{
		audio.pause();
		$('#audio').removeClass('fa-pause').addClass('fa-play').css('margin-left','8px');
	}
}

var timer = null;
var element = document.getElementById('sideBar');

function mouseHover() {
	sideBarAnime(150,5);
}
function mouseOut() {
	sideBarAnime(0,-5);
}
function sideBarAnime(end,speed) {
	clearInterval(timer);
	timer =setInterval(function () {
		element.style.right = window.innerWidth-element.offsetLeft- 150 + speed + 'px';
		if(speed > 0)
		{
			if((window.innerWidth-element.offsetLeft) >= end)
			{
				clearInterval(timer);
				element.style.right = '0px';
			}
		}
		else
		{
			if((window.innerWidth-element.offsetLeft) <= end)
			{
				clearInterval(timer);
				element.style.right = '-150px';
			}
		}
	},10);
}

