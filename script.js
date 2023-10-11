const data = [
  { name: "john", age: 24, profession: "developer" },
  { name: "jane", age: 27, profession: "admin" },
  { name: "jhonw", age: 21, profession: "raect" },
];

// 1. Print Developers
function printDeveloper() {
  data.forEach((item) => {
    console.log(item);
  });
}

// 2. Add Data
function addData() {
  let newName = prompt("Enter your name:");
  let newAge = parseInt(prompt("Enter your age:"));
  let newProfession = prompt("Enter your profession:");
  obj = {
    name: newName,
    age: newAge,
    profession: newProfession,
  };
  data.push(obj);
  console.log(data);
}

// 3. Remove Admins
function removeAdmin() {
  let newData = data.filter((item) => item.profession != "developer");
  console.log(newData);
}

// 4. Concatenate Array
function concatenateArray() {
  let dumy = [
    { name: "muzzakir", age: 26, profession: "manger" },
    { name: "ali", age: 20, profession: "teacher" },
  ];
  let combine = data.concat(dumy);

  //   let combine=[...data,...dumy]
  console.log(combine);
}

// 5. Average Age
function averageAge() {
  let avrege = 0;
  data.forEach((element) => {
    avrege += element.age;
  });
  console.log(avrege / data.length);
}

// 6. Age Check
function checkAgeAbove25() {
  //   let status = false;
  //   data.forEach((item) => {
  //     if (item.age > 25) {
  //       status = true;
  //     }
  //   });
  //   let newStatus = status ? `yes person age above 25` : "no person age above 25";
  //   console.log(newStatus);

  let aboveAge25 = data.filter((item) => item.age > 25);
  console.log(aboveAge25);
}

// 7. Unique Professions
function uniqueProfessions() {
  let professionArr = [];
  data.forEach((item) => {
    if (!professionArr.includes(item.profession)) {
      professionArr.push(item.profession);
    }
  });
  console.log(professionArr);
}

// 8. Sort by Age
function sortByAge() {
  data.sort((a, b) => a.age - b.age);
  console.log(data);
}

// 9. Update Profession
function updateJohnsProfession() {
  data.forEach((item) => {
    if (item.profession === "admin") {
      item.profession = "teacher";
    }
  });
  console.log(data);
}

// 10. Profession Count
function getTotalProfessions() {
  //   let dev = 0;
  //   let admin = 0;
  //   data.forEach((item) => {
  //     if (item.profession === "developer") {
  //       dev++;
  //     } else if (item.profession === "admin") {
  //       admin += 1;
  //     }
  //   });
  //   console.log(`admin:${admin}`);
  //   console.log(`developer:${dev}`);

  let dev = data.filter((item) => item.profession === "developer");
  console.log(`developer:${dev.length}`);
  let admin = data.filter((item) => item.profession === "admin");
  console.log(`admin:${admin.length}`);
}
