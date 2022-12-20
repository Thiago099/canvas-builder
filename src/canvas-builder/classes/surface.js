
export class surface{
    constructor(){
      this.surface = document.createElement("canvas");
      this.ctx = this.surface.getContext("2d");
      this.hooks = [];
      this.children = {};
      this._x = 0;
      this._y = 0;
      this._w = 0;
      this._h = 0;
    }
    get is_renderable() {
      return this.w > 0 && this.h > 0;
    }
    get x() {
      // if(typeof this._x === "function") return this._x();
      return this._x;
    }
    get y() {
      // if(typeof this._y === "function") return this._y();
      return this._y;
    }
    set x(x) {
      this._x = x;
    }
    set y(y) {
      this._y = y;
    }
    get w() {
      // if(typeof this._w === "function") return this._w();
      return this._w;
    }
    get h() {
      // if(typeof this._h === "function") return this._h();
      return this._h;
    }
    set w(w) {
      this._w = w;
    }
    set h(h) {
      this._h = h;
    }
    position(x,y){
      this._x = x;
      this._y = y;
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
      if(this.renderStyle)
      this.renderStyle(
        {
          ctx:this.ctx,
          w:this.w,
          h:this.h
        }
        ,this.children);
      if(this.canvas)
      this.canvas.refresh();
    }
    update_forced()
    {
      this.ctx.clearRect(0, 0, this.w, this.h);
      if(this.renderStyle)
      this.renderStyle({ctx:this.ctx,w:this.w,h:this.h},this.children);
    }
    destroy()
    {
      if(this.canvas)
      {
        this.canvas.remove(this);
        this.canvas.update();
      }
      for(const children of Object.values(this.children))
      {
        children.hooks.splice(children.hooks.indexOf(this),1);
      }
    }
    hover(e)
    {
      const {offsetX, offsetY} = e;
      if(
        offsetX < this.x ||
        offsetX > this.x + this.w ||
        offsetY < this.y ||
        offsetY > this.y + this.h
      )
      {
        return true
      }
      return false
    }
    hover_circle(e,position,radius)
    {
      const {offsetX, offsetY} = e;
      return distanceBetweenPoints({x:offsetX-this.x,y:offsetY-this.y},position) < radius
    }
  }
  function distanceBetweenPoints(point1, point2) {
    let x1 = point1.x;
    let y1 = point1.y;
    let x2 = point2.x;
    let y2 = point2.y;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
