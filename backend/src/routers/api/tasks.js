const express = require("express");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Task = require("../../models/Task");
const moment = require("moment")

const router = express.Router();



/* 
    route : "/api/tasks",
    desc : "Add task",
    method: "POST"
*/

router.post("/",auth,async (req,res)=>{
    try {

        const task = new Task(req.body);
        task.user=req.user.id
        await task.save();
        res.json({"msg":"Task Added!"})
    } catch (error) {
        res.status(500).send(error);   
    }
});

/* 
    route : "/api/tasks",
    desc : "get tasks",
    method: "GET"
*/

router.get("/",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.json([])
        }
    
        const tasks = await Task.find({user:req.user.id})
        if(tasks.length==0){
            return res.json([])
        }
        res.json(tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});


/* 
    route : "/api/tasks/task_id",
    desc : "get task by id",
    method: "GET"
*/

router.get("/:id",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.json({"msg":"User Not Found!"})
        }
    
        const task = await Task.findOne({user:req.user.id,_id:req.params.id})
        if(!task){
            return res.json({"msg":"No Task Found!"})
        }
        res.json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

/* 
    route : "/api/tasks/task_id",
    desc : "get tasks by date",
    method: "POST"
*/

router.post("/date",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.json([])
        }
    
        const tasks = await Task.find({user:req.user.id})
        let date=req.body.date
        let year=date.split("-")[0]
        let month=date.split("-")[1]
        let day=date.split("-")[2]
        let result=[]
        tasks.forEach((task)=>{
            if(moment(task.start_time).year()==year && moment(task.start_time).month()+1==month && moment(task.start_time).date()==day ){
                result.push(task)
            }
        })
        if(tasks.length==0){
            return res.json([])
        }
        result.sort((i,j)=>new Date(i.start_time)-new Date(j.start_time))
        res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

/* 
    route : "/api/tasks/task_id",
    desc : "Update task",
    method: "PATCH"
*/

router.patch("/:id",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.json({"msg":"User Not Found!"})
        }
        const updates=req.body
        const editTask = await Task.findOneAndUpdate({_id:req.params.id,user:req.user.id},updates,{new:true})    
        if(!editTask){
            return res.json({"msg":"Task Update Failed!"})
        }
        res.json({"msg":"Task Updated!"});
    } catch (error) {
        if (error.name=='CastError'){
            return res.status(404).json({"msg":"Task Update Failed!"})
        }
        console.log(error);
        return res.status(500).send();
    }
});


/* 
    route : "/api/tasks/task_id",
    desc : "Delete task",
    method: "DELETE"
*/

router.delete("/:id",auth,async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
           return res.json({"msg":"User Not Found!"})
        }
        await Task.deleteOne({_id:req.params.id,user:req.user.id})
        return res.json({"msg":"Task removed Successfully!"});
        
    } catch (error) {
        if (error.name=='CastError'){
            return res.status(404).json({"msg":"Task Delete Failed!"})
        }
        console.log(error);
        res.status(500).send();
    }
});




module.exports = router;

