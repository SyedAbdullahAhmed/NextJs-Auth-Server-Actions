"use server";

// import { z } from "zod";
// import { createSession, deleteSession } from "../lib/session";
// import { redirect } from "next/navigation";

// const testUser = {
//   id: "1",
//   email: "contact@cosdensolutions.io",
//   password: "12345678",
// };

// const loginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }).trim(),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters" })
//     .trim(),
// });

// export async function login(prevState: any, formData: FormData) {

//   console.log("login form started")
//   console.log(Object.fromEntries(formData))
//   const result = loginSchema.safeParse(Object.fromEntries(formData));
//   console.log(result)

//   if (!result.success) {

//     console.log("error result")
//     console.log(result)
//     console.log(result.error)
//     console.log(result.error.flatten())
//     console.log(result.error.flatten().fieldErrors)
//     return {
//       errors: result.error.flatten().fieldErrors,
//     };
//   }

//   const { email, password } = result.data;

//   if (email !== testUser.email || password !== testUser.password) {
//     return {
//       errors: {
//         email: ["Invalid email or password"],
//       },
//     };
//   }

//   await createSession(testUser.id);

//   redirect("/dashboard");
// }

// export async function logout() {
//   await deleteSession();
//   redirect("/login");
// }


// Global cache object for connection status
import mongoose from "mongoose";
const string = "mongodb+srv://ab:ab123@cluster0.1yqzrrw.mongodb.net/newAPP?retryWrites=true&w=majority&appName=Cluster0"
export const connect = async () => {
    try {
        await mongoose.connect(string);
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database");
    }
}


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})
const User = mongoose.models.User || mongoose.model("User", userSchema)

const handleLogin = async(prevState: any, formData: any) => {
  console.log(formData.get("email"))
  console.log(formData.get("password"))
  await connect()
  const user = new User({
    email: formData.get("email"),
    password: formData.get("password"),
  })
  const newUser = await user.save()
  console.log(newUser)

}

export default handleLogin;