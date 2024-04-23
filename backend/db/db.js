const mongoose = require('mongoose');

// Asynchronous function to establish a database connection
const db = async () => {
    try {
        // Set the 'strictQuery' option. Setting this to false can help avoid some errors, but be cautious about query mismatches.
        mongoose.set('strictQuery', false);

        // Connect to the MongoDB database using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected successfully");
    } catch (error) {
        // Output more detailed error information to help with troubleshooting
        console.error("DB connection error:", error);
    }
};

module.exports = { db };
