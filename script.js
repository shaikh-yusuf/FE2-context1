// Initial data array
const data = [
    { name: "john", age: 24, profession: "developer" },
    { name: "jane", age: 27, profession: "admin" },
    { name: "sarah", age: 30, profession: "developer" },
  ];
  
  // Print Developers (`PrintDeveloper` function)
  function printDevelopers(dataArray) {
    console.log("Developers:");
    dataArray.forEach((person) => {
      if (person.profession === "developer") {
        console.log(`Name: ${person.name}, Age: ${person.age}`);
      }
    });
    console.log("------------------------------");
  }
  
  // Add Data (`addData` function)
  function addData(dataArray) {
    const name = prompt("Enter name:");
    const age = parseInt(prompt("Enter age:"));
    const profession = prompt("Enter profession:");
    if (name && !isNaN(age) && profession) {
      dataArray.push({ name, age, profession });
      console.log("Data added successfully!");
    } else {
      console.error("Invalid input. Data not added.");
    }
  }
  
  // Remove Admins (`removeAdmin` function)
  function removeAdmin(dataArray) {
    const nonAdmins = dataArray.pop();
   
    return nonAdmins;
  }
  
  // Concatenate Array (`concatenateArray` function)
  function concatenateArray(dataArray1, dataArray2) {
    return dataArray1.concat(dataArray2);
  }
  
  // Average Age (`averageAge` function)
  function averageAge(dataArray) {
    const totalAge = dataArray.reduce((sum, person) => sum + person.age, 0);
    const avgAge = totalAge / dataArray.length;
    console.log(`Average Age: ${avgAge.toFixed(2)}`);
  }
  
  // Age Check (`checkAgeAbove25` function)
  function checkAgeAbove25(dataArray) {
    const isAbove25 = dataArray.some((person) => person.age > 25);
    console.log(`Is there anyone above 25? ${isAbove25}`);
  }
  
  // Unique Professions (`uniqueProfessions` function)
  function uniqueProfessions(dataArray) {
    const professions = [...new Set(dataArray.map((person) => person.profession))];
    console.log("Unique Professions:");
    console.log(professions.join(", "));
  }
  
  // Sort by Age (`sortByAge` function)
  function sortByAge(dataArray) {
    dataArray.sort((a, b) => a.age - b.age);
  }
  
  // Update Profession (`updateJohnsProfession` function)
  function updateJohnsProfession(dataArray) {
    const john = dataArray.find((person) => person.name === "john");
    if (john) {
      john.profession = "manager";
      console.log("John's profession updated to 'manager'");
    }
  }
  
  // Profession Count (`getTotalProfessions` function)
  function getTotalProfessions(dataArray) {
    const developerCount = dataArray.filter((person) => person.profession === "developer").length;
    const adminCount = dataArray.filter((person) => person.profession === "admin").length;
    console.log(`Total Developers: ${developerCount}`);
    console.log(`Total Admins: ${adminCount}`);
  }
  
  // Perform the tasks
  printDevelopers(data);
  addData(data);
  const removedAdmins = removeAdmin(data);
  console.log("Removed Admins:");
  console.log(removedAdmins);
  const concatenatedArray = concatenateArray(data, removedAdmins);
  console.log("Concatenated Array:");
  console.log(concatenatedArray);
  averageAge(data);
  checkAgeAbove25(data);
  uniqueProfessions(data);
  sortByAge(data);
  console.log("Sorted by Age:");
  console.log(data);
  updateJohnsProfession(data);
  getTotalProfessions(data);
  