 EOF

   cat << 'CONTENT'
   import SleepRecordDemo from '@/components/SleepRecordDemo';

   export default function Home() {
     return (
       <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white
   to-purple-50">
         <SleepRecordDemo />
       </main>
     );
   }
   CONTENT

   cat << 'EOF'
