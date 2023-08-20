Firebase Deployment

On blank page errors:
-Check the public file in firebase.json it should be dist
-If you have some type/html error then go to dist/index.html and check the links for css and js.
-If you have page not found then make sure in firebase.json file there is a rewrites part under hosting 


{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },

  "emulators": {
    "hosting": {
      "port": 5000
    },
    "ui": {
      "enabled": true
    },
    "singleProjectMode": true
  }
}
working json
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <base href="/">
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <title>Calendar</title>
    <script type="module" crossorigin src="assets/index-25efd88f.js"></script>
    <link rel="stylesheet" href="assets/index-e87fdc24.css">
  </head>
  <body>
    <div id="root"></div>
    
  </body>
</html>
working index.html
dist is the same just paste this