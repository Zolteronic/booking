import express from "express";
import getUsers from "../services/getUsers.js";
import findUserById from "../services/findUserById.js";
import createUser from "../services/createUser.js";
import editUser from "../services/editUser.js";
import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";
import auth from "../Middleware/auth.js";
import deleteUser from "../services/deleteUser.js";

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { name, email, username, id } = req.query;
      const users = await getUsers(name, email, username, id);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await findUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.post("/", auth, async (req, res, next) => {
  try {
    const { username, password, name, email, phonenumber, pictureURL } =
      req.body;
    const user = await createUser(
      username,
      password,
      name,
      email,
      phonenumber,
      pictureURL
    );
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phonenumber, pictureURL } =
        req.body;
      const user = await editUser(
        id,
        username,
        password,
        name,
        email,
        phonenumber,
        pictureURL
      );
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await deleteUser(id);
      res.status(200).json({ message: "User deleted", deletedUser });
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

export default router;
