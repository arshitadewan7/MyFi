document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const messageElement = document.getElementById('message');

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/public/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
          messageElement.style.color = 'green';
          messageElement.textContent = result.message || 'Login successful!';
          setTimeout(() => {
            window.location.href = '/dashboard.html'; // Change if needed
          }, 1000);
        } else {
          messageElement.style.color = 'red';
          messageElement.textContent = result.error || 'Login failed.';
        }

      } catch (err) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Something went wrong.';
        console.error('Login error:', err);
      }
    });
  }

  // REGISTER
  if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const phone_number = document.getElementById('phone_number').value;

      try {
        const response = await fetch('/public/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, phone_number }),
        });

        const result = await response.json();

        if (response.ok) {
          messageElement.style.color = 'green';
          messageElement.textContent = result.message || 'Registration successful!';
          setTimeout(() => {
            window.location.href = '/login.html';
          }, 1000);
        } else {
          messageElement.style.color = 'red';
          messageElement.textContent = result.error || 'Registration failed.';
        }
      } catch (err) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Something went wrong.';
        console.error('Registration error:', err);
      }
    });
  }

  console.log('Sending login data:', { email, password });

});
