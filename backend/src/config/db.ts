import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Zastąp poniższy URL odpowiednim adresem do Twojej bazy danych MongoDB
    const conn = await mongoose.connect('mongodb://localhost:27017/sosso', {
      // Usuwamy niepotrzebne opcje
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
