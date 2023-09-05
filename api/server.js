const express = require("express");
const accountsRouters = require('./accounts/accounts-router')
const server = express();

server.use(express.json());


//server.use('*',(req,res)=>{ ... })：这是一个 Express.js 中间件，它捕获了所有未匹配到其他路由的请求。
//* 通配符表示匹配所有请求。这意味着如果客户端发送的请求不匹配服务器上的任何其他路由，将会执行此中间件。

server.use('/api/accounts',accountsRouters)
server.use('*',(req,res)=>{
    res.status(404).json({message:"not found"})
})

module.exports = server;
