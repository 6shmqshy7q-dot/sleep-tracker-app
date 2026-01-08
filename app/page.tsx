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
          <h2>欢迎使用智能睡眠追踪器 Pro, {session.user?.username}!</h2>
          <p style={{ color: '#666', marginTop: '5px' }}>
            邮箱: {session.user?.email}
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
          padding: '30px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>🌙 睡眠记录</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            记录您的每日睡眠时间，追踪睡眠质量，建立良好的睡眠习惯
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              href="/sleep"
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              开始记录 →
            </Link>
          </div>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>📊 数据分析</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            查看睡眠趋势分析，获取个性化建议，优化您的睡眠质量
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              href="/analytics"
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              查看分析 →
            </Link>
          </div>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>💡 智能建议</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            基于您的睡眠数据，AI 会为您提供个性化的睡眠改善建议
          </p>
          <div style={{
            padding: '15px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '10px',
            fontSize: '14px'
          }}>
            💡 提示：记录至少 3 天的睡眠数据后，您将获得更准确的建议
          </div>
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
