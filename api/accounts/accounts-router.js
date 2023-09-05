const router = require('express').Router() 
const Accounts =require('./accounts-model')
const { checkAccountPayload, 
        checkAccountNameUnique,
         checkAccountId } =require('./accounts-middleware')


router.get('/', async (req, res, next) => {
  try{
    const allAccounts = await Accounts.getAll()
    res.status(200).json(allAccounts)
    
  }catch(err){
    next(err)
  }
   
})


router.get('/:id', checkAccountId,async (req, res) => {
  //since the checkAccountId middleware has already check the whole situation,so we don't need add 'try catch'in this endpoint
    res.status(200).json(req.account)

})


router.post('/', checkAccountPayload, checkAccountNameUnique,async (req, res, next) => {
  try {
    
    const newItem=await Accounts.create({'name':req.body.name.trim(),'budget':req.body.budget})
   
    res.status(201).json(newItem)

  } catch (err) {
    next(err)
  }
})


router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const updateItem=await Accounts.updateById(req.params.id,req.body)
    res.status(200).json(updateItem)

  }catch(err){
    next(err)
  }
});


router.delete('/:id', checkAccountId, async(req, res, next) => {
  try{
     await Accounts.deleteById(req.params.id)
    res.status(200).json(req.account)
  } catch (err) {
    next(err)
  }
  

})


router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message:err.message
  })
})

module.exports = 
router; 