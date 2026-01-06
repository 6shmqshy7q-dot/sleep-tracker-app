  EOF

   cat << 'CONTENT'
   import { drizzle } from 'drizzle-orm/neon-http';
   import { neon } from '@neondatabase/serverless';

   const sql = neon(process.env.DATABASE_URL!);

   export const drizzleDb = drizzle(sql);
   CONTENT

   cat << 'EOF'

   4. 提交

   EOF

   Provide drizzle index.ts content
