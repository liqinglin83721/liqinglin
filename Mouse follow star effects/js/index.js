window.onload = function() {

	function blossom(id) {
		var blossom = this;
		this.cav_w = window.innerWidth;
		this.cav_h = window.innerHeight * 1; //设置 画布宽高
		this.canvas = document.getElementById(id);
		this.canvas.width = this.cav_w;
		this.canvas.height = this.cav_h;
		this.mouse_x = this.cav_w / 2 - this.canvas.offsetLeft - 25;
		this.mouse_y = this.cav_h / 2 - this.canvas.offsetTop - 25;
		this.ctx = this.canvas.getContext("2d");
		this.starbox = [];
		this.vcolor = 0;
		this.stars = function(locx, locy) {
			var self = this;
			self.color = "hsl(" + blossom.vcolor + ",90%,90%)"; //h色相 0~360,S饱和度，L亮度，0~100%
			self.xo = locx + Math.random() * 50;
			self.yo = locy + Math.random() * 50;
			self.direct = Math.random() > 1 / 2 ? 1 : -1;
			self.vx = (Math.random() - 0.5) * 2.5;
			self.vy = Math.random() * 2.5
			self.deg = Math.random() * 360;
			self.speed = Math.random() * 10 - 5;
			self.opacity = Math.random() * 0.5 + 0.5;
			self.vopacity = Math.random() * 0.009;
			self.scale = Math.random() * 0.7 - 1;
			self.img = document.createElement('canvas');
			self.shape(5, 20); //设置星星的边数 和 大小
		}
		this.stars.prototype.move = function() { //星星的轨迹运动
			var self = this;
			self.vx = self.vx + Math.random() * self.direct * 0.01 * self.speed
			self.vy = self.vy + Math.random() * 0.01 * self.speed
			self.vopacity = self.vopacity + 0.0002
			self.xo = self.xo + self.vx;
			self.yo = self.yo + self.vy;
			self.opacity = self.opacity - self.vopacity;
			self.deg = self.deg + Math.random() * 3 * self.direct;
			if (blossom.vcolor < 360) {
				blossom.vcolor = blossom.vcolor + 0.009;
			} else {
				blossom.vcolor = 0;
			}
			self.color = "hsl(" + blossom.vcolor + ",90%,70%)";
		}
		this.stars.prototype.shape = function(n,
			r) { //设置星星的边数 和 大小，N是边数，r是星星半径，用的贝塞尔，这是10实际星星半径并非为10哟~                            
			var self = this;
			var img = self.img;
			img.width = 3 * r;
			img.height = 3 * r;
			var ctx = self.img.getContext('2d');
			var outpoint = new Array();
			var inpoint = new Array();
			for (var i = 0; i < n; i++) {
				outpoint[i] = {
					xo: img.width / 2 + r * Math.cos(2 * Math.PI * i / n),
					yo: img.height / 2 + r * Math.sin(2 * Math.PI * i / n),
				}
				inpoint[i] = {
					xo: img.width / 2 + 0.5 * r * Math.cos((2 * i + 1) * Math.PI / n),
					yo: img.height / 2 + 0.5 * r * Math.sin((2 * i + 1) * Math.PI / n),
				}
			}
			ctx.beginPath();
			/*for(var i=0;i<n;i++){
				if(i<=0)
					ctx.moveTo(inpoint[0].xo,inpoint[0].yo);
				else
					ctx.lineTo(outpoint[i].xo,outpoint[i].yo)
					ctx.lineTo(inpoint[i].xo,inpoint[i].yo)
			}
			ctx.lineTo(outpoint[0].xo,outpoint[0].yo)*/
			for (var i = 0; i < n; i++) {
				if (i <= 0)
					ctx.moveTo(inpoint[0].xo, inpoint[0].yo);
				else
					ctx.bezierCurveTo(outpoint[i].xo, outpoint[i].yo, outpoint[i].xo, outpoint[i].yo, inpoint[i]
						.xo,
						inpoint[i].yo);
			}
			ctx.bezierCurveTo(outpoint[0].xo, outpoint[0].yo, outpoint[0].xo, outpoint[0].yo, inpoint[0].xo,
				inpoint[0]
				.yo);
			ctx.fillStyle = self.color;
			ctx.shadowColor = self.color;
			ctx.shadowBlur = 20;
			ctx.fill();
			ctx.closePath();
		};
		this.stars.prototype.draw = function(w, h, roat, scale) { // 画星星图片，w=图片宽，h=图片高，r=图片旋转角度，s=图片大小
			var self = this;
			var ctx = blossom.ctx;
			ctx.save();
			ctx.globalAlpha = Math.max(0, self.opacity)
			ctx.translate(self.xo, self.yo);
			ctx.rotate(roat * Math.PI / 180);
			ctx.scale(scale, scale);
			ctx.drawImage(self.img, -w, -h);
			ctx.restore();
		}
		this.rander();
		this.listen();
	}
	blossom.prototype.makestar = function(a) {
		if (this.starbox.length < 100) {
			this.starbox.push(new this.stars(this.mouse_x, this.mouse_y));
		}
	}
	blossom.prototype.rander = function() {
		var self = this;
		this.makestar();
		this.ctx.clearRect(0, 0, this.cav_w, this.cav_h);
		this.ctx.beginPath();
		for (var i = 0, j = this.starbox.length; i < j; i++) {
			if (this.starbox[i].opacity <= 0) {
				this.starbox.splice(i, 1);
				i--;
				j--
			} else {
				this.starbox[i].move();
				this.starbox[i].draw(this.starbox[i].img.width / 2, this.starbox[i].img.height / 2, this
					.starbox[i].deg,
					this.starbox[
						i].scale);
				//this.starbox[i].shape(5,20);                                      //星星角的个数，和大小
			}
		}
		this.ctx.globalAlpha = 0; //背景透明度
		//this.ctx.fillStyle="#000000";                                            //画布背景色
		//this.ctx.fillRect(0,0,this.cav_w,this.cav_h);
		this.ctx.closePath();
		requestAnimationFrame(function() {
			self.rander()
		});
	}
	blossom.prototype.listen = function() {
		var self = this;
		var left = this.canvas.offsetLeft;
		var top = this.canvas.offsetTop;
		window.addEventListener("mousemove", function(e) {
			self.mouse_x = e.clientX - left - 25;
			self.mouse_y = e.clientY - top - 25;
		});
		document.addEventListener('touchstart', function(e) {
			event.preventDefault();

		});
		window.addEventListener("touchmove", function(e) {
			self.mouse_x = e.touches[0].clientX - 25
			self.mouse_y = e.touches[0].clientY - top - 25;
		});
		document.addEventListener('touchend', function(e) {
			event.preventDefault();
			self.mouse_x = e.changedTouches[0].clientX - 25
			self.mouse_y = e.changedTouches[0].clientY - top - 25;
			for (var i = 0; i < 30; i++) {
				self.starbox.opacity = 0;
				self.starbox.push(new self.stars(self.mouse_x, self.mouse_y));
			}
			for (var i = 0, j = self.starbox.length; i < j; i++) {
				self.starbox[i].speed = self.starbox[i].speed * 5;
			}
		});
		window.addEventListener("click", function(e) {
			for (var i = 0; i < 30; i++) {
				self.starbox.opacity = 0;
				self.starbox.push(new self.stars(self.mouse_x, self.mouse_y));
			}
			for (var i = 0, j = self.starbox.length; i < j; i++) {
				self.starbox[i].speed = self.starbox[i].speed * 5;
			}
		})
	}
	var shine = new blossom("cav");

	// shine.makestar();

}