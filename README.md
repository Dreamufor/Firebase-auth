# Firebase-auth

##Use custom claims with cloud function 
npm install functions

    functions/index.js

firebase deploy --only functions
     console>firebase->unctions



firebase rules
```
allow write: if request.auth.token.admin == true;
```
