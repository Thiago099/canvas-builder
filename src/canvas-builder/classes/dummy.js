
export class dummy{
    constructor(){
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
      if(typeof this._x === "function") return this._x();
      return this._x;
    }
    get y() {
      if(typeof this._y === "function") return this._y();
      return this._y;
    }
    set x(x) {
      this._x = x;
    }
    set y(y) {
      this._y = y;
    }
    get w() {
      if(typeof this._w === "function") return this._w();
      return this._w;
    }
    get h() {
      if(typeof this._h === "function") return this._h();
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
      return this;
    }
    hook(name,parent)
    {
      parent.hooks.push(this);
      this.children[name] = parent;
      return this;
    }
    update(){
      for(const item of this.hooks)
      {
        item.update();
      }
    }
    update_forced()
    {
      this.ctx.clearRect(0, 0, this.w, this.h);
    }
    destroy()
    {
      for(const children of Object.values(this.children))
      {
        children.hooks.splice(children.hooks.indexOf(this),1);
      }
    }
  }
  