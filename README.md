# Project name: ZXSVM-back
(backend: NodeJS app)

[![Deploy Action Status](https://github.com/evasyuk/project-zxsvm/workflows/Node.js%20CI/badge.svg)](https://github.com/evasyuk/project-zxsvm/actions)

# Description
ZXSVM is the pet-project, which has several aims to hit:
1. For fun (to spend free time)
2. Template project to boost subsequent projects implementation
3. Demonstration of skills and experience 

"ZXSVM" is a meme from author's childhood: once you install your Windows XP or any other software it requires activation code. I remember that one code was starting with "ZXSVM". Don't really know why, but "ZXSVM" is carved in memory

# Dependencies
0. OS
    - OS X 10.14.6
1. node -v
    - v14.6.0
2. npm -v:
    - 6.14.6
3. firebase --version
    - 8.10.0

# Setup Firebase services
ref: https://firebase.google.com/docs/cli

0. install cli tools

1. login to Google account

2. init project

3. Generate new service key at "Firebase console, settings, Firebase Admin SDK"

4. Add service key to project and CI/CD(if necessary)

5. Upgrade project to paid plan(setup billing info) in order to use networking feature(and some other)
    - you can use Firebase console
    - you can use GCP console
    
# Installation (dev)
0. Get copy of sourcess
    - git clone "this repo"

1. Install dependencies
    - npm install
    - cd functions && npm install

2. Setup local Firebase project
	- firebase init
	- verify
		- functions/firebase-adminsdk.json
		- .firebaserc

3. Setup .env file
	- take a look at .env.example

4. Run development server
    - npm run serve

5. Test application manually
    - http://localhost:5001/<firebase-project-id>/us-central1/api/v1

# Usage
1. Create account or use existing one
    - (add screeenshot)

2. Log in the system using credentials
    - (add screenshot)

3. Click somewhere
    - (add screenshot)

# Features
1. CI/CD
    - GithubActions

2. Hosting
    - Firebase Functions

3. Testing
    - (..Pending..)

4. Tech stack
    - NodeJS environment
    - Koa
    - Firebase Functions
    - Firebase Firestore
    - Firebase FireAuth

5. Backend app features
    - versioning
    - protected routes
    - custom "action" system

# API documentation
1. Postman docs
	- https://bit.ly/336DaP0

# Examples
1. Live
    - https://bit.ly/2S87Rgh

2. Screenshots
    - (..Pending..)

# License
MIT

