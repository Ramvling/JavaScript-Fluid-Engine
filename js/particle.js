var collisionRadius = 10;
var timeInterval = 0.01;
var mass = 1;
var wallX = 500;
var wallY = 500;
function Particle(x, y, dirx, diry, accX, accY, radius) {
	this.x = x;
	this.y = y + 10;
	this.dirx = dirx;
	this.diry = diry;
	this.accX = accX;
	this.radius = radius;
	this.accY = 10;
	return this;
}
	Particle.prototype.move = function() {
		this.x = Math.abs(this.x + this.dirx);
		this.y = Math.abs(this.y + this.diry);
		this.clearForces();
		return;
	}

	Particle.prototype.wallCollide = function() {
		if ((this.x + collisionRadius) >= wallX) {
			this.dirx = -this.dirx;
		} else if ((this.x - collisionRadius) <= 0) {
			this.dirx = -this.dirx;
		}

		if ((this.y + collisionRadius) >= wallY) {
			//console.log("Collision detected");
			this.diry = -(this.diry - (this.diry * 0.35));
			this.accY += -10;
			//this.dirY = -this.dirY;
			if (this.y > this.wallY) {
				this.setDampen();
			}
		} else if ((this.Y - collisionRadius) <= 0) {
			this.accY = 0;
		}
		return;
	}

	Particle.prototype.draw = function(canvas, context) {
		context.beginPath();
    	context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    	context.fillStyle = 'blue';
    	context.fill();
    	return;
	}

	Particle.prototype.setDampen = function() {
		if (Math.abs(this.dirx) > 0) {
			var sign = (this.dirx/Math.abs(this.dirx));
			this.accX = -(sign * 0.25);
		} else {
			this.accX = 0;
			this.dirx = 0;
		}
	}

	Particle.prototype.particleCollide = function(p) {
		//needs work, bad conditionals
		if (p == undefined) {
			return;
		}
		var dx = this.x - p.x;
		var dy = this.y - p.y;
		var radii = this.radius + p.radius;

		if ((dx * dx) + (dy * dy) < radii * radii) {
			this.accX += dx;
			this.accY += dy;
			p.accY += dy;
			p.accX += dx;
			var temp = p.dirx;
			var temp2 = p.diry;
			p.dirx = this.dirx;
			p.diry = this.diry;
			this.dirx = temp;
			this.diry = temp2;
			//this.x += dx;
			//p.x -=  dx;
			//this.y += dy;
			//p.y -= dy;
		}
	}


	Particle.prototype.applyForces = function() {
		//gravity
		this.accY += 10;
		this.dirx = this.dirx + (this.accX * timeInterval);
		this.diry = this.diry + (this.accY * timeInterval);
	}

	Particle.prototype.clearForces = function() {
		this.accY = 0;
		this.accX = 0;
	}