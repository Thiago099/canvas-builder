// import and export canvas.js

import {canvas as _canvas} from "./classes/canvas.js";
import {surface as _surface} from "./classes/surface";
import {dummy as _dummy} from "./classes/dummy";

export function canvas(canvas){
  return new _canvas(canvas);
}

export function surface(){
    return new _surface();
}


export function dummy(){
  return new _dummy();
}


export function filler_surface(canvas){
    return surface()
    .parent(canvas)
    .size(canvas.canvas.width,canvas.canvas.height)
    .position(0,0)
}