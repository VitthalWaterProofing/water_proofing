import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Service from './models/Service';
import Project from './models/Project';
import Testimonial from './models/Testimonial';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to upload a local image to Cloudinary
const uploadImage = async (localPath: string): Promise<string> => {
  try {
    // Assuming the script is run from backend, but the images are in frontend/public
    const fullPath = `../frontend/public${localPath}`;
    console.log(`Uploading ${fullPath}...`);
    
    const result = await cloudinary.uploader.upload(fullPath, {
      folder: 'waterproofing',
    });
    
    return result.secure_url;
  } catch (error) {
    console.error(`Failed to upload ${localPath}:`, error);
    return ''; // Return empty string or placeholder on failure
  }
};

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/waterproofing';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected to seed data.');

    // 1. Clear existing non-admin data to avoid duplicates
    console.log('Clearing old Services, Projects, and Testimonials...');
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});

    // 2. Define Hardcoded Data

    // --- TESTIMONIALS ---
    const testimonialsData = [
      {
        reviewText: "Excellent work on our society terrace. No leakage even after heavy monsoon. Highly recommended!",
        customerName: "Rajesh Patil (Pune)",
        rating: 5,
        isApproved: true,
      },
      {
        reviewText: "Professional team, quality materials, and delivered on time. Our bathroom leakage is completely fixed.",
        customerName: "Sunita Deshmukh (Mumbai)",
        rating: 5,
        isApproved: true,
      },
      {
        reviewText: "We got brickbat coba done for our bungalow terrace. Great quality work at reasonable price.",
        customerName: "Amit Kulkarni (Nagpur)",
        rating: 4,
        isApproved: true,
      },
      {
        reviewText: "The china mosaic work on our terrace looks beautiful and no more water seepage. Very satisfied!",
        customerName: "Priya Sharma (Nashik)",
        rating: 5,
        isApproved: true,
      },
    ];

    // --- SERVICES ---
    const servicesRawData = [
      {
        title: "Brickbat Coba Waterproofing",
        shortDescription: "Traditional & durable terrace waterproofing using brick pieces.",
        description: "Cracked terraces allow water to seep through, causing ceiling damage and structural weakening over time. Traditional and highly effective brickbat coba treatment for terrace waterproofing that lasts for decades.",
        localImg: "/services/brickbat.jpeg",
        benefits: [
          "Long-lasting protection for 15+ years",
          "Excellent crack resistance",
          "Natural heat insulation",
          "Cost-effective traditional method"
        ],
        isActive: true,
      },
      {
        title: "China Mosaic Treatment",
        shortDescription: "Decorative waterproofing providing both aesthetics and thermal insulation.",
        description: "Decorative waterproofing with broken ceramic tiles providing both aesthetics and durability. Beautiful and waterproof china mosaic application that protects terraces while adding visual appeal.",
        localImg: "/services/china.jpeg",
        benefits: [
          "Beautiful decorative finish",
          "Superior heat reflection",
          "Waterproof and weatherproof",
          "Low maintenance solution"
        ],
        isActive: true,
      },
      {
        title: "Khoba Waterproofing",
        shortDescription: "Cement-polymer based coating system ensuring crack-resistant protection.",
        description: "Specialized khoba waterproofing for terraces and external surfaces to prevent dampness and seepage. Cement-polymer based coating system ensuring complete crack-resistant protection.",
        localImg: "/services/khoba.jpeg",
        benefits: [
          "Complete seepage prevention",
          "Mold and fungus protection",
          "Non-toxic, safe materials",
          "10-year warranty coverage"
        ],
        isActive: true,
      },
      {
        title: "Terrace Leakage Repair",
        shortDescription: "Expert diagnosis and repair of terrace leaks.",
        description: "Expert diagnosis and repair of terrace leakage problems using advanced waterproofing techniques and sealants. Protect your structure from water damage.",
        localImg: "/services/terrace.jpg",
        benefits: [
          "Permanent dampness elimination",
          "Injection grouting technology",
          "Paint-ready surface finish",
          "Health-safe environment"
        ],
        isActive: true,
      },
      {
        title: "Bathroom Waterproofing",
        shortDescription: "Complete bathroom waterproofing solutions preventing seepage.",
        description: "Complete bathroom waterproofing solutions to prevent leakage to lower floors and protect structural integrity of your building.",
        localImg: "/services/bathroom.jpeg", // Note: The home page has this image path
        benefits: [
          "Complete seepage prevention",
          "Mold and fungus protection",
          "Non-toxic, safe materials",
          "10-year warranty coverage"
        ],
        isActive: true,
      },
      {
        title: "Water Tank Waterproofing",
        shortDescription: "Food-grade safe waterproofing for overhead and underground tanks.",
        description: "Food-grade safe waterproofing for both internal and external water tanks with guaranteed results to prevent leakage and contamination.",
        localImg: "/services/watertank.jpg", // Note: The home page has this image path
        benefits: [
          "Complete seepage prevention",
          "Clean water storage",
          "Safe and non-toxic materials",
          "10-year warranty coverage"
        ],
        isActive: true,
      },
    ];

    // --- PROJECTS ---
    // Note: We need the ObjectIds of created services to link them.
    const projectsRawData = [
      {
        title: "Residential Terrace Waterproofing – Bangalore",
        location: "Bangalore, Karnataka",
        description: "Complete terrace leakage repair using brickbat coba and waterproof membrane coating.",
        localImg: "/projects/terrace.jpg",
        serviceTypeMatch: "Terrace Leakage Repair", // Used to lookup service ID
        isFeatured: true,
        completionDate: new Date('2023-11-01').toISOString(),
      },
      {
        title: "Commercial Building Roof Treatment",
        location: "Bangalore, Karnataka",
        description: "Applied high-performance waterproof coating for long-term protection against heavy rainfall.",
        localImg: "/projects/commercial.jpg",
        serviceTypeMatch: "Khoba Waterproofing",
        isFeatured: true,
        completionDate: new Date().toISOString(), // Ongoing approximated
      },
      {
        title: "Society Terrace Renovation",
        location: "Bangalore, Karnataka",
        description: "Large-scale terrace waterproofing project covering 15,000 sq. ft.",
        localImg: "/projects/society.jpg",
        serviceTypeMatch: "Brickbat Coba Waterproofing",
        isFeatured: false,
        completionDate: new Date('2023-08-15').toISOString(),
      },
      {
        title: "Bathroom Leakage Repair",
        location: "Bangalore, Karnataka",
        description: "Advanced chemical injection treatment to stop seepage without tile removal.",
        localImg: "/projects/bathroom.jpg",
        serviceTypeMatch: "Bathroom Waterproofing",
        isFeatured: false,
        completionDate: new Date().toISOString(),
      },
      {
        title: "Overhead Water Tank Waterproofing",
        location: "Bangalore, Karnataka",
        description: "Internal tank waterproofing using food-grade waterproof coating system.",
        localImg: "/projects/watertank.jpg",
        serviceTypeMatch: "Water Tank Waterproofing",
        isFeatured: false,
        completionDate: new Date('2024-01-10').toISOString(),
      },
      {
        title: "Wall Dampness Treatment",
        location: "Bangalore, Karnataka",
        description: "Exterior wall crack sealing and waterproof plaster protection.",
        localImg: "/projects/wall.jpg",
        serviceTypeMatch: "Khoba Waterproofing",
        isFeatured: false,
        completionDate: new Date('2023-05-20').toISOString(),
      },
      {
        title: "Industrial Shed Waterproofing",
        location: "Bangalore, Karnataka",
        description: "Industrial roof wateproofing with heat-reflective membrane application.",
        localImg: "/projects/industrial.jpg",
        serviceTypeMatch: "China Mosaic Treatment",
        isFeatured: true,
        completionDate: new Date().toISOString(),
      },
      {
        title: "New Construction Waterproofing",
        location: "Bangalore, Karnataka",
        description: "Full building waterproofing during construction stage for long-term durability.",
        localImg: "/projects/newConstruction.jpg",
        serviceTypeMatch: "Brickbat Coba Waterproofing",
        isFeatured: false,
        completionDate: new Date('2024-02-05').toISOString(),
      },
    ];

    // 3. Perform Insertions sequentially to handle image uploads

    console.log('--- SEEDING TESTIMONIALS ---');
    await Testimonial.insertMany(testimonialsData);
    console.log(`${testimonialsData.length} Testimonials added.`);

    console.log('--- SEEDING SERVICES ---');
    const createdServices = [];
    for (const service of servicesRawData) {
      const cloudinaryUrl = await uploadImage(service.localImg);
      const newService = await Service.create({
        title: service.title,
        shortDescription: service.shortDescription,
        description: service.description,
        coverImage: cloudinaryUrl || `https://via.placeholder.com/800x600?text=${encodeURIComponent(service.title)}`,
        benefits: service.benefits,
        isActive: service.isActive,
      });
      createdServices.push(newService);
      console.log(`Added Service: ${service.title}`);
    }

    console.log('--- SEEDING PROJECTS ---');
    for (const project of projectsRawData) {
      const cloudinaryUrl = await uploadImage(project.localImg);
      
      // Match with the created service to get an ID reference
      const relatedService = createdServices.find(s => s.title === project.serviceTypeMatch);
      const serviceId = relatedService ? relatedService._id : null;

      await Project.create({
        title: project.title,
        location: project.location,
        description: project.description,
        images: cloudinaryUrl ? [cloudinaryUrl] : [],
        serviceType: serviceId,
        isFeatured: project.isFeatured,
        completionDate: project.completionDate,
      });
      console.log(`Added Project: ${project.title}`);
    }

    // Include the extra transformations if we want them as projects visually
    console.log('Uploading Before/After Transformations as utility images...');
    await uploadImage('/projects/before-after-1.png');
    await uploadImage('/projects/before-after-2.png');
    await uploadImage('/projects/before-after-3.png');
    await uploadImage('/before-after-waterproofing.jpg');
    console.log('Transformations uploaded successfully (not saved to DB directly).');

    console.log('✅ DATABASE SEEDING COMPLETE WITH CLOUDINARY UPLOADS!');
    process.exit();
  } catch (error) {
    console.error('❌ SEEDING FAILED:', error);
    process.exit(1);
  }
};

seedDatabase();
