export default ({ body, title }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="/assets/index.css" />
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      <script src="/assets/manifest.js"></script> 
      <script src="/assets/vendor.js"></script> 
      <script src="/assets/app.js"></script>
    </html>
    `;
};