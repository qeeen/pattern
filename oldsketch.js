var canv_w;
var canv_h;
var was_drawn;

function setup(){
	canv_w = 768;
	canv_h = canv_w;
	createCanvas(canv_w, canv_h);
	background(0);

	was_drawn = [];
	for(let i = 0; i < canv_w/16; ++i){
		was_drawn[i] = [];
		for(let k = 0; k < canv_h/16; ++k){
			was_drawn[i][k] = -1;
		}
	}

	draw_pattern();
}

function draw(){
}

function draw_pattern(){
	noStroke();
	for(let i = 0; i < canv_w; i += 16){
		for(let k = 0; k < canv_h; k += 16){
			if(spatial_check(i/16, k/16)){
				let r = Math.floor(random(3));
				switch(r){
					case 0:
						fill(255, 0, 0);
						triangle(i+8, k, i+16, k+16, i, k+16);
						was_drawn[i/16][k/16] == 0;
						break;
					case 1:
						fill(0, 255, 0);
						square(i, k, 16);
						was_drawn[i/16][k/16] == 1;
						break;
					case 2:
						fill(0, 0, 255);
						circle(i+8, k+8, 16);
						was_drawn[i/16][k/16] == 2;
						break;	
				}
			}
		}
	}
}

function spatial_check(col, row){
	let check_left = col > 0;
	let check_up = row > 0;
	let check_upleft = check_left && check_up;
	let check_upright = check_up && col < 15;
	let count = 0;

	if(check_left)
		count += was_drawn[col-1][row] != -1;
	if(check_up)
		count += was_drawn[col][row-1] != -1;
	if(check_upleft)
		count += was_drawn[col-1][row-1] != -1;
	if(check_upright)
		count += was_drawn[col+1][row-1] != -1;

	if(count == 0)
		r = Math.floor(random(0, 20));
	else if(count == 4)
		r = 0;
	else{
		r = Math.floor(random(2));
		if(r)
			r = Math.floor(random(2));
	}
	return r == 0;
}
