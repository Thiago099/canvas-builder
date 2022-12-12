
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
    makeDraggable()
    {
      var x = this.x;
      var y = this.y;
      var w = this.w;
      var h = this.h;
      var dx;
      var dy;
      var canvas = this.canvas;
      var surface = this;
      function drag(e)
      {
        x = e.clientX - dx;
        y = e.clientY - dy;
        surface.position(x,y);
        surface.update()
      }
      document.addEventListener("mousedown", function(e) {
        if(e.clientX < x || e.clientX > x + w || e.clientY < y || e.clientY > y + h) return
        dx = e.clientX - x;
        dy = e.clientY - y;
        document.addEventListener("mousemove", drag);
        function dragend(e) {
          document.removeEventListener("mousemove", drag);
          document.removeEventListener("mouseup", dragend);
        }
        document.addEventListener("mouseup", dragend);
      });
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
      this.canvas.update();
      return this;
    }
  }
  