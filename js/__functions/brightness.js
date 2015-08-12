jQuery.fn.brightness = function() {
  var bg_color, rgba, y;
  bg_color = this.css('background-color');
  if ((bg_color != null) && bg_color.length) {
    rgba = bg_color.match(/^rgb(?:a)?\(([0-9]{1,3}),\s([0-9]{1,3}),\s([0-9]{1,3})(?:,\s)?([0-9]{1,3})?\)$/);
    if (rgba != null) {
      if (rgba[4] === '0') {
        if (this.parent().length) return this.parent().brightness();
      } else {
        y = 2.99 * rgba[1] + 5.87 * rgba[2] + 1.14 * rgba[3];
        if (y >= 1275) {
          return 'light';
        } else {
          return 'dark';
        }
      }
    }
  } else {
    if (this.parent().length) return this.parent().brightness();
  }
};







