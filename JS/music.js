var audio = $('#bgMusic')[0];
// var playlistID = 2200232865;
var playlistID = 3084543147
var albumID = 55949; //空之境界1
var songIDlist;
var songNum = 0;
var songName;
var isOrder = false;
var lycMode = false;
var Lyric = null;
var tLyric = null;
var lrcNum = 0;
var tltcNum = 0;

function MusicInit() {
    GetPlaylist();
    // songNum = Math.floor(Math.random() * songIDlist.length);
    // GetMusic();
    $('audio').attr('autoplay', 'autoplay');
}

function GetNum(param) {
    if (isOrder) {
        if (param == 'down') {
            songNum += 1;
            if (songNum == songIDlist.length) { songNum = 0; }
        } else if (param == 'up') {
            songNum -= 1;
            if (songNum < 0) { songNum = songIDlist.length - 1; }
        }
    } else {
        var num;
        while (true) {
            num = Math.floor(Math.random() * songIDlist.length);
            if (num != songNum) { break; }
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
    if (audio.paused) {
        play();
    } else {
        pause();
    }
}

function order() {
    if (isOrder) {
        $('#musicOrder').removeClass('fa-retweet').addClass('fa-random');
    } else {
        $('#musicOrder').removeClass('fa-random').addClass('fa-retweet');
    }
    isOrder = !isOrder;
}

function play() {
    audio.play();
    $('#musicControl').removeClass('fa-play').addClass('fa-pause').css('margin-left', '');
}

function pause() {
    audio.pause();
    $('#musicControl').removeClass('fa-pause').addClass('fa-play').css('margin-left', '1px');
}

setInterval(function() {
    if (audio.currentTime == audio.duration) {
        GetNum('down');
        GetMusic();
    }
}, 300);

function GetPlaylist() {
    $.ajax({
        url: 'https://api.imjad.cn/cloudmusic/?type=playlist&id=' + playlistID,
        dataType: 'json',
        Method: 'Get',
        success: function(response) {
            songIDlist = response.playlist.trackIds;
            GetNum('down');
            GetMusic();
        }
    });
}

function GetMusic() {
    $('.musicBtBG').css('visibility', 'hidden');
    $.ajax({
        url: 'https://api.imjad.cn/cloudmusic/?type=detail&id=' + songIDlist[songNum].id,
        dataType: 'json',
        Method: 'Get',
        success: function(response) {
            songName = response.songs[0].name;
            var picurl = response.songs[0].al.picUrl;
            $('.musicPic').css({
                'background': 'url(' + picurl + '?param=100y100)',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'background-size': 'cover'
            });
        }
    });
    // $.ajax({
    //     url: 'https://api.imjad.cn/cloudmusic/?type=song&id=' + songIDlist[songNum].id,
    //     dataType: 'json',
    //     Method: 'Get',
    //     success: function(response) {
    //         var murl = response.data[0].url;
    //         $('audio').attr('src', murl);
    //     }
    // });
    $('audio').attr('src', 'http://music.163.com/song/media/outer/url?id=' + songIDlist[songNum].id);
    //$('audio').attr('src', 'https://api.imjad.cn/cloudmusic/?type=song&br=128000&id=' + songIDlist[songNum].id);
    audio.oncanplay = function() {
        $('.musicBtBG').css('visibility', 'visible');
        play();
    };
    //GetLyric();
}

// 歌词源存在问题
// audio.ontimeupdate = function(e) {
//     if (tLyric == null) {
//         if (this.currentTime >= Lyric[lrcNum][0]) {
//             $('#LyricTxt').html(Lyric[lrcNum][1]);
//             lrcNum += 1;
//         }
//     } else {
//         if (this.currentTime >= Lyric[lrcNum][0]) {
//             $('#tLyricTxt1').html(Lyric[lrcNum][1]);
//             lrcNum += 1;
//         }
//         if (this.currentTime >= tLyric[tlrcNum][0]) {
//             $('#tLyricTxt2').html(tLyric[tlrcNum][1]);
//             tlrcNum += 1;
//         }
//     }
// if (this.currentTime >= Lyric[lrcNum][0]) {
//     if (tLyric == null) {
//         $('#LyricTxt').html(Lyric[lrcNum][1]);
//         lrcNum += 1;
//     } else {
//         $('#tLyricTxt1').html(Lyric[lrcNum][1]);
//         $('#tLyricTxt2').html(tLyric[lrcNum][1]);
//     }
// }


function lycmode() {
    if (lycMode) {
        $('#musicLyric').removeClass('show');
        $('.lyr').css('color', 'rgb(214,214,214)');
    } else {
        $('#musicLyric').addClass('show');
        $('.lyr').css('color', 'rgb(211,55,55)');
    }
    lycMode = !lycMode;
}

function GetLyric() {
    $.ajax({
        url: 'http://v1.hitokoto.cn/nm/lyric/' + songIDlist[songNum].id,
        //url: 'http://music.163.com/api/song/lyric?os=pc&lv=-1&tv=-1&id=' + songIDlist[songNum].id,
        dataType: 'json',
        Method: 'Get',
        success: function(response) {
            console.log(response);
            Lyric = parseLyric(response.lrc.lyric);
            if (response.tlyric.lyric != null) {
                tLyric = parseLyric(response.tlyric.lyric);
            } else {
                tLyric = null;
            };
            //Lyric = response;
        }
    });
    // $.getJSON(
    //     'http://v1.hitokoto.cn/nm/lyric/' + songIDlist[songNum].id,
    //     //'http://music.163.com/api/song/lyric?os=pc&lv=-1&tv=-1&id=' + songIDlist[songNum].id,
    //     function(response) {
    //         console.log(response);
    //         Lyric = parseLyric(response.lrc.lyric);
    //         if (response.tlyric.lyric != null) {
    //             tLyric = parseLyric(response.tlyric.lyric);
    //         } else {
    //             tLyric = null;
    //         };
    //     }
    // );
    lrcNum = 0;
    tlrcNum = 0;
    // if (tLyric != null) {
    //     $('#tLyricTxt').css('visibility', 'hidden');
    //     $('#LyricTxt').css('visibility', 'visible');
    // } else {
    //     $('#tLyricTxt').css('visibility', 'visible');
    //     $('#LyricTxt').css('visibility', 'hidden');
    // }
}

function parseLyric(text) {
    //将文本分隔成一行一行，存入数组
    var lines = text.split('\n'),
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        //保存最终结果的数组
        result = [];
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    };
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
        //提取出时间[xx:xx.xx]
        var time = v.match(pattern),
            //提取歌词
            value = v.replace(pattern, '');
        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
        time.forEach(function(v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function(a, b) {
        return a[0] - b[0];
    });
    // var finalresult = [];
    // for (let index = 0; index < result.length; index++) {
    //     if (result[index][1] != '') {
    //         finalresult.push(result[index]);
    //     }
    // }
    return result;
}