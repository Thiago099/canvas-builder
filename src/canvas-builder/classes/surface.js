
export class surface{
    constructor(){
      this.surface = document.createElement("canvas");
      this.ctx = this.surface.getContext("2d");
    }
    position(x,y){
      this.x = x;
      this.y = y;
      return this;
    }
    size(w,h){
      this.w = w;
      this.h = h;
      this.surface.width = this.canvas.width;
      this.surface.height = this.canvas.height;
      return this;
    }
    style(renderStyle)
    {
      this.renderStyle = renderStyle;
      return this;
    }
    parent(canvas)
    {
      canvas.register(this);
      this.canvas = canvas;
      return this;
    }
    update(){
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.renderStyle(this.ctx,this.w,this.h);
      this.canvas.refresh();
      return this;
    }
  }
  