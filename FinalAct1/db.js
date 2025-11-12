import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('users.db');

export async function setupDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      bio TEXT
    );
  `);
}

export async function addUser(username, password, bio) {
  await db.runAsync(
    'INSERT INTO users (username, password, bio) VALUES (?, ?, ?)',
    [username, password, bio]
  );
}

export async function getUser(username, password) {
  const result = await db.getAllAsync(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );
  return result.length > 0 ? result[0] : null; 
}

export async function getAllUsers() {
  return await db.getAllAsync('SELECT * FROM users');
}

export async function updateUserProfile(id, username, bio) {
  await db.runAsync('UPDATE users SET username = ?, bio = ? WHERE id = ?', [username, bio, id]);
}

export default db;
