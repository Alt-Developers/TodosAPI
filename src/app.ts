import express, { NextFunction } from "express";
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use(async (req, res, next) => {
  req.body.user = await prisma.user.findFirst({
    where: { id: req.headers.authorization },
  });

  next();
});

app.post("/signup", async (req, res) => {
  const { fName, lName, email, password } = req.body;

  const result = await prisma.user.create({
    data: {
      email: email,
      fName: fName,
      lName: lName,
      password: password,
    },
  });

  return res.json({
    result,
  });
});

app.post("/new-list", async (req, res) => {
  const { name, desc } = req.body;

  const newPost = await prisma.user.update({
    where: {
      id: req.headers.authorization,
    },
    data: {
      TodoList: {
        create: {
          id: uuid(),
          name: name,
          desc: desc,
        },
      },
    },
  });

  const userPost = await prisma.user.findFirst({
    where: {
      id: req.headers.authorization,
    },
    include: {
      TodoList: true,
    },
  });

  if (!userPost) return res.json("user not found.");

  return res.json({
    userall: userPost.TodoList,
  });
});

app.listen(8000);
