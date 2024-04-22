import {z} from "zod"

export const LoginSchema = z.object({
      email:z.string().min(1,{message:"Email is required"}),
      password:z.string().min(8,{message:"password must be 8 characters long"}).max(16,{message:"password should have max 16 characters ."}),
})

export type LoginInput = z.infer<typeof LoginSchema>
