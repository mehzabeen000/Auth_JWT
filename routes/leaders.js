const express = require('express');
const leadersRouter = express.Router();
const mongoose = require('mongoose');
const leaders = require('../models/leaders');

leadersRouter.use(express.json());



leadersRouter.route('/')
.get((req,res,next)=>{
    leaders.find({})
    .then((d)=>{
        res.setHeader('Content-Type','application/json');
        res.json(d);
    }).catch(err=>{
        next(err) 
    })
})

.post((req,res,next)=>{
    console.log(leaders)
    leaders.create(req.body)
    .then((d)=>{
        console.log('Leaders created',d)
        res.setHeader('Content-Type','application/json');
        res.json(d);
    }).catch(err=>{
        next(err)
    })
})

.put((req,res,next)=>{
    res.send('Put operation not supported on leaders')
})

.delete((req,res,next)=>{
    leaders.remove({})
    .then((resp)=>{
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }).catch(err=>{
        next(err)
    })
})

leadersRouter.route('/:leadersId')
.get((req,res,next)=>{
    leaders.findById(req.params.leadersId)
    .then((d)=>{
        res.setHeader('Content-Type','application/json');
        res.json(d);
    }).catch(err=>{
        next(err)
    })
})

.post((req,res,next)=>{
    res.send('Posh operation not supported on /leaders/'+req.params.leadersId)
})

.put((req,res,next)=>{
    leaders.findByIdAndUpdate(req.params.leadersId,{$set: req.body},{new:true})
    .then((d)=>{
        // console.log('     created',d)
        res.setHeader('Content-Type','application/json');
        res.json(d);
    }).catch(err=>{
        next(err)
    })
})

.delete((req,res,next)=>{
    leaders.findByIdAndRemove(req.params.leadersId)
    .then((resp)=>{
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }).catch(err=>{
        next(err)
    })
})


module.exports = leadersRouter;