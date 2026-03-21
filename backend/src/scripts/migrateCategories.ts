import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service';
import path from 'path';

// Adjust path depending on where the script is run from.
// If run from backend root via `npx ts-node src/scripts/migrateCategories.ts`,
// process.cwd() is backend/
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in env");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const getMappedCategory = (title: string): string => {
  if (!title) return "Other";
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("commercial") || lowerTitle.includes("industrial")) return "Commercial";
  if (lowerTitle.includes("bathroom") || lowerTitle.includes("washroom")) return "Bathroom";
  if (lowerTitle.includes("tank")) return "Tank";
  if (lowerTitle.includes("terrace") || lowerTitle.includes("coba") || lowerTitle.includes("khoba") || lowerTitle.includes("mosaic") || lowerTitle.includes("roof") || lowerTitle.includes("dampness")) return "Terrace";
  
  return "Other";
};

const migrateCategories = async () => {
  await connectDB();
  
  try {
    const services = await Service.find({});
    console.log(`Found ${services.length} services...`);
    
    let updatedCount = 0;
    
    for (const service of services) {
      const newCategory = getMappedCategory(service.title);
      service.parentCategory = newCategory as any;
      await service.save();
      console.log(`Updated "${service.title}" -> ${newCategory}`);
      updatedCount++;
    }
    
    console.log(`Migration Complete! Updated ${updatedCount} services.`);
    process.exit(0);
  } catch (error) {
    console.error(`Migration Failed:`, error);
    process.exit(1);
  }
};

migrateCategories();
