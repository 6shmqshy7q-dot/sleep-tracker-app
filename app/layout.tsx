import type { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Next.js + Neon + Drizzle + NextAuth',
  description: '全栈应用示例',
};

// 根布局（服务端组件）：把整个应用的内容都包裹在 Providers 中
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 关键：把 Providers 放在根布局，所有页面都能继承 SessionProvider 上下文 */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
