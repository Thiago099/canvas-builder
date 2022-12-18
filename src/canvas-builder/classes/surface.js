
export class surface{
    constructor(){
      this.surface = document.createElement("canvas");
      this.ctx = this.surface.getContext("2d");
      this.hooks = [];
      this.children = {};
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
      this.surface.width = w;
      this.surface.height =h;
      return this;
    }
    style(renderStyle)
    {
      this.renderStyle = renderStyle;
      return this;
    }
    z_index(z)
    {
      this.z = z;
      return this;
    }
    hook(name,parent)
    {
      parent.hooks.push(this);
      this.children[name] = parent;
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
      for(const item of this.hooks)
      {
        item.update();
      }
      this.renderStyle({ctx:this.ctx,w:this.w,h:this.h},this.children);
      this.canvas.refresh();
    }
    update_forced()
    {
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.renderStyle({ctx:this.ctx,w:this.w,h:this.h},this.children);
      this.canvas.refresh();
    }
  }
  