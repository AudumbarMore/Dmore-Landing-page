import { Link } from 'react-router-dom';

const problems = [
  {
    icon: '📞',
    title: 'Order Chaos',
    description: 'Orders coming from phone calls, WhatsApp, Excel & registers',
  },
  {
    icon: '⏱️',
    title: 'Manual Planning',
    description: 'Manual planning, missed follow-ups, wrong batch calculations',
  },
  {
    icon: '🔄',
    title: 'Production Confusion',
    description: 'Production confusion, inventory losses, payment delays & dispatch inefficiency',
  },
];

const features = [
  {
    icon: '🚀',
    title: 'One-Click Order Collaboration',
    description: 'Combine ALL customer & dealer orders at one click. Automatic product-wise & quantity-wise consolidation. No duplicates, no missed orders.',
    highlight: true,
  },
  {
    icon: '🧠',
    title: 'End-to-End Business Control',
    description: 'CRM → Quotation → Order → Production → Inventory → Dispatch → Invoice → Payment. All departments on one live system.',
  },
  {
    icon: '📞',
    title: 'Strong CRM System',
    description: 'Every customer conversation recorded. Automatic follow-up reminders. Full customer history at one click.',
  },
  {
    icon: '🧾',
    title: 'Professional Quotation Management',
    description: 'One-click PDF quotation. Custom payment & delivery terms. Rate approval workflow from accounts department.',
  },
  {
    icon: '📊',
    title: 'Real-Time Order Tracking',
    description: 'Live order status: Accepted → Accounts Cleared → Production → Waiting for Dispatch → Dispatched',
  },
  {
    icon: '🏭',
    title: 'Automatic Production Planning',
    description: 'Orders automatically sorted product-wise. Combined order chart generated instantly. Clear production targets.',
  },
  {
    icon: '🧪',
    title: 'Error-Free Batch Chart Generation',
    description: 'One-click batch chart for required quantity. Accurate raw material calculation. Perfect batch scaling.',
  },
  {
    icon: '🎯',
    title: 'Built-In Quality Control',
    description: 'Density & viscosity recorded for every batch. Compared with reference values. Deviations identified immediately.',
  },
  {
    icon: '🔬',
    title: 'Advanced Formulation Intelligence',
    description: 'Master formulation stored for every product. Instant technical values: Density, Solids, SVR, PVC, CPVC.',
  },
  {
    icon: '⚙️',
    title: 'Formulation Optimization',
    description: 'Digital formulation optimization. Reduced wastage & trial batches. Better margins with controlled cost.',
  },
  {
    icon: '📱',
    title: 'Cloud & Mobile Access',
    description: 'Manage factory from anywhere. Approve orders, monitor production & update formulations remotely.',
  },
  {
    icon: '📦',
    title: 'Complete Inventory Transparency',
    description: 'Raw material auto-deducted from BOM. Finished goods stock created automatically. Full usage history.',
  },
  {
    icon: '🚨',
    title: 'Low Stock Alerts',
    description: 'Minimum stock levels defined. Automatic alerts before stock shortage. Real-time low stock reports.',
  },
  {
    icon: '🛒',
    title: 'Smart Purchase Planning',
    description: 'Consumption-based purchase planning. Avoid panic buying & excess stock. Save working capital.',
  },
  {
    icon: '🚚',
    title: 'Smart Dispatch & Load Optimization',
    description: 'Vehicle load capacity recorded. Orders combined to fully utilize tempo capacity. Lower transport cost.',
  },
  {
    icon: '🧾',
    title: 'Automatic Invoicing & Billing',
    description: 'Invoice auto-generated after dispatch. Systematic bill numbering. Complete billing history.',
  },
  {
    icon: '💳',
    title: 'Payments Dashboard',
    description: 'Customer-wise payment tracking. Outstanding & overdue visibility. Know who has paid and who has not.',
  },
  {
    icon: '📈',
    title: 'Sales Intelligence',
    description: 'Sales person-wise performance tracking. Dealer & customer purchase analysis. Identify customers who stopped buying.',
  },
];

const stats = [
  { label: 'From Lead to Dispatch', value: 'Smart System' },
  { label: 'Built', value: 'For Paint Manufacturers' },
  { label: 'Not', value: 'Generic ERP' },
];

const Landing = () => {
  return (
    <div className="landing">
      <section className="hero">
        <div className="badge">🚀 PaintOS</div>
        <h1>
          Smart ERP For Paint Manufacturers
        </h1>
        <p className="lede">
          From Lead to Dispatch — One Smart System. Upgrade your paint factory into a professionally managed, intelligent manufacturing unit.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to="/register">
            Start Your Smart Factory
          </Link>
          <Link className="btn ghost" to="/login">
            Already using PaintOS?
          </Link>
        </div>
        <div className="hero-highlight">
          <p>CRM • Production Planning • Inventory • Dispatch • Invoicing • Payments</p>
        </div>
      </section>

      <section id="problems" className="panel glass">
        <div className="panel-header">
          <h2>🔥 Biggest Problems in Paint Factories Today</h2>
          <p>These challenges are costing you time, money, and growth.</p>
        </div>
        <div className="feature-grid">
          {problems.map((problem) => (
            <div key={problem.title} className="feature-card problem-card">
              <div className="card-icon">{problem.icon}</div>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="panel glass">
        <div className="panel-header">
          <h2>✅ The Smart Solution — Designed Only For Paint Manufacturers</h2>
          <p>Complete end-to-end control of your paint manufacturing business.</p>
        </div>
        <div className="feature-grid-large">
          {features.map((feature) => (
            <div key={feature.title} className={`feature-card ${feature.highlight ? 'highlight-card' : ''}`}>
              <div className="card-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel cta-section">
        <div className="cta">
          <div>
            <p className="badge subtle">Stop Managing Chaos</p>
            <h2>Start Running a Smart Paint Factory</h2>
            <p>
              Less stress for owner. Fewer production mistakes. Better quality consistency. Lower material & logistics losses. Better cash-flow control. Strong foundation for growth.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn primary" to="/register">
              Launch Your Smart Factory Today
            </Link>
            <span className="hint">No credit card required. 7-day free trial.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
