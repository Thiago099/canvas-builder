// import and export canvas.js

import {canvas as _canvas} from "./classes/canvas.js";
import {surface as _surface} from "./classes/surface";

export function canvas(canvas){
  return new _canvas(canvas);
}

export function surface(){
    return new _surface();
}