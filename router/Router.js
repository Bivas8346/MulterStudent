const express=require('express')
const route=express.Router()
const homeController=require('../controller/controller')

route.get('/',homeController.home)
route.get('/form/add',homeController.form)
route.post('/add/create',homeController.create)
route.get('/edit/:id',homeController.edit)
route.post('/update_student',homeController.update);
route.get('/delete/:id', homeController.delete);

module.exports=route;