const db=require('./../../data/db-config')

//since getAll() defines a function,so we can async this promise when we call this function
const  getAll = () => {
    return  db('accounts')
   
}

const getById = id => {
  return db('accounts').where('id',id).first()
}

const create =async account => {
  const [postNum]=await db('accounts').insert(account)
  const newAccount=getById(postNum)
  return newAccount
}

const updateById = async (id, account) => {
  await db('accounts').where("id",id).update(account)
  return getById(id)
}

const deleteById =async id => {
 
  return await db('accounts').where('id',id).del()
 
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
