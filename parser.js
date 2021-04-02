module.exports = {
  onWillParseMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {
      var urls = [
        // "https://gist.githubusercontent.com/BrxndxnP/43ab2fa38b5b49d373bf2177662cbd89/raw/1bf58c9065e23830092f2f938aeb09b43ad4e510/markdown-extension.js",
        "https://raw.githubusercontent.com/BrxndxnP/Markdown-Preview-Extensions/main/markdown-preview-extension.js",
      ];

      for (let i = 0; i < urls.length; i++) {
        const path = urls[i];
        markdown = markdown + `

@import "${path}" {cmd hide}

        `;
      }

      return resolve(markdown);
    })
  },
  onDidParseMarkdown: function (html, { cheerio }) {
    return new Promise((resolve, reject) => {
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
