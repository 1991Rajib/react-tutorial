import { use, Suspense, useState } from 'react';

// Simulated API function that returns a Promise
function fetchWeatherForecast() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city: 'San Francisco, CA',
        temp: '68°F',
        condition: 'Sunny ☀️',
        humidity: '45%',
        wind: '8 mph',
        updatedAt: new Date().toLocaleTimeString(),
      });
    }, 1800);
  });
}

// Child component that directly uses the Promise!
function WeatherCard({ forecastPromise }) {
  // ✨ React 19: Suspends component until forecastPromise resolves!
  const data = use(forecastPromise);

  return (
    <div
      style={{
        padding: '16px',
        background: '#0b1120',
        borderRadius: '8px',
        border: '1px solid var(--primary)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'var(--primary)', fontSize: '18px' }}>{data.city}</h4>
        <span style={{ fontSize: '24px' }}>{data.condition}</span>
      </div>
      <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '8px 0' }}>{data.temp}</p>
      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
        <span>💧 Humidity: {data.humidity}</span>
        <span>💨 Wind: {data.wind}</span>
      </div>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
        Last updated: {data.updatedAt}
      </p>
    </div>
  );
}

// Skeleton Fallback for Suspense
function WeatherSkeleton() {
  return (
    <div
      style={{
        padding: '16px',
        background: '#0b1120',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        opacity: 0.6,
      }}
    >
      <div style={{ height: '20px', width: '60%', background: 'var(--border-color)', borderRadius: '4px', marginBottom: '12px' }} />
      <div style={{ height: '36px', width: '30%', background: 'var(--border-color)', borderRadius: '4px', marginBottom: '12px' }} />
      <div style={{ height: '14px', width: '80%', background: 'var(--border-color)', borderRadius: '4px' }} />
      <p style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '12px' }}>
        ⏳ Loading live weather via React Suspense...
      </p>
    </div>
  );
}

export default function AdvancedExample() {
  // Initial promise created once
  const [promise, setPromise] = useState(() => fetchWeatherForecast());

  const handleRefresh = () => {
    // Creating a new promise will automatically trigger Suspense fallback!
    setPromise(fetchWeatherForecast());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Modern Data Fetching: <code>use(Promise)</code> + Suspense</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Notice how the component contains ZERO <code>useEffect</code>, ZERO <code>loading</code> boolean, and ZERO manual state synchronization!
        </p>

        <button
          onClick={handleRefresh}
          style={{ background: 'var(--primary)', color: '#0f172a', fontWeight: 'bold', marginBottom: '16px' }}
        >
          🔄 Refresh Forecast (Triggers Suspense)
        </button>
      </div>

      <div style={{ maxWidth: '420px' }}>
        <Suspense fallback={<WeatherSkeleton />}>
          <WeatherCard forecastPromise={promise} />
        </Suspense>
      </div>
    </div>
  );
}
