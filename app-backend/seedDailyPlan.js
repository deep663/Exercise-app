const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const DailyPlan = require('./models/DailyPlan');
const Guide = require('./models/Guide');

dotenv.config();

const seedDailyPlans = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // const json_file_path = '../../../Downloads/workout_plan.json'
    const json_file_path = '../../../Downloads/guides.json'
    // Read data from the JSON file
    const data = JSON.parse(fs.readFileSync(json_file_path, 'utf-8'));

    // Seed the data
    // await DailyPlan.insertMany(data);
    await Guide.insertMany(data);
    console.log('Daily plans seeded successfully!');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding daily plans:', error);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedDailyPlans();
