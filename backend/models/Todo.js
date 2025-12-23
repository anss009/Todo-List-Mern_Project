const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
     title: { 
    type: String,        // Data type is text
    required: true       // This field is mandatory
  },
  description: { 
    type: String         // Data type is text
    // No 'required', so this is optional
  },
  
  // Status of the todo - either 'pending' or 'completed'
  status: { 
    type: String,        // Data type is text
    default: 'pending'   // If not provided, default is 'pending'
  },
  
  // Which user does this todo belong to?
  // This connects the todo to a user
  user: { 
    type: mongoose.Schema.Types.ObjectId,  // References another document's ID
    ref: 'User'                             // Points to the User model
  }
  
}, { 
  timestamps: true      // Automatically adds createdAt and updatedAt fields
});

// Export this model so we can use it in other files
// 'Todo' is the name of the collection in MongoDB
module.exports = mongoose.model('Todo', todoSchema);