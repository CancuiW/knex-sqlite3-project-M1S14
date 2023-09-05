const Accounts=require('./accounts-model')
const db=require('./../../data/db-config')
 
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const {name,budget}=req.body
  const errM={status:400}
  if(name===undefined||budget===undefined){
    errM.message = "name and budget are required" 
    
  }else if(typeof name!=='string'){
    errM.message = "name of account must be string"
    
  } else if (name.trim().length < 3 || name.trim().length > 100){
    errM.message = "name of account must be between 3 and 100"
    
  }else if(typeof budget !=='number'||isNaN(budget)){
    errM.message = "budget of account must be a number"
   
  } else if (budget < 0 || budget> 1000000){
    errM.message = "budget of account is too large or too small"
    
  }

  if(errM.message){
    next(errM)
  }else{
    
    next()
  }
       

}
// - `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` 
//if the _trimmed_ `req.body.name` already exists in the database

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
  
    const nameOfDb = await db("accounts").where('name', req.body.name.trim()).first()
    if (nameOfDb) {
      next({ status: 400, message: "that name is taken" })
    }else{
      next()
    }

  }catch(err){
    next(err)
  }
  

}

exports.checkAccountId =async (req, res, next) => {
  try{
    const account=await Accounts.getById(req.params.id)
    if(account){
      req.account=account
      next()
    }else{
      next({status:404,message:'account not found'})
    }


  }catch(err){
    next(err)
  }
}
