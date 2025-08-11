const noteDbUser = process.env.NOTE_DB_USER;
const noteDbPassword = process.env.NOTE_DB_PASSWORD;
const noteDbName = process.env.NOTE_DB_NAME;

console.log('INITIALIZING : Note DB User');
db = db.getSiblingDB(noteDbName);

db.createUser({
  user: noteDbUser,
  pwd: noteDbPassword,
  roles: [
    {
      role: 'readWrite',
      db: noteDbName,
    },
  ],
});