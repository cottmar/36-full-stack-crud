## Description
The primary task of the application is hooking up a back-end application to a front-end. The application is full CRUD for a single resource of the backend, using React/Redux best practices. 
Reporter and Thunk middleware was added to the Front End

## Architecture
BACK END		
db
src	
  __test__
  lib	create working.	
  model	create working.	
  route	delete working	
  main.js
.babelrc	
.gitignore
index.js	
package-lock.json	
package.json

FRONT END
src	
  actions	
  components	
  lib		
  reducer		
  utils		
  main.js
.babelrc		
.eslintignore		
.eslintrc.json		
.gitignore		
package-lock.json		
package.json		
webpack.common.js		
webpack.dev.js 

## FrontEnd README

Front-End .env vars:
API_URL=http://localhost:3000
NODE_ENV=development

## Backend README

Back-End .env vars:
PORT=3000
MONGODB_URI=mongodb://localhost/somedbname
NODE_ENV=dev
