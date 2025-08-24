require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config/config');

// Test users from barn-frontend/TEST_USERS.md
const testUsers = [
  {
    fullName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@barnacle.com',
    password: 'admin123',
    role: 'Administrator'
  },
  {
    fullName: 'Sarah Wilson',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'captain@barnacle.com',
    password: 'captain123',
    role: 'Ship Captain'
  },
  {
    fullName: 'Mike Johnson',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'operator@barnacle.com',
    password: 'operator123',
    role: 'Fleet Operator'
  },
  {
    fullName: 'Demo User',
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@barnacle.com',
    password: 'demo123',
    role: 'Demo User'
  }
];

const seedUsers = async () => {
  try {
    console.log('🌱 Starting user seeding process...');
    
    // Connect to MongoDB
    await mongoose.connect(config.database);
    console.log('✅ Connected to MongoDB');

    // Clear existing users (optional - uncomment if you want to reset)
    // await User.deleteMany({});
    // console.log('🧹 Cleared existing users');

    let createdCount = 0;
    let skippedCount = 0;

    // Add each test user
    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        
        if (existingUser) {
          console.log(`⏭️  User ${userData.email} already exists - skipping`);
          skippedCount++;
          continue;
        }

        // Create new user
        const user = new User(userData);
        await user.save();
        
        console.log(`✅ Created user: ${userData.fullName} (${userData.email}) - ${userData.role}`);
        createdCount++;
        
      } catch (userError) {
        console.error(`❌ Error creating user ${userData.email}:`, userError.message);
      }
    }

    console.log('\\n📊 Seeding Summary:');
    console.log(`   ✅ Created: ${createdCount} users`);
    console.log(`   ⏭️  Skipped: ${skippedCount} users (already exist)`);
    console.log(`   📝 Total: ${testUsers.length} users processed`);

    // Verify all users
    console.log('\\n🔍 Verifying users in database...');
    const allUsers = await User.find({}).select('fullName email role').sort({ role: 1 });
    
    console.log('\\n👥 Current users in database:');
    allUsers.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.fullName} (${user.email}) - ${user.role}`);
    });

    console.log('\\n🎉 User seeding completed successfully!');
    console.log('\\n📋 You can now use these test accounts:');
    console.log('   🔑 Admin: admin@barnacle.com / admin123');
    console.log('   🚢 Captain: captain@barnacle.com / captain123');
    console.log('   ⚓ Operator: operator@barnacle.com / operator123');
    console.log('   🎯 Demo: demo@barnacle.com / demo123');

  } catch (error) {
    console.error('❌ Error during user seeding:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\\n🔒 Database connection closed');
    process.exit(0);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the seed function
if (require.main === module) {
  console.log('🚀 Barnacle User Seeding Script');
  console.log('================================\\n');
  seedUsers();
}

module.exports = seedUsers;