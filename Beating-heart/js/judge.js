// 判断是pc端还是移动端访问
function isMobileOrPc() {
	let flag = navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	);
	console.log(flag);
	// 由于打开网页，pc端和移动端按钮位置无法做到完美，所以在css中剔除样式，在javascript中固定
	if (flag === null) {
		// 控制台输出设备信息
		console.log("pc端");
		// 固定按钮位置
		window.onscroll = function() {
			// 旋转播放
			document.getElementById('graph').style.position = "fixed";
			document.getElementById('graph').style.top = "50%";
			document.getElementById('graph').style.right = "2%";
		}

	} else {
		// 控制台输出设备信息
		console.log("移动端");
		// 固定按钮位置
		window.onscroll = function() {
			// 旋转播放
			document.getElementById('graph').style.position = "fixed";
			document.getElementById('graph').style.top = "50%";
			document.getElementById('graph').style.right = "4%";
		}
	}
}
isMobileOrPc()

// 判断设备信息
function equipment_information() {
	let webLog = {}
	let userAgent = navigator.userAgent
	// 获取微信版本
	let m1 = userAgent.match(/MicroMessenger.*?(?= )/)
	if (m1 && m1.length > 0) {
		webLog.wechat = m1[0]
	}
	// 苹果手机
	if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
		// 获取设备名
		if (userAgent.includes('iPad')) {
			webLog.device = 'iPad'
		} else {
			webLog.device = 'iPhone'
		}
		// 获取操作系统版本
		m1 = userAgent.match(/iPhone OS .*?(?= )/)
		if (m1 && m1.length > 0) {
			webLog.system = m1[0]
			console.log(webLog.system)
		}
	}
	// 安卓手机
	if (userAgent.includes('Android')) {
		// 获取设备名
		m1 = userAgent.match(/Android.*; ?(.*(?= Build))/)
		if (m1 && m1.length > 1) {
			webLog.device = m1[1]
			console.log(webLog.device)
		}
		// 获取操作系统版本
		m1 = userAgent.match(/Android.*?(?=;)/)
		if (m1 && m1.length > 0) {
			webLog.system = m1[0]
		}
	}
}
equipment_information()
