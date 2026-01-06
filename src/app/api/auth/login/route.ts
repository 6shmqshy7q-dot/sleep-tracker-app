 EOF

   cat << 'CODE'
   import { NextRequest, NextResponse } from 'next/server';
   import bcrypt from 'bcryptjs';

   const mockUsers: any[] = [];

   async function getUserByEmail(email: string) {
     return mockUsers.find(u => u.email === email);
   }

   export async function POST(request: NextRequest) {
     try {
       const { email, password } = await request.json();

       if (!email || !password) {
         return NextResponse.json(
           { error: 'Missing required fields' },
           { status: 400 }
         );
       }

       const user = await getUserByEmail(email);
       if (!user) {
         return NextResponse.json(
           { error: 'Invalid credentials' },
           { status: 401 }
         );
       }

       const isValidPassword = await bcrypt.compare(password, user.passwordHash);
       if (!isValidPassword) {
         return NextResponse.json(
           { error: 'Invalid credentials' },
           { status: 401 }
         );
       }

       return NextResponse.json({
         success: true,
         user: {
           id: user.id,
           email: user.email,
           username: user.username,
         },
       });
     } catch (error) {
       console.error('Login error:', error);
       return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
       );
     }
   }
   CODE

   cat << 'EOF'
