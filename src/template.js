const { makeHtmlAttributes } = require("@rollup/plugin-html");
const template = async ({ attributes, files, meta, publicPath, title }) => {
    const scripts = (files.js || [])
        .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
        })
        .join("\n");

    const links = (files.css || [])
        .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
        })
        .join("\n");

    const metas = meta
        .map((input) => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
        })
        .join("\n");

    return `<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    ${links}
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <canvas id="canvas1" class="wrapper" width="1200" height="600"></canvas>
    ${scripts}
  </body>
</html>`;
};

export default template;