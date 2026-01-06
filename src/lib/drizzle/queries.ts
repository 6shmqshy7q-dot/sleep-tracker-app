  EOF

   cat << 'CONTENT'
   // Mock database functions for demo
   const mockUsers: any[] = [];
   const mockSleepRecords: any[] = [];

   export async function createUser(email: string, username: string, passwordHash:
   string) {
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

   export async function getUserByEmail(email: string) {
     return mockUsers.find(u => u.email === email);
   }

   export async function createSleepRecord(
     userId: number,
     sleepTime: Date,
     wakeTime: Date,
     sleepQuality: string,
     duration: number,
     notes?: string
   ) {
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
     return record;
   }

   export async function getSleepRecordsByUser(userId: number, limit = 10) {
     return mockSleepRecords.filter(r => r.userId === userId).slice(0, limit);
   }
   CONTENT

   cat << 'EOF'

   4. 提交

   EOF

   Provide queries.ts file content
