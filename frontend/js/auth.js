const API = 'http://localhost:5000/api';

function showMsg(el, text, ok=true) {
  el.innerHTML = `<div class="alert ${ok ? 'alert-success' : 'alert-error'}">${text}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const msg = document.getElementById('msg');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const res = await fetch(`${API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          showMsg(msg, data.msg || 'Login failed', false);
          return;
        }
        localStorage.setItem('token', data.token);
        window.location = 'employees.html';
      } catch (err) {
        showMsg(msg, 'Network error', false);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const res = await fetch(`${API}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          showMsg(msg, data.msg || 'Registration failed', false);
          return;
        }
        localStorage.setItem('token', data.token);
        window.location = 'employees.html';
      } catch (err) {
        showMsg(msg, 'Network error', false);
      }
    });
  }
});
