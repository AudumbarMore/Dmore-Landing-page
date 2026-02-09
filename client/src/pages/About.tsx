const About = () => {
  const stats = [
    { number: '50+', label: 'Paint Factories Using PaintOS' },
    { number: '2M+', label: 'Orders Processed' },
    { number: '100K+', label: 'Batches Optimized' },
    { number: '15M+', label: 'Working Capital Saved' },
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      background: '15+ years in paint manufacturing',
      emoji: '👔',
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      background: '10+ years in SaaS technology',
      emoji: '💻',
    },
    {
      name: 'Vikram Patel',
      role: 'Head of Product',
      background: 'Paint factory operations expert',
      emoji: '🎯',
    },
    {
      name: 'Aneesha Singh',
      role: 'VP Customer Success',
      background: 'Paint industry consultant',
      emoji: '🤝',
    },
  ];

  return (
    <div className="content-page">
      <div className="page-hero">
        <div className="hero-content">
          <div className="badge">About PaintOS</div>
          <h1>Transforming Paint Manufacturing with Smart Technology</h1>
          <p className="lede">
            Built by paint industry experts who understand the challenges of traditional manufacturing and logistics.
          </p>
        </div>
      </div>

      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel glass">
        <div className="panel-header">
          <h2>🎯 Our Mission</h2>
          <p>Empowering paint manufacturers with intelligent systems</p>
        </div>
        <div className="mission-content">
          <div className="mission-grid">
            <div className="mission-item">
              <div className="mission-icon">🏭</div>
              <h3>Industry-First Approach</h3>
              <p>We're not another generic ERP. We're built specifically for paint manufacturers' unique challenges.</p>
            </div>
            <div className="mission-item">
              <div className="mission-icon">⚡</div>
              <h3>End-to-End Solutions</h3>
              <p>From order to dispatch, we cover every aspect of your paint manufacturing business.</p>
            </div>
            <div className="mission-item">
              <div className="mission-icon">📈</div>
              <h3>Growth Focused</h3>
              <p>We succeed when your business grows. Your success is our success.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel glass">
        <div className="panel-header">
          <h2>💡 Why We Started</h2>
          <p>The challenges paint manufacturers face daily</p>
        </div>
        <div className="challenges-grid">
          <div className="challenge-card">
            <div className="challenge-emoji">📞</div>
            <h3>Order Chaos</h3>
            <p>Orders from phone, WhatsApp, email, and direct channels creating confusion and delays.</p>
          </div>
          <div className="challenge-card">
            <div className="challenge-emoji">🧮</div>
            <h3>Complex Planning</h3>
            <p>Manual batch calculations and production planning prone to errors and inefficiency.</p>
          </div>
          <div className="challenge-card">
            <div className="challenge-emoji">🧪</div>
            <h3>Quality Control</h3>
            <p>Tracking density, viscosity, and technical values manually across batches.</p>
          </div>
          <div className="challenge-card">
            <div className="challenge-emoji">📦</div>
            <h3>Inventory Issues</h3>
            <p>Complex raw material and finished goods inventory management causing bottlenecks.</p>
          </div>
          <div className="challenge-card">
            <div className="challenge-emoji">🚚</div>
            <h3>Logistics Losses</h3>
            <p>Vehicle capacity underutilization and inefficient dispatch planning.</p>
          </div>
          <div className="challenge-card">
            <div className="challenge-emoji">💰</div>
            <h3>Cash Flow Issues</h3>
            <p>Poor payment tracking and working capital management affecting growth.</p>
          </div>
        </div>
      </section>

      <section className="panel glass">
        <div className="panel-header">
          <h2>🌟 Our Core Values</h2>
          <p>What drives us every single day</p>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🎯</div>
            <h3>Focus</h3>
            <p>We stay laser-focused on paint manufacturing. That's where our expertise lies and where we create the most value.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🚀</div>
            <h3>Innovation</h3>
            <p>Constantly improving based on real feedback from paint factory owners and managers in the field.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Partnership</h3>
            <p>We're not just vendors. We're partners in your growth journey. Your success is genuinely our success.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🛡️</div>
            <h3>Security</h3>
            <p>Your sensitive business data gets military-grade protection. We take security as our top responsibility.</p>
          </div>
        </div>
      </section>

      <section className="panel glass">
        <div className="panel-header">
          <h2>👥 Meet The Team</h2>
          <p>Industry experts building solutions for paint manufacturers</p>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <div key={member.name} className="team-card">
              <div className="team-avatar">{member.emoji}</div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-background">{member.background}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel glass">
        <div className="panel-header">
          <h2>📚 Our Story</h2>
          <p>How it all began</p>
        </div>
        <div className="story-content">
          <div className="story-item">
            <div className="story-number">01</div>
            <div className="story-text">
              <h3>The Problem</h3>
              <p>
                Our founder spent 15 years in paint manufacturing and saw the same problems repeated across every factory: chaotic order management, manual processes, quality inconsistencies, and poor visibility.
              </p>
            </div>
          </div>
          <div className="story-item">
            <div className="story-number">02</div>
            <div className="story-text">
              <h3>The Realization</h3>
              <p>
                Existing ERP systems were built for generic manufacturing. They didn't understand the unique complexities of paint production: batch calculations, formulation management, custom quality parameters, and logistics optimization.
              </p>
            </div>
          </div>
          <div className="story-item">
            <div className="story-number">03</div>
            <div className="story-text">
              <h3>The Solution</h3>
              <p>
                We assembled a team of paint industry experts and experienced engineers to build PaintOS - a system designed from the ground up for paint manufacturers, addressing every challenge paint factories face.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel glass highlight-section">
        <div className="highlight-grid">
          <div className="highlight-item">
            <h3>For Paint Factory Owners</h3>
            <p>Transform your business with intelligent systems that reduce costs and improve efficiency across all departments.</p>
            <a href="/register" className="link-arrow">Explore for Owners →</a>
          </div>
          <div className="highlight-item">
            <h3>For Operations Team</h3>
            <p>Get complete visibility into production, inventory, and dispatch with real-time dashboards and analytics.</p>
            <a href="/register" className="link-arrow">See Operations Tools →</a>
          </div>
          <div className="highlight-item">
            <h3>For Finance Team</h3>
            <p>Track payments, manage cash flow, and get insights into profitability with integrated billing and analytics.</p>
            <a href="/register" className="link-arrow">View Finance Features →</a>
          </div>
        </div>
      </section>

      <section className="panel cta-section">
        <div className="cta">
          <div>
            <h2>Ready to Transform Your Paint Factory?</h2>
            <p>
              Join 50+ paint manufacturers already running smarter operations with PaintOS. Start your free 7-day trial today.
            </p>
          </div>
          <div className="cta-actions">
            <a href="/register" className="btn primary">
              Start Free Trial
            </a>
            <span className="hint">No credit card required. 7-day free trial.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
