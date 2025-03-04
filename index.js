// <!-- --------------------------Taking Value From input and storing in localstorage---------------------------- -->

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const Email = document.getElementById('Email').value;
    const ID = document.getElementById('ID').value;
    const Contact = document.getElementById('Contact').value;

    // localStorage.clear()

    if (!validateForm(name, Email, ID, Contact)) {
        return;
    }

    const newStudent =
    {
        name: name,
        Email: Email,
        ID: ID,
        Contact: Contact
    }

    //  Getting Previous Array items
    let studentDataArray = JSON.parse(localStorage.getItem('studentDataArray')) || [];
    // Adding new satudents
    studentDataArray.push(newStudent);
    // Getting Whole student arrray data 
    localStorage.setItem('studentDataArray', JSON.stringify(studentDataArray))

    document.getElementById('name').value = '';
    document.getElementById('Email').value = '';
    document.getElementById('ID').value = '';
    document.getElementById('Contact').value = '';
    alert("New Student Registered ");
    UpdateTable();
}
window.onload = UpdateTable;

// -----------------------Proper validation-------------------------

function validateForm(name, Email, ID, Contact) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const idPattern = /^\d+$/;
    const contactPattern = /^\d{10}$/;

    if (!name) {
        alert("Name is required");
        return false;
    }

    if (!emailPattern.test(Email)) {
        alert("Invalid Email ID");
        return false;
    }

    if (!idPattern.test(ID)) {
        alert("Invalid Student ID");
        return false;
    }

    let studentDataArray = JSON.parse(localStorage.getItem('studentDataArray')) || [];

    let similarID = studentDataArray.find(elem => elem.ID == ID);


    if (similarID) {
        alert('ID must be unique')
        return false;
    }
    if (!contactPattern.test(Contact)) {
        alert("Invalid Contact Number");
        return false;
    }

    return true;
}
// <!-- --------------------------------------Updating Value in table -------------------------------------------- -->

function UpdateTable() {
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';

    const StudentsArray = JSON.parse(localStorage.getItem('studentDataArray'));
    if (StudentsArray) {
        StudentsArray.forEach((student) => {
            const row = document.createElement('tr')
            row.classList.add('ROW')
            row.innerHTML = `<td>${student.name}</td>
                <td>${student.ID}</td>
                <td>${student.Email}</td>
                <td>${student.Contact}</td>
                 <td >
                 <i class="fa-solid fa-pen-to-square" style="color: rgb(0, 120, 0); " onClick="EditStudent('${student.ID}')">
                 </i> <i class="fa-solid fa-trash" style="color: red;" onclick="deleteStudent('${student.ID}')"></i>
                 </td>`;
            tbody.appendChild(row);

        });
    }
    gsap.from('tr', {
        duration: .5,
        opacity: 0,
        delay: 1,
        stagger: .5
    })
}

// <!-- ------------------------------Deleting Row when user click on delete icon------------------------------ -->

function deleteStudent(ID) {

    if (confirm('Are you sure you want to delete this record')) {
        let StudentArray = JSON.parse(localStorage.getItem('studentDataArray')) || []
        StudentArray = StudentArray.filter((student) => { return student.ID !== ID })
        localStorage.setItem('studentDataArray', JSON.stringify(StudentArray));
        UpdateTable();
    }
    else { }
}

// <!-- ------------------------------editing Row when user click on edit icon------------------------------ -->

function EditStudent(ID) {

    let studentArray = JSON.parse(localStorage.getItem('studentDataArray')) || [];

    const Student = studentArray.filter(student => student.ID == ID)
    if (Student) {
        document.getElementById('name').value = Student[0].name;
        document.getElementById('Email').value = Student[0].Email;
        document.getElementById('ID').value = Student[0].ID;
        document.getElementById('Contact').value = Student[0].Contact;

        let restStudentArray = studentArray.filter(elem => elem.ID !== ID)
        localStorage.setItem('studentDataArray', JSON.stringify(restStudentArray));
        UpdateTable();
    }
}

// <!-- ------------------------------Animations for website------------------------------ -->

function gsapAnimations() {
    var timeline = gsap.timeline();

    gsap.from('header h1', {
        x: -500,
        duration: 1,
        opacity: 0
    })
    gsap.from('header h3', {
        x: -500,
        duration: 1,
        opacity: 0
    })
    gsap.from('form', {
        duration: 1,
        x: -1100,
        opacity: 0
    })
    timeline.from('label', {
        duration: 1,
        delay: .5,
        x: -1100,
        opacity: 0
    })
    gsap.from('.Table', {
        duration: 1,
        delay: .5,
        y: 500,
        opacity: 0
    })

    gsap.from('th', {
        duration: 1,
        delay: 1.5,
        opacity: 0
    })

}
gsapAnimations()