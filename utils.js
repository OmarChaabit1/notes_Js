const verifyNote = (image,note)=>{

    if( !note )
        return {state:false , msg:"The note Is required"}
    
    if( note.length <= 10)
        return {state:false , msg:"The note must contains at least 10 caracters "}
    
        return {state:true , msg:""}
}
const middleWareVerfication = (req,res,next)=>{
    let {image,note} = req.body 
    let {state,msg} = verifyNote(image,note)
    if(state)
        return next()
    res.status(400).send(msg)
}
module.exports = {
    verifyNote,middleWareVerfication
}
