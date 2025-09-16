// Script to add sample latitude and longitude coordinates to colleges
// This is a utility script to populate college data with location coordinates

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'EDU2CAREER';
const collectionName = 'EDU2CAREER_DB';

// Sample coordinates for J&K districts (approximate)
const districtCoordinates = {
  'Srinagar': { latitude: 34.0837, longitude: 74.7973 },
  'Jammu': { latitude: 32.7266, longitude: 74.8570 },
  'Baramulla': { latitude: 34.2090, longitude: 74.3421 },
  'Anantnag': { latitude: 33.7311, longitude: 75.1487 },
  'Kupwara': { latitude: 34.5311, longitude: 74.2661 },
  'Udhampur': { latitude: 32.9252, longitude: 75.1416 },
  'Budgam': { latitude: 34.0142, longitude: 74.6768 },
  'Pulwama': { latitude: 33.8740, longitude: 74.8996 },
  'Shopian': { latitude: 33.7200, longitude: 74.8333 },
  'Kulgam': { latitude: 33.6400, longitude: 75.0167 },
  'Ganderbal': { latitude: 34.2267, longitude: 74.7744 },
  'Bandipora': { latitude: 34.4200, longitude: 74.6500 },
  'Kathua': { latitude: 32.3717, longitude: 75.5183 },
  'Doda': { latitude: 33.1483, longitude: 75.5478 },
  'Ramban': { latitude: 33.2500, longitude: 75.2500 },
  'Kishtwar': { latitude: 33.3131, longitude: 75.7678 },
  'Poonch': { latitude: 33.7667, longitude: 74.1000 },
  'Rajouri': { latitude: 33.3750, longitude: 74.3167 },
  'Reasi': { latitude: 33.0833, longitude: 74.8333 },
  'Samba': { latitude: 32.5667, longitude: 75.1167 }
};

async function addCoordinatesToColleges() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const collection = client.db(dbName).collection(collectionName);

    // Find all colleges (documents that have 'College Name' field)
    const colleges = await collection.find({ 'College Name': { $exists: true } }).toArray();

    console.log(`Found ${colleges.length} colleges`);

    for (const college of colleges) {
      const district = college.District;
      const coordinates = districtCoordinates[district];

      if (coordinates && !college.latitude && !college.longitude) {
        // Add small random offset to avoid exact same coordinates for colleges in same district
        const randomOffset = 0.01; // ~1km
        const latitude = coordinates.latitude + (Math.random() - 0.5) * randomOffset;
        const longitude = coordinates.longitude + (Math.random() - 0.5) * randomOffset;

        await collection.updateOne(
          { _id: college._id },
          {
            $set: {
              latitude: parseFloat(latitude.toFixed(6)),
              longitude: parseFloat(longitude.toFixed(6))
            }
          }
        );

        console.log(`Updated ${college['College Name']} with coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      } else if (!coordinates) {
        console.log(`No coordinates available for district: ${district}`);
      } else {
        console.log(`${college['College Name']} already has coordinates`);
      }
    }

    console.log('Finished updating college coordinates');

  } catch (error) {
    console.error('Error updating college coordinates:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
addCoordinatesToColleges();
