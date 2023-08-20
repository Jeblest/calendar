Firebase Deployment

On blank page errors:
-Check the public file in firebase.json it should be dist
-If have some type/html error then go to dist/index.html and check the links for css and js.
-If you have page not found then make sure in firebase.json file there is a rewrites part under hosting 