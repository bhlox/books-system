# Books system

A simple app that logs a book's stocks, price and details. 
The user is able to create a book listing and view that listing.
User can also edit that listing's information and delete it from the collection.

It has a simple authentication managed by jwt(jsonwebtokens).
This tokens are stored in a localstorage and is verified in the client side.
Screen will throw an error if that token is invalid. 
The client will also check if that token is expired(expires in 1hr) or not.






## Demo Credentials

If hesitant to register, you may use this credentials for testing features of the app.

email: user@listofusers.com

password: user123


## Installation

Navigate to server folder

```bash
  npm install
  cd server
  npm run start
```


Navigate to client folder

```bash
  npm install
  cd client
  npm run start
```
