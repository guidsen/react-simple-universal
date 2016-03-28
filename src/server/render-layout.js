export default ({ rootMarkup, initialState }) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>My Cool React App!</title>
      </head>
      <body>
        <div id='root'>${rootMarkup}</div>
        <script>
          window.BOOTSTRAP_CLIENT_STATE = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/index.js"></script>
      </body>
    </html>
  `;
};
