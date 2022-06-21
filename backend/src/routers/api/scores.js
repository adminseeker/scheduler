const express = require("express");
const moment = require("moment")
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



/* 
    route : "/api/scores/date",
    desc : "get score by date",
    method: "GET"
*/

router.post("/date",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.json({"msg":"User Not Found!"})
        }
    
        let tasks = await Task.find({user:req.user.id})
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
        
        tasks=result


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
        let daily_score=0
        let completed=[]
        let pending=[]
        let in_progress=[]
        let timeout=[]
        tasks.forEach((task)=>{
            if(task.status=="completed"){
                daily_score+=task.score
                completed.push(task)
            }else if(task.status=="pending" ){
                daily_score+=0
                pending.push(task)
            }else if(task.status=="In Progress"){
                daily_score+=0
                in_progress.push(task)
            }else if(task.status=="Timeout"){
                daily_score-=task.score
                timeout.push(task)
            }
        })
        return res.json({date:req.body.date,"dailyScore":daily_score,completed,pending,in_progress,timeout})
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});



module.exports = router;

