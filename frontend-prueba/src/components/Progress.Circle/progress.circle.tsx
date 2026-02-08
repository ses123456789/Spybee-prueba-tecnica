'use client';

interface Props {
  value: number;   // abiertas
  total: number;   // total
}

export function ProgressCircle({ value, total }: Props) {
  const percentage = total === 0 ? 0 : (value / total) * 100;

  return (
    <div
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: `conic-gradient(#ff4d4f ${percentage}%, #eee 0%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
      }}
    >
      {value}
    </div>
  );
}
