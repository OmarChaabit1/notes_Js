// inputs 
const noteInput = document.getElementById("noteInput")
const imageInput = document.getElementById("imageInput")
// buttons 
const resetBtn = document.getElementById("resetBtn")
const submitBtn = document.getElementById("submitBtn")
// erro 
const errorNoteInput = document.getElementById("errorNoteInput")
// count 
const countnotesSpan = document.getElementById("countnotesSpan")
// container 
const notesDiv = document.getElementById("notesDiv")
// url 

submitBtn.setAttribute("disabled","")

const reset =()=>{
    noteInput.value = ""
    imageInput.value = ""
}
resetBtn.addEventListener('click',()=>{
    reset()
})
noteInput.addEventListener('input',()=>{
    let value = noteInput.value 
    if(!value) {
        errorNoteInput.innerText = " the note is required  "
        return submitBtn.setAttribute("disabled","")

    } 
    if(value.length <= 10){
        errorNoteInput.innerText = " The note must contains at least 10 caracters "
        return submitBtn.setAttribute("disabled","")

    }
    errorNoteInput.innerText = ""
    return submitBtn.removeAttribute("disabled","")
    
})
const  addnotesToDiv = (data)=>{
    let container = document.createElement("div")

    let span = document.createElement("span")
    let div = document.createElement("div")
    let img = document.createElement("img")
    let btnDelete = document.createElement("button")
    let btnSwitch = document.createElement("button")

    container.appendChild(span)
    container.appendChild(div)
    container.appendChild(img)
    container.appendChild(btnDelete)
    container.appendChild(btnSwitch)
    

    container.classList.add("note")
    // container.classList.add(data.note+"")
    // For the span
    span.classList.add("idnote") 
    span.innerText = document.getElementsByClassName("idnote").length+1
    // For the divContent 
    div.classList.add("content") 
    div.innerText = data.note

    // for the image : 
    if (data.image) {
        img.classList.add("images");
        img.src = "/images/" + data.image;
    }


    countnotesSpan.innerText = parseInt(countnotesSpan.innerText) +1

    // For the Buttons 
    btnDelete.classList.add("delete")
    btnDelete.innerText="Delete"

    btnDelete.addEventListener('click',()=>{
        const xhr = new XMLHttpRequest();
        xhr.open("delete",urlApi + '/' + data.id,true)
        xhr.addEventListener('load ',()=>{
            if(xhr.status != 200 )
                return alert("error" +xhr.response)
            container.remove()
            updateNumbers()
            countnotesSpan.innerText = parseInt(countnotesSpan.innerText) -1
        })  
        xhr.addEventListener('error',()=>{
          alert('Error removing Data')
        })
        xhr.send()
        location.reload()
    })

    btnSwitch.classList.add("switch")
    btnSwitch.innerText="Update"
    btnSwitch.addEventListener('click',()=>{
        
    })
    notesDiv.appendChild(container)
}
const urlApi = "http://127.0.0.1:3000/notes";
const loadnote = ()=>{
    notesDiv.innerHTML =""
    const xhr = new XMLHttpRequest()
    xhr.open("get",urlApi,true)
    xhr.addEventListener('load',()=>{
        if(xhr.status != 200)
            return alert("Error"+xhr.response)
        let data = JSON.parse(xhr.response)
        data.forEach(ele =>addnotesToDiv(ele))
    })
    xhr.addEventListener('error',()=>{
        return alert("Error")
    })
    
    xhr.send()
}
loadnote()
submitBtn.addEventListener('click',()=>{
    let noteValue = noteInput.value
    let imageValue = imageInput.value
    let dataToSend = {
        note:noteValue,
        image:imageValue
    }
    dataToSend = JSON.stringify(dataToSend)
    const xhr = new XMLHttpRequest()
    xhr.open("post",urlApi,true)
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.addEventListener('load',()=>{
        if(xhr.status == 201)
        {
            let data = JSON.parse(xhr.response)
            addnotesToDiv(data)
        }  
        else{
            alert(xhr.response)
        }
    })
    xhr.addEventListener('error',()=>{
        return alert("Error")
    })
    xhr.send(dataToSend)
    reset()
})

const updateNumbers = ()=>{
    let spans = [...document.getElementsByClassName("idnote")]
   spans.forEach((ele,index)=>ele.innerText=index+1)
}

