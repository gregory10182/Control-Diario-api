import mongoose from "mongoose";

export function connect() {
  // try {
  //   await mongoose.connect("mongodb+srv://Gregory:Gr102818@practica.yhvcfyr.mongodb.net/?retryWrites=true&w=majority");
  //   console.log("Connect successfully");
  // } catch (error) {
  //   console.log("Connect failure");
  // }

  mongoose.connect("mongodb+srv://Gregory:Gr102818@practica.yhvcfyr.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Database Connected"))
  .catch(err => console.error(err))
}