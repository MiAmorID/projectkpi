const express = require('express');
const emplCtrl = require('./../controllers/employee');
const mlsCtrl = require('./../controllers/milestone');
const lblCtrl = require('./../controllers/label');
const pjctCtrl = require('./../controllers/project');
const trbCtrl = require('./../controllers/tribe');
const issueCtrl = require('./../controllers/issue');
const authCtrl = require('./../controllers/auth');
const titleCtrl = require('./../controllers/title');
const authLib = require('./../lib/auth');


module.exports = function() {
  const app = express.Router();
  app.group("/", (app) => {
    app.get('/', (req, res) => res.send("API") );
    app.group("/auth", (app) => {
      app.post("/login", authCtrl.login)
      app.post("/generate", authCtrl.generate)
      app.post("/update-password", authCtrl.updatePassword)
    })
    app.group("/", (app) => {
      app.use(authLib.check);
      app.get("/auth/user", authCtrl.getUser)
      app.group("/employee", (app) => {
        app.get("/", emplCtrl.index)
        app.get("/:id/get", emplCtrl.detail)
        app.post("/create", emplCtrl.create)
        app.post("/:id/update", emplCtrl.update)
      })
      app.group("/title", (app) => {
        app.get("/", titleCtrl.index)
        app.get("/:id/get", titleCtrl.detail)
        app.post("/create", titleCtrl.create)
        app.post("/:id/update", titleCtrl.update)
      })
      app.group("/milestone", (app) => {
        app.get("/", mlsCtrl.index)
        app.post("/sync", mlsCtrl.gitlab)
      })
      app.group("/label", (app) => {
        app.get("/", lblCtrl.index)
        app.post("/sync", lblCtrl.gitlab)
      })
      app.group("/project", (app) => {
        app.get("/", pjctCtrl.index)
        app.get("/:id/get", pjctCtrl.detail)
        app.post("/sync", pjctCtrl.gitlab)
        app.post("/:id/update", pjctCtrl.update)
      })
      app.group("/tribe", (app) => {
        app.get("/", trbCtrl.index)
        app.get("/:id/get", trbCtrl.detail)
        app.post("/create", trbCtrl.create)
        app.post("/:id/update", trbCtrl.update)
      })
      app.group("/issue", (app) => {
        app.get("/", issueCtrl.index)
        app.post("/sync", issueCtrl.sync)
      })
    })
  })
  // app.get('/', (req, res) => res.send("API") );
  return app;
};
