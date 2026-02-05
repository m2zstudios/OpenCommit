// PricingSection highlights membership tiers for OpenCommit.
// Pricing is informational only and does not change immutability guarantees.
import React from 'react';

const PricingSection = () => {
  return (
    <section className="card" style={{ marginTop: '24px' }}>
      <h2 style={{ marginTop: 0 }}>Pricing</h2>
      <p className="muted">
        OpenCommit is built for public accountability. Choose the plan that matches your level
        of commitment.
      </p>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h3>Public</h3>
          <p className="muted">$0 / month</p>
          <ul>
            <li>Read the public feed</li>
            <li>Create immutable commits</li>
            <li>Community visibility</li>
          </ul>
          <button className="secondary-button" type="button">Current Plan</button>
        </div>
        <div className="pricing-card highlight">
          <h3>Pro</h3>
          <p className="muted">$15 / month</p>
          <ul>
            <li>Profile customization</li>
            <li>Priority verification review</li>
            <li>Monthly accountability reports</li>
          </ul>
          <button className="primary-button" type="button">Upgrade</button>
        </div>
        <div className="pricing-card">
          <h3>Teams</h3>
          <p className="muted">$49 / month</p>
          <ul>
            <li>Shared team feed</li>
            <li>Role-based authoring</li>
            <li>Compliance export</li>
          </ul>
          <button className="secondary-button" type="button">Contact Sales</button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
