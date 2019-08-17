import * as db from '../db/models';

export function userBankcard(userId) {
    return db.BankCard.findOne(
      {
        where: { holder_id: userId }
      });
}
