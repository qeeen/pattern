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

	noStroke();
	draw_pattern();
}

function draw(){
	empty_was_drawn();
	if(pmouseX != mouseX || pmouseY != mouseY){
		background(0);
		draw_pattern();
	}
}

function draw_pattern(){
	for(let i = 0; i < 5; ++i){
		switch(i){
			case 0:
				fill(167, 105, 204);
				break;	
			case 1:
				fill(169, 40, 140);
				break;	
			case 2:
				fill(145, 49, 157);
				break;	
			case 3:
				fill(104, 54, 149);
				break;	
			case 4:
				fill(79, 31, 93);
				break;	
		}
		draw_spot(Math.floor((canv_w/4)/16)*i-i, Math.floor((canv_h/4)/16)*i-i, 800);
	}
}

function draw_spot(col, row, chances){
	let horz_dim = map(mouseX, 0, displayWidth, 0, 1)+0.2;
	let vert_dim = map(mouseY, 0, displayHeight, 0, 1)*1.2+0.2;

	let ch_left = col > 0;
	let ch_right = col < canv_w/16-1;
	let ch_up = row > 0;
	let ch_down = row < canv_h/16-1;

	if(col < 0 || col > canv_w/16-1 || row < 0 || row > canv_h/16-1)
		return;	
	if(was_drawn[col][row] != -1)
		return;

	was_drawn[col][row] = 0;
	if(random(2) < 1)	
		square(col*16, row*16, 16);
	else
		circle(col*16+8, row*16+8, 16);

	if(ch_left){
		if(random()*100 < chances)
			draw_spot(col-1, row, chances*horz_dim);
	}
	if(ch_right){
		if(random()*100 < chances)
			draw_spot(col+1, row, chances*horz_dim);
	}
	if(ch_up){
		if(random()*100 < chances)
			draw_spot(col, row-1, chances*vert_dim);
	}
	if(ch_down){
		if(random()*100 < chances)
			draw_spot(col, row+1, chances*vert_dim);
	}
}

function empty_was_drawn(){
	for(let i = 0; i < canv_w/16; ++i){
		for(let k = 0; k < canv_h/16; ++k){
			was_drawn[i][k] = -1;
		}
	}
}
