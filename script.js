// this updates the list on the server everytime
function todoList() {
    var xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var list = JSON.parse(this.responseText);
        for (let i = 0; i < list.length; i++) {
          newTodo(list[i]);
        }
      }
    };
  
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "1c2fe1-e87967-26298b-0e7c21-d494c0");
    xhttp.send();
  }
  
  todoList();
  
  // Create a new list item when clicking on the "Add" button
  function newTodo(input) {
    var todo = document.createElement("li");
    todo.innerHTML = input.text;
    var inputValue = document.getElementById("myInput").value;
    var value = document.createTextNode(inputValue);
    todo.appendChild(value);
  
    var todoDiv = document.getElementById("myUL");
    todo.setAttribute("id", input.id);
    todo.setAttribute("text", input.text);
    todoDiv.appendChild(todo);
  
    document.getElementById("myInput").value = "";
  
    // Create a x button for delete
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    todo.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
      };
    }
  
    // Create a check box
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", input.id);
    checkBox.style.position = "absolute";
    checkBox.style.top = "17px";
    checkBox.style.left = "10px";
  
    // This will make the list checked elements stay in the previous state
  
    if (input.completed == true) {
      todo.style.textDecoration = "line-through";
      checkBox.setAttribute("checked", true);
      checkBox.addEventListener("click", function (e) {
        checkBox.setAttribute("checked", false);
        input.completed = false;
      });
    } else {
      todo.style.textDecoration = "none";
      checkBox.addEventListener("click", function (e) {
        checkBox.setAttribute("checked", true);
        input.completed = true;
      });
    }
  
    todo.appendChild(checkBox);
  
    checkBox.addEventListener("click", function (event) {
      checkTodo(input.id);
    });
    span.addEventListener("click", function (event) {
      deleteTodo(input.id);
    });
  }
  
  // Get the input field
  var input = document.getElementById("myInput");
  
  // Execute a function when the user presses a key on the keyboard
  input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("addBtn").click();
    }
  });
  
  document.getElementById("addBtn").addEventListener("click", function (event) {
    addTodo();
  });
  
  // add the task to the api
  function addTodo() {
    var input = { text: document.getElementById("myInput").value };
  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var todo = JSON.parse(this.responseText);
        newTodo(todo);
      } else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };
  
    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "1c2fe1-e87967-26298b-0e7c21-d494c0");
    xhttp.send(JSON.stringify(input));
  
    document.getElementById("myInput").value = "";
  }
  
  // Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByTagName("li");
  for (let i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
  
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
      deteteTodo(document.getElementById("id"));
    };
  }
  
  // Click on a close button to hide the current list item
  function deleteTodo(id) {
    var todoId = id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById(todoId).remove();
        console.log(todoId);
      } else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };
  
    xhttp.open("DELETE", "https://cse204.work/todos/" + todoId, true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "1c2fe1-e87967-26298b-0e7c21-d494c0");
    xhttp.send();
  }
  
  // When clicking on the subject, add a check mark and cross the subject
  function checkTodo(todoId) {
    var xhttp = new XMLHttpRequest();
    var stat = { completed: true };
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(todoId);
  
        if (document.getElementById(todoId).completed) {
          document.getElementById(todoId).style.textDecoration = "none";
          document.getElementById(todoId).completed = false;
          document.getElementById(todoId).setAttribute("checked", false);
        } else {
          document.getElementById(todoId).style.textDecoration = "line-through";
          document.getElementById(todoId).completed = true;
          document.getElementById(todoId).setAttribute("checked", true);
        }
      } else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };
  
    xhttp.open("PUT", "https://cse204.work/todos/" + todoId, true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "1c2fe1-e87967-26298b-0e7c21-d494c0");
    xhttp.send(JSON.stringify(stat));
  }
  