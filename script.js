//targeting the from from the index.html
const form = document.getElementById('registrationForm');
//targeting tableBody from the index.html
const tableBody = document.getElementById('tableBody');

let students = JSON.parse(localStorage.getItem('students')) || [];
let editingIndex = null;

// Render student list
function renderTable() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = `<tr>
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>${student.className}</td>
      <td>${student.address}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Form validation
function validateForm(name, studentId, email, contact) {
  const namePattern = /^[A-Za-z\s]+$/;
  const idPattern = /^[0-9]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactPattern = /^[0-9]+$/;

  if (!namePattern.test(name)) {
    alert("Name should contain only letters.");
    return false;
  }
  if (!idPattern.test(studentId)) {
    alert("Student ID must be numeric.");
    return false;
  }
  if (!emailPattern.test(email)) {
    alert("Invalid email format.");
    return false;
  }
  if (!contactPattern.test(contact)) {
    alert("Contact No must be numeric.");
    return false;
  }
  return true;
}

// Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const studentId = form.studentId.value.trim();
  const email = form.email.value.trim();
  const contact = form.contact.value.trim();
  const className = form.class.value.trim();
  const address = form.address.value.trim();

  if (!name || !studentId || !email || !contact || !className || !address) {
    alert("Please fill in all fields.");
    return;
  }

  if (!validateForm(name, studentId, email, contact)) return;

  const studentData = { name, studentId, email, contact, className, address };

  if (editingIndex === null) {
    students.push(studentData);
  } else {
    students[editingIndex] = studentData;
    editingIndex = null;
  }

  localStorage.setItem('students', JSON.stringify(students));
  renderTable();
  form.reset();
});

// Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
  }
}

// Edit student
function editStudent(index) {
  const student = students[index];
  form.name.value = student.name;
  form.studentId.value = student.studentId;
  form.email.value = student.email;
  form.contact.value = student.contact;
  form.class.value = student.className;
  form.address.value = student.address;
  editingIndex = index;
}

// Initial render
window.onload = renderTable;
