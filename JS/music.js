var audio = $('#bgMusic')[0];
var playlistID = 2200232865;
var songIDlist;
var songNum = 0;
var isOrder = false;
function MusicInit() {
	GetPlaylist();
}
function GetNum(param){
	if(isOrder){
		if(param == 'down'){
			songNum += 1;
			if (songNum == songIDlist.length) {songNum = 0;}
		}else if(param == 'up'){
			songNum -= 1;
			if (songNum < 0) {songNum = songIDlist.length-1;}
		}
	}else{
		var num;
		while(true){
			num = Math.floor(Math.random()*songIDlist.length);
			if(num != songNum){break;}
		}
		songNum = num;
	}
}
function lastMusic() {
	GetNum('up')
	GetMusic();
}
function nextMusic() {
	GetNum('down')
	GetMusic();
}
function controlMusic() {
	if(audio.paused)
	{
		play();
	}
	else
	{
		pause();
	}
}
function order(){
	if(isOrder){
		$('#musicOrder').removeClass('fa-retweet').addClass('fa-random');
	}
	else{
		$('#musicOrder').removeClass('fa-random').addClass('fa-retweet');
	}
	isOrder = !isOrder; 
}
function play() {
	audio.play();
	$('#musicControl').removeClass('fa-play').addClass('fa-pause').css('margin-left','');
}
function pause() {
	audio.pause();
	$('#musicControl').removeClass('fa-pause').addClass('fa-play').css('margin-left','1px');
}

setInterval(function(){
	if(audio.currentTime == audio.duration){
		GetNum('down');
		GetMusic();}
},300);

function GetPlaylist() {
	$.ajax({
		url: 'https://api.imjad.cn/cloudmusic/?type=playlist&id='+playlistID,
		dataType:'json',
		Method: 'Get',
		success: function(response){
			res = response;
			songIDlist = response.playlist.trackIds;
			piclist = response.playlist.tracks;
			GetMusic();
		}
	});
}

function GetMusic() {
	$.ajax({
		url: 'https://api.imjad.cn/cloudmusic/?type=detail&id='+songIDlist[songNum].id,
		dataType:'json',
		Method: 'Get',
		success: function(response){
			var picurl = response.songs[0].al.picUrl;
			$('.musicPic').css({'background':'url('+picurl+'?param=100y100)',
								'background-repeat':'no-repeat',
								'background-position':'center',
								'background-size':'cover'});
		}
	});
	$.ajax({
		url: 'https://api.imjad.cn/cloudmusic/?type=song&id='+songIDlist[songNum].id,
		dataType:'json',
		Method: 'Get',
		success: function(response){
			var murl = response.data[0].url;
			$('audio').attr('src',murl);
		}
	});
	play();
}
