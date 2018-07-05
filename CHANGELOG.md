#### 0.0.1 (2018-07-05)

##### Chores

*  add some colors on cli (172e7e3f)
*  add debugger on watch:server (665f88af)

##### Documentation Changes

*  add some documentation (b4cf213a)

##### New Features

* **error:**
  *  add 'date' error field validation (e21593cc)
  *  add 'os' attr (0482aac2)
* **user:**  create user entity (b7632d1a)
* **docker:**
  *  add redis to compose (613feb1c)
  *  docker-compose complete (214890a7)
  *  WIP docker integration (3a097d80)
* **redis:**  add redis. use for cache and jwt expiring (WIP) (4413afe4)
* **connection:**  better handle readyState; disconnect method (06706d2d)
*  move entities to entities folder, add constraint to generic in AController (eef7353b)
*  add new methods to AbstractController (5655a8e9)
*  add validations on post; new class to handle connection (61428c77)
* **configuration:**  configuration model/business/controller complete (c7b22a42)
* **typescript:**
  *  IError extends mongoModel (3a03764f)
  *  abstract class updated (c37400c6)
  *  new project structure, separeted by features (5e8b3b71)
  *  use interfaces in controllers (32f898bd)
  *  finish typescript setup (9bb5de7f)
* **middleware:**
  *  use moment to format logger (e8a4cb9c)
  *  updated middleware (2b190f18)
  *  add cors and logger (395b7f9e)
* **mongo:**
  *  adjust schema of ErrorModel (ca098c86)
  *  connection with mongo success (96265e47)
* **server:**  first commit!!! (83fbb16e)

##### Bug Fixes

*  id typee number to string because mongo uses string to the _id field (4620fd48)
*  error suppress (424c77a9)
*  use default import for ErrorModel (9fba0a99)
*  change env from js to json (f1b3d774)
* **middleware:**
  *  exception and 404 middlewares working (6c67e40e)
  *  don't put logger on production env (8e67407f)
* **mongoose:**  use a single mongo connection per request (94f07e87)
* **auth:**
  *  fix header when null (e79ba5c8)
  *  handle null config (e53a6f55)
  *  send blank authKey when don't have config (6b81434b)

##### Refactors

*  use express.Router() to generate routes (11144438)
*  change methods names; use server.route instead server.use('verb') (bca96811)
*  middleware and routes; trying to make excepction middleware work (c85106b3)
*  remove postChecking from business (ce717d7b)
* **typescript:**  initial setup for TS code (f62e914d)

##### Code Style Changes

*  beautify files (facde41a)

