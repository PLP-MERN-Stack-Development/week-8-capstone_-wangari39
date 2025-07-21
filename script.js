
const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;

    await fetch('http://localhost:3000/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, grade })
    });

    alert('Student Registered');
    loadStudents();
});

async function loadStudents() {
    const response = await fetch('http://localhost:3000/students');
    const students = await response.json();

    studentList.innerHTML = '';
    students.forEach(student => {
        const div = document.createElement('div');
        div.textContent = `${student.name} - Age: ${student.age} - Grade: ${student.grade}`;
        studentList.appendChild(div);
    });
}

window.onload = loadStudents;
