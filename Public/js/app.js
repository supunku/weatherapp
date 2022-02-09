



const form = document.querySelector("form");
const message1 = document.querySelector(".message-1");
const message2 = document.querySelector(".message-2");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    message1.textContent= "Loading....."
    message2.textContent="";
    message1.classList.remove("error");

    const loactionInput = document.querySelector("#location");

    const address = loactionInput.value;
    if(address.length===0){
        message1.textContent = "Please provide a valid location"
        message1.classList.add("error");
    }else{
        fetch("/weather?address="+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error;
            message1.classList.add("error");
        }else{
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        }
    })
})
    }
})


