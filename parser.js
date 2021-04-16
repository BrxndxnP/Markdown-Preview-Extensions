module.exports = {
  onWillParseMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {

      /**
       * Import js files
       */
      var urls = [
        "https://raw.githubusercontent.com/BrxndxnP/Markdown-Preview-Extensions/main/scripts/toc.js",
        "https://raw.githubusercontent.com/BrxndxnP/Markdown-Preview-Extensions/main/scripts/codeblock.js",
        // "https://raw.githubusercontent.com/BrxndxnP/Markdown-Preview-Extensions/main/scripts/table-cell-visibility.js",
      ];

      for (let i = 0; i < urls.length; i++) {
        const path = urls[i];
        markdown = markdown + `\r\n\r\n@import "${path}" {cmd hide}\r\n\r\n`;
      }


     /**
      * Allow centering content by using a comment tags
      * 
      * Example: 
      *    <!-- <center> -->
      * 
      *    markdown content
      * 
      *    <!-- </center> -->
      */
      markdown = markdown.replace(/<\!--[ \t]+<center>+[ \t]+-->/gm, ($0) => '\r\n\r\n<div class="block-center">\r\n\r\n');
      markdown = markdown.replace(/<\!--[ \t]+<\/center>+[ \t]+-->/gm, ($0) => '\r\n\r\n</div>\r\n\r\n');

      /**
       * Allow aligning content side by side by using a comment tags
       * 
       * Example: 
       * 
       *    <!-- <horizontal> -->
       *      <!-- <horizontal-part> -->
       * 
       *        Content on the left side
       * 
       *      <!-- </horizontal-part> -->
       *      <!-- <horizontal-part> -->
       * 
       *        Content on the right side
       * 
       *      <!-- </horizontal-part> -->
       *    <!-- <horizontal> -->
       */
      markdown = markdown.replace(/<\!--[ \t]+<horizontal>+[ \t]+-->/gm, ($0) => '\r\n\r\n<div class="block-horizontal">\r\n\r\n');
      markdown = markdown.replace(/<\!--[ \t]+<\/horizontal>+[ \t]+-->/gm, ($0) => '\r\n\r\n</div>\r\n\r\n<div style="clear:both;"><div>\r\n\r\n');
      markdown = markdown.replace(/<\!--[ \t]+<horizontal\-part>+[ \t]+-->/gm, ($0) => '\r\n\r\n<div class="block-horizontal-part">\r\n\r\n');
      markdown = markdown.replace(/<\!--[ \t]+<\/horizontal\-part>+[ \t]+-->/gm, ($0) => '\r\n\r\n</div>\r\n\r\n');

      return resolve(markdown);
    })
  },
  onDidParseMarkdown: function (html, { cheerio }) {
    return new Promise((resolve, reject) => {

      // Remove '-' from table tags in the preview
      html = html.replace(/<td>-<\/td>/gm, ($0) => $0.replace('-', ''));
      return resolve(html)
    })
  },
  onWillTransformMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {
      return resolve(markdown);
    });
  },
  onDidTransformMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {
      return resolve(markdown);
    });
  }
}