const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// In-memory admin user (hashed password would be better in prod)
const usersFile = path.join(__dirname, '../users.json');

function loadUsers() {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile));
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;window.addEventListener('DOMContentLoaded', () => {
  const userInfoDiv = document.getElementById('user-info');
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (user && user.email) {
    userInfoDiv.innerHTML = `
      <span style="color: white;">Hello, ${user.email.split('@')[0]}</span>
      <button onclick="logout()">Logout</button>
    `;
  }
});

function logout() {
  localStorage.removeItem('loggedInUser');
  location.reload();
}

  const users = loadUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if(user) {
    req.session.user = { username: user.username };
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

router.get('/check', (req, res) => {
  if(req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
