import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect("mongodb+srv://Gregory:Gr102818@practica.yhvcfyr.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure");
  }
}