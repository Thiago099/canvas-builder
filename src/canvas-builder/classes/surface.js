
export class surface{
    constructor(){
      this.surface = document.createElement("canvas");
      this.ctx = this.surface.getContext("2d");
      this.hooks = [];
      this.x = 0;
      this.y = 0;
      this.w = 0;
      this.h = 0;
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
    hook(...parent)
    {
      for(const item of parent)
      {
        item.hooks.push(this);
      }
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
      for(const item of this.hooks)
      {
        item.update();
      }
      this.canvas.refresh();
      return this;
    }
  }
  