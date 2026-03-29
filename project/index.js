function showPage(id) {
      document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    function login() {
      const userId = document.getElementById('userId').value;
      const password = document.getElementById('password').value;
      if (userId && password) {
        showPage('busTypePage');
      } else {
        alert('Please enter User ID and Password');
      }
    }