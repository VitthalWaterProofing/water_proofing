import dotenv from 'dotenv';
dotenv.config();

import app from '../src/app';
import connectDB from '../src/config/db';

// Initialize database connection
// We do this outside the request handler so the connection is reused across warm serverless functions
connectDB().catch(console.error);

// Export the Express app directly for Vercel Serverless Functions
export default app;
