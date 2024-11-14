/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'CPS714';
const collection = 'Users';

// Select the database to use.
use(database);

// 1. Create a new collection with schema validation for constraints.
db.createCollection(collection, {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['fullname', 'username', 'password', 'email', 'phone', 'role', 'loyaltypoints'],
      properties: {
        fullname: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        username: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        password: {
          bsonType: 'binData',
          description: 'must be binary data for a password hash and is required'
        },
        email: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        phone: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        role: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        loyaltypoints: {
          bsonType: 'number',
          description: 'must be an integer and defaults to 0 if not provided'
        }
      }
    }
  }
});

// 2. Ensure unique index on 'username' to act as a primary key.
db.getCollection(collection).createIndex({ username: 1 }, { unique: true });

// 3. Insert a sample document to verify constraints (for testing purposes).
try {
  db.getCollection(collection).insertOne({
    fullname: 'Sample Smith',
    username: 'sampleUser',
    password: new BinData(0, "hashed_password_here"),
    email: 'user@example.com',
    phone: '123-456-7890',
    role: 'user',
    loyaltypoints: 100
  });
  console.log('Collection created with constraints, and sample data inserted successfully.');
} catch (error) {
  console.error('Error inserting sample data:', error.message);
}
