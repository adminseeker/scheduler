const express = require("express");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Task = require("../../models/Task");

const router = express.Router();


/* 
    route : "/api/scores",
    desc : "get score",
    method: "GET"
*/

router.get("/total",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.json({"msg":"User Not Found!"})
        }
    
        const tasks = await Task.find({user:req.user.id})
        if(tasks.length==0){
            return res.json({"msg":"No Tasks Found!"})
        }

        tasks.forEach(async (task)=>{
            if(new Date()>task.end_time && task.status!="completed"){
                task.status="Timeout"
                await task.save()
            }else if(new Date()>task.start_time && new Date()<=task.end_time && task.status!="completed"){
                task.status="In Progress"
                await task.save()   
            }
        })
        
        // ["completed","pending","In Progress","Timeout"]
        let total_score=0
        let completed=[]
        let pending=[]
        let in_progress=[]
        let timeout=[]
        tasks.forEach((task)=>{
            if(task.status=="completed"){
                total_score+=task.score
                completed.push(task)
            }else if(task.status=="pending" ){
                total_score+=0
                pending.push(task)
            }else if(task.status=="In Progress"){
                total_score+=0
                in_progress.push(task)
            }else if(task.status=="Timeout"){
                total_score-=task.score
                timeout.push(task)
            }
        })
        return res.json({"totalScore":total_score,completed,pending,in_progress,timeout})
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});







module.exports = router;

