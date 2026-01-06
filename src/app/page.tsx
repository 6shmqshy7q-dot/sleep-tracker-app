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

   6. 提交更改

   【最后一步：配置环境变量】
   完成后，在 Vercel 添加：
   DATABASE_URL = postgresql://neondb_owner:npg_9nRZs3FENkOG@ep-super-wildflower-a1debolo
   -pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

   EOF

   Provide updated page.tsx content
