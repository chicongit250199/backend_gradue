import * as db from '../../db/models';

export function users(search, order, offset, limit) {
  let where = {};
  const { Op } = db.Sequelize;

  if (search) {
    if (search.user) {
      where = {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${search.user}%`
            }
          },
          {
            email: {
              [Op.like]: `%${search.user}%`
            }
          },
          {
            phone: {
              [Op.like]: `%${search.user}%`
            }
          }
        ]
      };
    }
  }

  return db.User.findAndCountAll({
    order,
    where,
    offset,
    limit
  });
}

export function getByIdUser({ id }) {
  return db.User.findByPk(id);
}


export function getAllUsers (userId, search) {

  let where = {};

  if (search.search && search.search.length) {
    where = {
      [db.Sequelize.Op.or]: [
        {
          phone: {
            [db.Sequelize.Op.like]: `%${search.search}%`
          }
        }, {
          username: {
            [db.Sequelize.Op.like]: `%${search.search}%`
          }
        }
      ]
    };
  }
  return db.User.findAll({
    where,
    attributes: ['id', 'phone', 'username']
  });

}
