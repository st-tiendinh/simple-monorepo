'use client';

import { Button, Calendar } from '@monorepo/packages/ui';
import './page.module.css';

export default function Home() {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-content">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">Welcome back! Here's your overview</p>
          </div>
          <div className="date-display">
            <svg
              className="date-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <Calendar />
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-grid">
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Users</p>
              <p className="stat-value">2,543</p>
              <p className="stat-change positive">+12.5%</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Revenue</p>
              <p className="stat-value">$54,239</p>
              <p className="stat-change positive">+8.2%</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Performance</p>
              <p className="stat-value">98.5%</p>
              <p className="stat-change positive">+2.1%</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Downloads</p>
              <p className="stat-value">1,234</p>
              <p className="stat-change negative">-3.4%</p>
            </div>
          </div>
        </div>

        <div className="action-section">
          <h2>Quick Actions</h2>
          <p className="section-description">
            Manage your dashboard with these actions
          </p>
          <div className="action-buttons">
            <Button onClick={() => alert('Hello from Next.js!')}>
              Create New
            </Button>
            <Button variant="secondary" onClick={() => alert('View reports')}>
              View Reports
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
