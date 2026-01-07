 EOF

   cat << 'CODE'
   import type { Metadata } from "next";
   import { Geist, Geist_Mono } from "next/font/google";
   import "./globals.css";

   const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
   });

   const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
   });

   export const metadata: Metadata = {
     title: "智能睡眠监测器 - 专业医疗级睡眠健康管理系统",
     description:
       "基于FDA认证医疗级AI算法的专业睡眠监测平台，为您提供精准的睡眠数据分析、个性化改善
   建议和科学健康管理方案。100K+用户信赖，95%+数据精度，24/7专业服务。",
     keywords:
       "睡眠监测, AI睡眠分析, 睡眠健康, 医疗级认证, 睡眠报告, 个性化睡眠建议,
   睡眠质量管理",
     authors: [{ name: "智能睡眠监测器团队" }],
     openGraph: {
       title: "智能睡眠监测器 - 专业医疗级睡眠健康管理系统",
       description:
         "基于FDA认证医疗级AI算法的专业睡眠监测平台，为您提供精准的睡眠数据分析、个性化改
   善建议和科学健康管理方案。",
       type: "website",
     },
   };

   export default function RootLayout({
     children,
   }: Readonly<{
     children: React.ReactNode;
   }>) {
     return (
       <html lang="en">
         <body
           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
           {children}
         </body>
       </html>
     );
   }
   CODE

   cat << 'EOF'
