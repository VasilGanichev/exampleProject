const userClass = {
    userArray: [],
    getArray: function () {
      return this.userArray;
    },
    addItemToArray: function (obj) {
      obj.id = this.generateId();
      this.userArray.push(obj);
    },
    removeFromArray: function (id) {
      this.userArray = this.userArray.filter(
        (item) => item.id !== id
      );
    },
    generateId: function () {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let id = "";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars[randomIndex];
      }
      return id;
    }
  };
  
  //IIFE
  function initialize() {
    let userObj1 = {
      id: userClass.generateId(),
      firstName: "Georgi",
      lastName: "Shishkov"
    };
    let userObj2 = {
      id: userClass.generateId(),
      firstName: "Georgi",
      lastName: "Kotov"
    };
    userClass.addItemToArray(userObj1);
    userClass.addItemToArray(userObj2);
  }
  initialize();
  
  //const userArr = [userObj1,userObj2];
  
  const tableBtn = document.getElementById("tableGenerator");
  tableBtn.addEventListener("click", (e) => {
    const container = document.getElementById("table-container");
    container.innerHTML = "";
    const table = document.createElement("table");
    initializeTable(table);
  
    for (let userObj of userClass.getArray()) {
      const row = createTableRow(userObj);
      table.appendChild(row);
    }
    container.appendChild(table);
  });
  
  const form = document.getElementById("form-example");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    document.getElementById("greetings-header").innerHTML =
      "ZDR " + firstName + " " + lastName + "!";
    let userObj = {
      firstName: firstName,
      lastName: lastName
    };
    userClass.addItemToArray(userObj);
  });
  
  function removeUserAndRefreshTable(event) {
    console.log(event.id);
    const userId = event.id.replace("btnDelete-", "");
  
    userClass.removeFromArray(userId);
    document.getElementById(userId).innerHTML = "";
  }
  function initializeTable(table) {
    table.setAttribute("id", "userTable");
    table.setAttribute("class", "table");
  
    const rowHeader = document.createElement("tr");
    const idCol = document.createElement("th");
    idCol.textContent = "Id";
    const firstNameCol = document.createElement("th");
    firstNameCol.textContent = "First Name";
    const lastNameCol = document.createElement("th");
    lastNameCol.textContent = "Last Name";
    const actionCol = document.createElement("th");
    actionCol.textContent = "Actions";
    rowHeader.appendChild(idCol);
    rowHeader.appendChild(firstNameCol);
    rowHeader.appendChild(lastNameCol);
    rowHeader.appendChild(actionCol);
    table.appendChild(rowHeader);
  }
  function createDeleteButton(userobj) {
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "btnDelete-" + userobj.id);
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("class", "btn btn-danger");
    deleteBtn.setAttribute("onClick", "removeUserAndRefreshTable(this)");
    return deleteBtn;
  }
  
  function ourFirstButton() {
    console.log("hi");
    const button = document.getElementById("ourFirstBtn");
    button.innerHTML = "I was Clicked!";
  }
  function createTableRow(userObj) {
    const row = document.createElement("tr");
    const id = document.createElement("td");
    const fName = document.createElement("td");
    const lName = document.createElement("td");
    const action = document.createElement("td");
    const deleteBtn = createDeleteButton(userObj);
    action.appendChild(deleteBtn);
  
    fName.textContent = userObj.firstName;
    lName.textContent = userObj.lastName;
    id.textContent = userObj.id;
    row.setAttribute("id", userObj.id);
    row.appendChild(id);
    row.appendChild(fName);
    row.appendChild(lName);
    row.appendChild(action);
    return row;
  }
  
  function fetchEmployees() {
    return new Promise((resolve, reject) => {
      fetch('https://dummy.restapiexample.com/api/v1/employees')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
  
  // Usage
  fetchEmployees()
    .then(data => {
      console.log('Employee Data:', data);
    })
    .catch(error => {
      console.error('Error fetching employees:', error);
    });