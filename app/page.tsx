'use client'; // 强制客户端组件，必须置顶
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

// 强制动态渲染，避免 SSR 导致的上下文问题
export const dynamic = 'force-dynamic';

// 核心：把需要 Hooks 的逻辑拆成子组件（彻底解决顺序问题）
function AuthContent() {
  // 所有 Hooks 都在子组件顶部，顺序绝对固定
  const { data: session, status } = useSession();

  // 1. Session 加载中
  if (status === 'loading') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        验证登录状态中...
      </div>
    );
  }

  // 2. 未登录
  if (!session) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '100px auto',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>欢迎使用 Next.js + Neon + Drizzle + NextAuth</h1>
        <p style={{ margin: '20px 0' }}>请先登录以继续</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link
            href="/auth/signin"
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            登录
          </Link>
          <Link
            href="/auth/signup"
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            注册
          </Link>
        </div>
      </div>
    );
  }

  // 3. 已登录
  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div>
          <h2>欢迎, {session.user?.username}!</h2>
          <p style={{ color: '#666', marginTop: '5px' }}>
            邮箱: {session.user?.email}
          </p>
          <p style={{ color: '#666' }}>
            用户ID: {session.user?.id}
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          退出登录
        </button>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <h3>🗄️ 数据库操作</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            测试 Drizzle ORM 与 Neon PostgreSQL 的连接
          </p>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <Link
              href="/api/test-drizzle"
              style={{
                padding: '8px 16px',
                backgroundColor: '#0070f3',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              查询用户
            </Link>
          </div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <h3>🔐 认证状态</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            您已成功登录，NextAuth 工作正常！
          </p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <h3>📚 API 端点</h3>
          <ul style={{ marginTop: '10px', paddingLeft: '20px', color: '#666' }}>
            <li><code>/api/test-db</code> - 数据库连接测试</li>
            <li><code>/api/test-drizzle</code> - Drizzle ORM 查询</li>
            <li><code>/api/auth/signin</code> - NextAuth 登录</li>
            <li><code>/api/auth/signup</code> - 用户注册</li>
            <li><code>/api/auth/register</code> - 注册接口</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// 主组件：只做渲染，不调用任何 Hooks（彻底避免顺序问题）
export default function Home() {
  return (
    <div>
      <AuthContent />
    </div>
  );
}
