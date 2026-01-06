EOF

   cat << 'CONTENT'
   import { NextRequest, NextResponse } from 'next/server';
   import bcrypt from 'bcryptjs';

   // Mock database functions
   const mockUsers: any[] = [];

   async function getUserByEmail(email: string) {
     return mockUsers.find(u => u.email === email);
   }

   async function createUser(email: string, username: string, passwordHash: string) {
     const user = {
       id: Date.now(),
       email,
       username,
       passwordHash,
       createdAt: new Date().toISOString()
     };
     mockUsers.push(user);
     return user;
   }

   export async function POST(request: NextRequest) {
     try {
       const { email, username, password } = await request.json();

       // Mock validation
       if (!email || !username || !password) {
         return NextResponse.json(
           { error: 'Missing required fields' },
           { status: 400 }
         );
       }

       // Check if user already exists
       const existingUser = await getUserByEmail(email);
       if (existingUser) {
         return NextResponse.json(
           { error: 'User already exists' },
           { status: 400 }
         );
       }

       // Hash password (mock)
       const passwordHash = await bcrypt.hash(password, 10);

       // Create user
       const user = await createUser(email, username, passwordHash);

       return NextResponse.json(
         {
           success: true,
           user: {
             id: user.id,
             email: user.email,
             username: user.username,
           },
         },
         { status: 201 }
       );
     } catch (error) {
       console.error('Registration error:', error);
       return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
       );
     }
   }
   CONTENT

   cat << 'EOF'
