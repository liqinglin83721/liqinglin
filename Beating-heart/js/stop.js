// 此功能也就只能骗骗老实人，不懂电脑的人，稍微懂点，基本上也就没啥用了，

// 再说了，我就非常喜欢这些，你来复制粘贴，我欢迎，我们就要大方点，好东西一起分享,

// 但是，前提是要你能看得懂这个。

// 算了，我还是写出注释吧，小笨蛋。

// 禁止右键菜单

document.oncontextmenu = function() {
	return false;
};

// 禁止文字选择

document.onselectstart = function() {
	return false;
};

// 禁止复制

document.oncopy = function() {
	return false;
};

// 禁止剪切

document.oncut = function() {
	return false;
};

// 禁止粘贴

document.onpaste = function() {
	return false;
};
