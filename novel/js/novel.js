// 平滑滚动到页面顶部
function scrollToTop() {
	var timeOut;
	if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
		window.scrollBy(0, -50);
		timeOut = setTimeout('scrollToTop()', 10);
	} else clearTimeout(timeOut);
}

// 触摸监听（touchstart）播放
// document.addEventListener('touchstart', function() {
// 	document.getElementById('music').play()
// })

window.onload = function() {
	// 解决html页面音频自动播放问题
	// 1、触摸监听（touchstart）播放
	// 2、微信浏览器自动播放方案：WeixinJSBridgeReady
	// 将两种方法写在一起，就可以实现性能比较好的自动播放交互
	function audioAutoPlay() {
		var audio = document.getElementById('music'),
			play = function() {
				audio.play();
				document.removeEventListener("touchstart", play, false);
			};
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function() {
			play();
		}, false);
		document.addEventListener('YixinJSBridgeReady', function() {
			play();
		}, false);
		document.addEventListener("touchstart", play, false);
	}
	audioAutoPlay()


	// 点击收藏实现收藏与不收藏
	function collected() {
		var collecting = 1;
		document.getElementById('collect').onclick = function() {
			collecting++;
			if (collecting % 2 == 0) {
				document.getElementById('collect').src = "img/collect_already.png"
				document.getElementById('collect').title = "已收藏"
			} else {
				document.getElementById('collect').src = "img/collect_none.png"
				document.getElementById('collect').title = "收藏"
			}
		}
	}
	collected()

	// 点击图片实现播放音乐或不播放音乐和实现图片一直旋转或停止旋转
	function runing() {

		var playing = 1;

		document.getElementById("rotate").onclick = function() {

			if (playing == 1) {
				// 不播放
				document.getElementById("music").pause();
				// 不旋转
				playing = 0;
				document.getElementById("rotate").style.webkitAnimationPlayState = "paused"
			} else {
				// 播放
				document.getElementById("music").play();
				// 旋转
				playing = 1;
				document.getElementById("rotate").style.webkitAnimationPlayState = "running"
			}
		}
	}
	runing()

	// 设置audio初始音量
	function getVideo() {
		document.getElementById('music').volume = 0.1;
	}
	getVideo()
}
