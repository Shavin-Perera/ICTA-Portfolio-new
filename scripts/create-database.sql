-- MongoDB doesn't use SQL, but here's the equivalent structure for reference
-- This would be handled automatically by the MongoDB driver

-- Collection: contacts
-- Document structure:
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "subject": String,
  "message": String,
  "timestamp": Date,
  "ip": String
}

-- Indexes to create for better performance:
-- db.contacts.createIndex({ "timestamp": -1 })
-- db.contacts.createIndex({ "email": 1 })
