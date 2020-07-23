const fs = require('fs');
const rimraf = require("rimraf");
const ncp = require('ncp').ncp;
const archiver = require('archiver');
const { color } = require('./helper');

const headerBg = color.fromHex('#242f3d');
const headerInactive = color.fromHex('#383b45');
const mainBg = color.fromHex('#0e1621');
const toolBar = color.fromHex('#17212b');
const tabBg = color.fromHex('#0e1621');

const theme_frame_inactive_image = color.createImage(headerInactive, 'theme_frame_inactive', 20, 1920);

const data = {
  name: "darkblue",
  version: "1.0",
  description: "",
  manifest_version: 2,
  theme: {
    images: {
      theme_frame:  color.createImage(headerBg, 'theme_frame', 20, 1920),
      theme_frame_inactive: theme_frame_inactive_image,
      theme_frame_incognito: theme_frame_inactive_image,
      theme_frame_incognito_inactive: theme_frame_inactive_image,
      theme_toolbar: color.createImage(toolBar, 'theme_toolbar', 20, 120),
      theme_tab_background: color.createImage(tabBg, 'theme_tab_background', 300, 65),
      theme_ntp_background: color.createImage(toolBar, 'theme_ntp_background', 20, 120),
      theme_tab_background_v: color.createImage(toolBar, 'theme_tab_background_v', 120, 120),
      theme_button_background: color.createImage(toolBar, 'theme_button_background', 30, 30)
    },
    colors: {
      frame: [23, 33, 43],
      toolbar: toolBar,
      tab_text: [94, 181, 247],
      tab_background_text: [118, 140, 158],
      bookmark_text: [118, 140, 158],
      ntp_background: [14, 22, 33],
      ntp_text: [94, 181, 247],
      ntp_link: [6, 55, 116],
      button_background: [36, 47, 61, 1]
    },
    tints: {
      buttons: [118/255, 140/255, 158/255]
    },
    properties: {
      ntp_background_alignment: "bottom",
      ntp_background_repeat: "no-repeat"
    }
  }
};


rimraf.sync('dist');
fs.mkdirSync('dist');
ncp('images', 'dist/images', () => {
  fs.writeFile('dist/manifest.json', JSON.stringify(data), 'utf8', () => {
    var output = fs.createWriteStream(__dirname + '/theme.zip');
    var archive = archiver('zip', {
      zlib: {level: 9} // Sets the compression level.
    });
    archive.pipe(output);
    archive.directory('dist/', false);
    archive.finalize();
  });
});

