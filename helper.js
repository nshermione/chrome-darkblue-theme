const { createCanvas} = require('canvas');
const fs = require('fs');

class Helper {
  fromHex(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgb = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
    return [rgb.r, rgb.g, rgb.b];
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  fromRgbList(rgb) {
    return this.rgbToHex(...rgb);
  }

  createImage(rgbList, name, width = 80, height = 80) {
    const hex = this.fromRgbList(rgbList);
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.fillStyle = hex;
    context.fillRect(0, 0, width, height);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`./images/${name}.png`, buffer);
    return `images\/${name}.png`;
  }
}

module.exports = {
  color: new Helper()
};
