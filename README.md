# SaySo Backend: Express

Hobby project to learn the Express Node.js framework, MongoDB, and Mongoose data-access library. This is a skeletal REST MicroService for a (Beta) blogging platform that authenticates using JWTs.

## Getting Started

* Clone this repo
* `npm install` - Dependencies
* `brew install mongodb-community` - Install Mongo
* `mongod --config /usr/local/etc/mongod.conf` - Runs it in the foreground.
* `npm run start` - Start the server.

Although, while developing, you'd do:

* `npm run dev` - Starts and monitors for code changes.

Stop the server at any time:

* `npm run stop`

## Code

### Dependencies

* [Express JS](https://github.com/expressjs/express) - Old faithful
* [express-jwt](https://github.com/auth0/express-jwt) - Express Middleware for JSON-Web-Token (JWT) Authentication
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Generates JWTs
* [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to JS
* [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`.
* [passport](https://github.com/jaredhanson/passport) - For handling user Authentication
* [slug](https://github.com/dodo/node-slug) - Encoding page titles into URL-friendly format

### Application Structure

* `app.js` - Entry point for the app. Initializes the Express server and connects it to MongoDB using Mongoose. Also wires up the Routes and Models.
* `config/` - Passport configuration and other Env vars.
* `routes/` - Route definitions for API.
* `models/` - Schema definitions for Mongoose models.

### Error Handling

In `routes/api/index.js`, there is error-handling middleware for handling Mongoose's `ValidationError`. Responds with a 422 HTTP Status and formats the response to have error messages the clients can understand.

### Tests

Postman Integration Tests are in the `tests/` dir. Run them like:

```
$ npm run test
```

### API Docs

![api-say-so-blog2](https://user-images.githubusercontent.com/214047/84197948-c9fbc180-aa70-11ea-94d0-8cf40ce19b44.png)

![api-say-so-blog](https://user-images.githubusercontent.com/214047/84197947-c9632b00-aa70-11ea-8488-31856c83e7f0.png)

### Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. There are two Middlewares in `routes/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.
