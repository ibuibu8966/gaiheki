'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>500</h2>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>エラーが発生しました</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => reset()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          再試行
        </button>
        <Link
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6b7280',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}
