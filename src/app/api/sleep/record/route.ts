 EOF

   cat << 'CONTENT'
   import { NextRequest, NextResponse } from 'next/server';

   // Mock database
   const mockSleepRecords: any[] = [];

   export async function POST(request: NextRequest) {
     try {
       const { userId, sleepTime, wakeTime, sleepQuality, notes } = await request.json();

       if (!userId || !sleepTime || !wakeTime || !sleepQuality) {
         return NextResponse.json(
           { error: 'Missing required fields' },
           { status: 400 }
         );
       }

       const sleepDate = new Date(sleepTime);
       const wakeDate = new Date(wakeTime);

       if (isNaN(sleepDate.getTime()) || isNaN(wakeDate.getTime())) {
         return NextResponse.json(
           { error: 'Invalid time format' },
           { status: 400 }
         );
       }

       if (wakeDate <= sleepDate) {
         return NextResponse.json(
           { error: 'Wake time must be after sleep time' },
           { status: 400 }
         );
       }

       const duration = Math.floor((wakeDate.getTime() - sleepDate.getTime()) / 1000 /
   60);

       const record = {
         id: Date.now(),
         userId,
         sleepTime,
         wakeTime,
         sleepQuality,
         duration,
         notes,
         createdAt: new Date().toISOString()
       };

       mockSleepRecords.push(record);

       return NextResponse.json(
         {
           success: true,
           record,
         },
         { status: 201 }
       );
     } catch (error) {
       console.error('Record sleep error:', error);
       return NextResponse.json(
         { error: 'Server error' },
         { status: 500 }
       );
     }
   }

   export async function GET(request: NextRequest) {
     try {
       const { searchParams } = new URL(request.url);
       const userIdStr = searchParams.get('userId');

       if (!userIdStr) {
         return NextResponse.json(
           { error: 'User ID is required' },
           { status: 400 }
         );
       }

       const userId = parseInt(userIdStr, 10);
       if (isNaN(userId)) {
         return NextResponse.json(
           { error: 'Invalid user ID format' },
           { status: 400 }
         );
       }

       const records = mockSleepRecords.filter(r => r.userId === userId);

       return NextResponse.json({
         success: true,
         records,
       });
     } catch (error) {
       console.error('Get records error:', error);
       return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
       );
     }
   }
   CONTENT

   cat << 'EOF'

   4. 提交

   EOF
