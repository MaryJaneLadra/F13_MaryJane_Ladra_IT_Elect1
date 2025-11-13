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

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_id INTEGER,
      receiver_id INTEGER,
      message TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
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

export async function sendMessage(sender_id, receiver_id, message) {
  await db.runAsync(
    'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
    [sender_id, receiver_id, message]
  );
}

export async function getMessagesBetweenUsers(user1_id, user2_id) {
  return await db.getAllAsync(
    `SELECT * FROM messages 
     WHERE (sender_id = ? AND receiver_id = ?)
     OR (sender_id = ? AND receiver_id = ?)
     ORDER BY timestamp ASC`,
    [user1_id, user2_id, user2_id, user1_id]
  );
}

export default db;