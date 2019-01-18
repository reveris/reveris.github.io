
var audio = $('#bgMusic')[0];
var isaudioChange = false;

var pageDict = ['index','anime','resume'];
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
		$('title').text(pageDict[pagenum]+'Page');
		$('#ChangeBG').removeClass('top').addClass('bottom');
		currentPage = pagenum;
	});
	$('#ChangeBG').animate({height:'0%'},1000,'easeInOutQuad',function() {
		$('#ChangeBG').removeClass('bottom').addClass('top');
	});
}


function indexOnclick() {
	changePage(1);
	PageChangeAudio(true);
}

function animeOnclick() {
	changePage(0);
	PageChangeAudio(false);
}

function animeToresumeOnclick() {
	changePage(2);
	PageChangeAudio(false);
}

function resumeTohomeOnclick() {
	changePage(0);
	PageChangeAudio(false);
}

function bgMusic() {
	if(audio.paused)
	{
		audio.play();
		$('i.fa').removeClass('fa-play').addClass('fa-pause').css('margin-left','6px');
	}
	else
	{
		audio.pause();
		$('i.fa').removeClass('fa-pause').addClass('fa-play').css('margin-left','8px');
	}
}

function PageChangeAudio(ChangeType) {
	if(ChangeType)
	{
		if(audio.paused)
		{
		}
		else
		{
			bgMusic();
			isaudioChange = true;
		}
	}
	else
	{
		if(isaudioChange)
		{
			bgMusic();
			isaudioChange = false;
		}
	}
}