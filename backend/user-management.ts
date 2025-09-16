import { Hono } from 'hono';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (you'll need to set these environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret',
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'EDU2CAREER';
const USERS_COLLECTION = 'users';

let db: Db;
let usersCollection: Collection;

// Initialize MongoDB connection
async function initializeDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    usersCollection = db.collection(USERS_COLLECTION);
    console.log('Connected to MongoDB for user management');
    
    // Create indexes for better performance
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ userId: 1 }, { unique: true });
    await usersCollection.createIndex({ firebaseUid: 1 }, { unique: true });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Initialize database connection
initializeDatabase();

// User interface
interface User {
  _id?: ObjectId;
  userId: string; // Unique user ID
  firebaseUid: string; // Firebase UID
  email: string;
  name: string;
  phone?: string;
  district?: string;
  currentClass?: string;
  stream?: string;
  schoolCollege?: string;
  profilePhoto?: string; // Cloudinary URL
  dateOfBirth?: string;
  gender?: string;
  category?: string;
  fatherName?: string;
  motherName?: string;
  familyIncome?: string;
  address?: string;
  pincode?: string;
  careerInterests?: string[];
  achievements?: string;
  skills?: string[];
  totalPoints?: number;
  profileCompletion?: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLoginAt?: Date;
}

const app = new Hono();

// Helper function to calculate profile completion
function calculateProfileCompletion(user: Partial<User>): number {
  const fields = [
    user.name,
    user.email,
    user.phone,
    user.district,
    user.currentClass,
    user.stream,
    user.schoolCollege,
    user.dateOfBirth,
    user.gender,
    user.address,
    user.profilePhoto
  ];
  
  const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
  return Math.round((completedFields / fields.length) * 100);
}

// Helper function to upload image to Cloudinary
async function uploadToCloudinary(fileBuffer: Buffer, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: `profile_photos/${fileName}`,
        transformation: [
          { width: 300, height: 300, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    ).end(fileBuffer);
  });
}

// Create new user
app.post('/users', async (c) => {
  try {
    const userData = await c.req.json();
    
    // Generate unique user ID
    const userId = uuidv4();
    
    const newUser: User = {
      userId,
      firebaseUid: userData.uid || userData.firebaseUid,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      district: userData.district,
      currentClass: userData.currentClass,
      stream: userData.stream,
      schoolCollege: userData.schoolCollege,
      profilePhoto: userData.profilePhoto,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      category: userData.category,
      fatherName: userData.fatherName,
      motherName: userData.motherName,
      familyIncome: userData.familyIncome,
      address: userData.address,
      pincode: userData.pincode,
      careerInterests: userData.careerInterests || [],
      achievements: userData.achievements || '',
      skills: userData.skills || [],
      totalPoints: 0,
      profileCompletion: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      lastLoginAt: new Date()
    };
    
    // Calculate profile completion
    newUser.profileCompletion = calculateProfileCompletion(newUser);
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [
        { email: newUser.email },
        { firebaseUid: newUser.firebaseUid }
      ]
    });
    
    if (existingUser) {
      // Update existing user instead of creating new one
      const updateResult = await usersCollection.updateOne(
        { _id: existingUser._id },
        {
          $set: {
            ...newUser,
            userId: existingUser.userId, // Keep existing userId
            createdAt: existingUser.createdAt, // Keep original creation date
            updatedAt: new Date()
          }
        }
      );
      
      if (updateResult.modifiedCount > 0) {
        const updatedUser = await usersCollection.findOne({ _id: existingUser._id });
        return c.json({ success: true, user: updatedUser });
      }
    } else {
      // Create new user
      const result = await usersCollection.insertOne(newUser);
      const createdUser = await usersCollection.findOne({ _id: result.insertedId });
      return c.json({ success: true, user: createdUser });
    }
    
  } catch (error) {
    console.error('Error creating user:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Get user by ID (Firebase UID or custom userId)
app.get('/users/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    let user;
    
    // Try to find by ObjectId first if it's a valid ObjectId
    if (ObjectId.isValid(id)) {
      user = await usersCollection.findOne({ _id: new ObjectId(id) });
    }
    
    // If not found, try other fields
    if (!user) {
      user = await usersCollection.findOne({
        $or: [
          { firebaseUid: id },
          { userId: id }
        ]
      });
    }
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    // Update last login time
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date() } }
    );
    
    return c.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return c.json({ error: 'Failed to fetch user' }, 500);
  }
});

// Update user profile
app.put('/users/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updateData = await c.req.json();
    
    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.userId;
    delete updateData.firebaseUid;
    delete updateData.createdAt;
    
    // Add updated timestamp
    updateData.updatedAt = new Date();
    
    // Find existing user
    let existingUser;
    
    // Try to find by ObjectId first if it's a valid ObjectId
    if (ObjectId.isValid(id)) {
      existingUser = await usersCollection.findOne({ _id: new ObjectId(id) });
    }
    
    // If not found, try other fields
    if (!existingUser) {
      existingUser = await usersCollection.findOne({
        $or: [
          { firebaseUid: id },
          { userId: id }
        ]
      });
    }
    
    if (!existingUser) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    const mergedData = { ...existingUser, ...updateData };
    updateData.profileCompletion = calculateProfileCompletion(mergedData);
    
    const result = await usersCollection.updateOne(
      { _id: existingUser._id },
      { $set: updateData }
    );
    
    if (result.modifiedCount === 0) {
      return c.json({ error: 'No changes made' }, 400);
    }
    
    const updatedUser = await usersCollection.findOne({ _id: existingUser._id });
    return c.json({ success: true, user: updatedUser });
    
  } catch (error) {
    console.error('Error updating user:', error);
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

// Upload profile photo
app.post('/users/:id/profile-photo', async (c) => {
  try {
    const id = c.req.param('id');
    
    // Get the uploaded file from the request
    const formData = await c.req.formData();
    const file = formData.get('profilePhoto') as File;
    
    if (!file) {
      return c.json({ error: 'No file uploaded' }, 400);
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: 'Only image files are allowed' }, 400);
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: 'File size must be less than 5MB' }, 400);
    }
    
    // Find user
    let user;
    
    // Try to find by ObjectId first if it's a valid ObjectId
    if (ObjectId.isValid(id)) {
      user = await usersCollection.findOne({ _id: new ObjectId(id) });
    }
    
    // If not found, try other fields
    if (!user) {
      user = await usersCollection.findOne({
        $or: [
          { firebaseUid: id },
          { userId: id }
        ]
      });
    }
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Cloudinary
    const fileName = `${user.userId}_${Date.now()}`;
    const photoUrl = await uploadToCloudinary(buffer, fileName);
    
    // Update user profile with new photo URL
    const updateResult = await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          profilePhoto: photoUrl,
          updatedAt: new Date(),
          profileCompletion: calculateProfileCompletion({ ...user, profilePhoto: photoUrl } as User)
        }
      }
    );
    
    if (updateResult.modifiedCount === 0) {
      return c.json({ error: 'Failed to update user profile' }, 500);
    }
    
    return c.json({
      success: true,
      profilePhoto: photoUrl,
      message: 'Profile photo uploaded successfully'
    });
    
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    return c.json({ error: 'Failed to upload profile photo' }, 500);
  }
});

// Delete user (soft delete)
app.delete('/users/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    let result;
    
    // Try to find by ObjectId first if it's a valid ObjectId
    if (ObjectId.isValid(id)) {
      result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            isActive: false,
            updatedAt: new Date()
          }
        }
      );
    } else {
      result = await usersCollection.updateOne(
        {
          $or: [
            { firebaseUid: id },
            { userId: id }
          ]
        },
        {
          $set: {
            isActive: false,
            updatedAt: new Date()
          }
        }
      );
    }
    
    if (result.modifiedCount === 0) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    return c.json({ success: true, message: 'User deactivated successfully' });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return c.json({ error: 'Failed to delete user' }, 500);
  }
});

// Get all users (admin endpoint)
app.get('/users', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const skip = (page - 1) * limit;
    
    const users = await usersCollection
      .find({ isActive: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();
    
    const total = await usersCollection.countDocuments({ isActive: true });
    
    return c.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

// Search users
app.get('/users/search/:query', async (c) => {
  try {
    const query = c.req.param('query');
    
    const users = await usersCollection
      .find({
        isActive: true,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
          { district: { $regex: query, $options: 'i' } }
        ]
      })
      .limit(20)
      .toArray();
    
    return c.json(users);
    
  } catch (error) {
    console.error('Error searching users:', error);
    return c.json({ error: 'Failed to search users' }, 500);
  }
});

export default app;
