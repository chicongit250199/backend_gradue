import db from '../db/models';

export const create = async ({
  userId, filename, filesize, filetype, originalname, userDocumentType
}) => {
  return db.FileUpload.create({
    user_id: userId,
    file_name: filename,
    file_size: filesize,
    file_type: filetype,
    original_name: originalname,
    user_document_type: userDocumentType,
    created_date: new Date()
  });
};


export const get = (id) => {
  return db.FileUpload.findByPk(id);
};

export const getUserFile = (userId, fileId) => {
  return db.FileUpload.findOne({
    where: { user_id: userId, id: fileId }
  })
};
