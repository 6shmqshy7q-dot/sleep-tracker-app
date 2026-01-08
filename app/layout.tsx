import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import PWAInstallPrompt from '../src/components/PWAInstallPrompt';

export const metadata: Metadata = {
  title: '智能睡眠追踪器 Pro',
  description: '智能睡眠追踪器，帮助您记录和分析睡眠数据',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#667eea',
  width: 'device-width',
  initialScale: 1,
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
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
