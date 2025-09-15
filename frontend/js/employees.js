const API = 'http://localhost:5000/api';
const token = () => localStorage.getItem('token');

function unauthorizedRedirect() {
  localStorage.removeItem('token');
  window.location = 'index.html';
}

function showAlert(text, ok=true) {
  const alerts = document.getElementById('alerts');
  alerts.innerHTML = `<div class="alert ${ok ? 'alert-success' : 'alert-error'}">${text}</div>`;
  setTimeout(()=> alerts.innerHTML = '', 4000);
}

async function fetchEmployees() {
  try {
    const res = await fetch(`${API}/employees`, {
      headers: { 'Authorization': 'Bearer ' + token() }
    });
    if (res.status === 401) return unauthorizedRedirect();
    const data = await res.json();
    return data;
  } catch (err) {
    showAlert('Network error', false);
    return [];
  }
}

async function renderEmployees() {
  const tbody = document.getElementById('employeesTbody');
  tbody.innerHTML = '<tr><td colspan="7">Loading...</td></tr>';
  const employees = await fetchEmployees();
  if (!Array.isArray(employees)) { tbody.innerHTML = '<tr><td colspan="7">No data</td></tr>'; return; }
  if (employees.length === 0) tbody.innerHTML = '<tr><td colspan="7">No employees yet</td></tr>';
  else {
    tbody.innerHTML = employees.map(emp => `
      <tr>
        <td>${emp.firstName} ${emp.lastName}</td>
        <td>${emp.email}</td>
        <td>${emp.phone || ''}</td>
        <td>${emp.position || ''}</td>
        <td>${emp.department || ''}</td>
        <td>${emp.salary ?? ''}</td>
        <td class="actions">
          <button onclick="openEdit('${emp._id}')">Edit</button>
          <button onclick="deleteEmployee('${emp._id}')" class="btn-danger">Delete</button>
        </td>
      </tr>
    `).join('');
  }
}

async function deleteEmployee(id) {
  if (!confirm('Delete this employee?')) return;
  try {
    const res = await fetch(`${API}/employees/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token() }
    });
    if (res.status === 401) return unauthorizedRedirect();
    const data = await res.json();
    showAlert(data.msg || 'Deleted');
    renderEmployees();
  } catch (err) {
    showAlert('Network error', false);
  }
}

function openModal(show=true) {
  document.getElementById('formModal').style.display = show ? 'flex' : 'none';
}

async function openEdit(id) {
  try {
    const res = await fetch(`${API}/employees/${id}`, {
      headers: { 'Authorization': 'Bearer ' + token() }
    });
    if (res.status === 401) return unauthorizedRedirect();
    const emp = await res.json();
    document.getElementById('empId').value = emp._id;
    document.getElementById('firstName').value = emp.firstName;
    document.getElementById('lastName').value = emp.lastName;
    document.getElementById('empEmail').value = emp.email;
    document.getElementById('phone').value = emp.phone || '';
    document.getElementById('position').value = emp.position || '';
    document.getElementById('department').value = emp.department || '';
    document.getElementById('salary').value = emp.salary ?? '';
    document.getElementById('formTitle').innerText = 'Edit Employee';
    openModal(true);
  } catch(err) {
    showAlert('Network error', false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // auth check
  if (!token()) window.location = 'index.html';

  renderEmployees();

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location = 'index.html';
  });

  document.getElementById('openCreate').addEventListener('click', () => {
    document.getElementById('empId').value = '';
    document.getElementById('employeeForm').reset();
    document.getElementById('formTitle').innerText = 'Add Employee';
    openModal(true);
  });

  document.getElementById('closeModal').addEventListener('click', () => openModal(false));

  document.getElementById('employeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('empId').value;
    const payload = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('empEmail').value,
      phone: document.getElementById('phone').value,
      position: document.getElementById('position').value,
      department: document.getElementById('department').value,
      salary: document.getElementById('salary').value ? Number(document.getElementById('salary').value) : undefined
    };

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API}/employees/${id}` : `${API}/employees`;
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token()
        },
        body: JSON.stringify(payload)
      });
      if (res.status === 401) return unauthorizedRedirect();
      const data = await res.json();
      if (!res.ok) {
        showAlert(data.msg || 'Error', false);
        return;
      }
      showAlert('Saved successfully');
      openModal(false);
      renderEmployees();
    } catch (err) {
      showAlert('Network error', false);
    }
  });
});
