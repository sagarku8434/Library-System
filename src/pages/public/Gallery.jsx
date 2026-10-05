import React from 'react';
import { Sparkles, Armchair, Shield, Coffee, Zap, Wifi } from 'lucide-react';

export default function Gallery() {
  const galleryItems = [
    {
      title: 'Hall of Socrates (Ground Floor)',
      description: 'Pin-drop silent study hall with individual power strips and acoustic baffles.',
      badge: 'Silent AC Pods',
      color: '#1e3a8a'
    },
    {
      title: 'Hall of Aristotle (First Floor)',
      description: 'High-walled cubicles engineered for uninterrupted 12-hour deep work cycles.',
      badge: 'Executive Cubicles',
      color: '#047857'
    },
    {
      title: 'Ergonomic Seating & Lighting',
      description: 'Dual lumbar-support mesh seating and anti-glare flicker-free warm LED desk lamps.',
      badge: 'Ergonomics',
      color: '#b45309'
    },
    {
      title: 'Locker & Secure Storage',
      description: 'Dedicated combination lockers for personal reference books, laptops, and study kits.',
      badge: 'Private Lockers',
      color: '#7c3aed'
    },
    {
      title: 'Discussion & Cafeteria Lounge',
      description: 'Separate soundproof zone for phone calls, meal breaks, and RO drinking water.',
      badge: 'Break Zone',
      color: '#0369a1'
    },
    {
      title: 'Dynamic QR Entrance Gate',
      description: 'Instant touchless check-in and automated real-time occupancy monitoring.',
      badge: 'Smart Technology',
      color: '#be123c'
    }
  ];

  return (
    <div style={{ padding: '50px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px' }}>
          <span className="badge badge-info" style={{ marginBottom: '8px' }}>Visual Tour</span>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
            Inside Athena Study Pods
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
            Designed specifically for aspirants who demand pristine silence, physical ergonomics, and 100% reliable amenities.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {galleryItems.map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Architectural Illustration Box */}
              <div style={{ 
                height: '200px', 
                background: `linear-gradient(135deg, ${item.color} 0%, #0f172a 100%)`, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
                padding: '20px'
              }}>
                <Armchair size={48} style={{ opacity: 0.8, marginBottom: '8px' }} />
                <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px', textAlign: 'center' }}>
                  {item.title}
                </span>
                <span className="badge" style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  {item.badge}
                </span>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '11px' }}>24/7 Access</span>
                  <span className="badge badge-neutral" style={{ fontSize: '11px' }}>High-Speed Fiber</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
