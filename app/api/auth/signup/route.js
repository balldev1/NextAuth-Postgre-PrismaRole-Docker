import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async  function POST(request){
    try {
        const { email,password,name,role} = await request.json();
        const hashedPassword = bcrypt.hashSync(password,10)

        const user = await prisma.user.create({
            data :{
                email,
                password : hashedPassword,
                name,
                role
            }
        })

        return Response.json({message: "User created",user})
    }catch {
        return Response.json({error: "User could not be created"})
    }
}