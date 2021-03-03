let page = 1;

document.addEventListener("DOMContentLoaded", () => {
    fetchAndPopData();

    createFrom();

    document.getElementById("forward").addEventListener("click", (e) => {
        page++;
        fetchAndPopData();
        console.log(page);
    });
    document.getElementById("back").addEventListener("click", (e) => {
        page--;
        if (page < 1) {
            page = 1;
        }
        fetchAndPopData();
        console.log(page);
    });
});

function fetchAndPopData() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then((response) => {
            return response.json();
        })
        .then((monsterData) => {
            const monsterList = document.getElementById("monster-container");
            monsterList.innerHTML = "";
            monsterData.forEach((monster) => {
                let monsterDivElem = document.createElement("div");
                let monName = document.createElement("h2");
                let monAge = document.createElement("h4");
                let monDesc = document.createElement("p");

                monName.innerHTML = monster.name;
                monAge.innerHTML = "Age: " + monster.age;
                monDesc.innerHTML = "Description: " + monster.description;

                monsterDivElem.append(monName, monAge, monDesc);
                monsterList.append(monsterDivElem);
            });
        });
}

function createFrom() {
    const formContainer = document.getElementById("create-monster");
    let monsterForm = document.createElement("form");

    let monsterName = document.createElement("input");
    monsterName.type = "text";
    monsterName.value = "";
    monsterName.name = "name";
    monsterName.placeholder = "Enter Monster Name";

    let monsterAge = document.createElement("input");
    monsterAge.type = "text";
    monsterAge.value = "";
    monsterAge.name = "age";
    monsterAge.placeholder = "Enter Monster Age";

    let monsterDescription = document.createElement("input");
    monsterDescription.type = "text";
    monsterDescription.value = "";
    monsterDescription.name = "desc";
    monsterDescription.placeholder = "Enter Monster Description";

    let submitBttn = document.createElement("input");
    submitBttn.type = "submit";
    submitBttn.value = "Submit";

    monsterForm.append(monsterName, monsterAge, monsterDescription, submitBttn);
    monsterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let dataObj = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.desc.value,
        };
        let postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(dataObj),
        };
        e.target.name.value = e.target.age.value = e.target.desc.value = "";
        fetch("http://localhost:3000/monsters", postObj).then((response) => {
            fetchAndPopData();
        });
    });
    formContainer.append(monsterForm);
}
