let list = document.getElementById("list");
let input = document.getElementById("inPut");
console.log(firebase)





function addItems() {
    if (document.getElementById("inPut").value.length == 0) {
        alert("enter some value")
    } else {
     
let key = firebase.database().ref('Todos').push().key;
let todo = {
    key:key,
    value:input.value
}
let value = firebase.database().ref('Todos').child(key).set(todo)


   
    
        input.value = ""
    }
}



//showing realtime data
firebase.database().ref('Todos').on('child_added',function(data){
//  Creating List
        let li = document.createElement("li")
        let liText = document.createTextNode(data.val().value)
        li.setAttribute("class","lists")
        list.appendChild(li);
        li.appendChild(liText)
        
    
       



        //Delete Btn
        let delBTn = document.createElement("button")
        let delText = document.createTextNode("Delete Item")
        delBTn.setAttribute("class", "deleteBtn")
        delBTn.setAttribute("onclick", "delItem(this)")
        delBTn.setAttribute("id",data.val().key)
        delBTn.appendChild(delText);
        li.appendChild(delBTn)


        //Edit Btn
        let editBTn = document.createElement("button")
        let editText = document.createTextNode("Edit")
        editBTn.setAttribute("class", "editBtn")
        editBTn.setAttribute("id",data.val().key)
        editBTn.setAttribute("onclick", "editItem(this)")
        editBTn.appendChild(editText);
        li.appendChild(editBTn)
})

//Delete all items
function deleteItems(){
firebase.database().ref('Todos').remove()
    list.innerHTML = "";
}

//Edit item
function editItem(e) {
    let newValue = prompt("Input New Value", e.parentNode.firstChild.nodeValue)
    let newtxt = {
        key:e.id,
        value:newValue
    }

    firebase.database().ref('Todos').child(e.id).set(newtxt);
    e.parentNode.firstChild.nodeValue = newValue;

}


//Delete item
function delItem(e) {
    firebase.database().ref('Todos').child(e.id).remove()
    e.parentNode.remove()
}