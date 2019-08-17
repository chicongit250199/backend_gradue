import express from 'express';
import log from '../config/winston';
import { isAuthenticated } from '../service/permission';
import { getAllUsers, getByIdUser, users } from '../service/admin/admin-user.service';

const adminUserRouter = express.Router();

adminUserRouter.get('/', isAuthenticated, (req, res, next) => {
  log.info(JSON.stringify(req.query));

  let page;
  let size;
  let order;

  try {
    page = parseInt(req.query.page, 10);
    if (Number.isNaN(page)) {
      page = 1;
    }
  } catch (ignore) {
    page = 1;
  }

  try {
    size = parseInt(req.query.size, 10);
    if (Number.isNaN(size)) {
      size = 10;
    }
  } catch (ignore) {
    size = 10;
  }

  if (!req.query.sort) {
    order = [
      ['id', 'asc']
    ];
  } else {
    order = [];
    const [column, dir] = req.query.sort.split(':');
    order.push([column, dir]);
  }

  users(req.query, order, (page - 1) * size, size)
    .then((t) => {
      res.status(200).json(t);
    }, next);
});

adminUserRouter.get('/:id(\\d+)', isAuthenticated, (req, res, next) => {
  return getByIdUser(req.params)
    .then((user) => {
      res.json(user);
    }, next);
});

adminUserRouter.get('/users/search', isAuthenticated, (req, res, next) => {
  return getAllUsers(req.user.id, req.query)
    .then((user) => {
      res.json(user);
    }, next);
});


export { adminUserRouter };
