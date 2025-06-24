"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { controlKnobsFramework } from '@/data/controlKnobsData';

// Adjusted positions: start lower and spaced evenly
const knobPositions = [
  { x: 80, y: 140 },   // Financing
  { x: 80, y: 240 },  // Payment
  { x: 80, y: 340 },  // Organization
  { x: 80, y: 440 },  // Regulation
  { x: 80, y: 540 },  // Behavior
];

// Bold, distinct colors for each knob (can be reused for tabs)
export const knobColors = [
  '#0074D9', // Financing - blue
  '#FF4136', // Payment - red
  '#2ECC40', // Organization - green
  '#FF851B', // Regulation - orange
  '#B10DC9', // Behavior - purple
];

const gauges = [
  { label: 'Efficiency', x: 230, y: 180 },
  { label: 'Quality', x: 230, y: 320 },
  { label: 'Access', x: 230, y: 460 },
];

const performanceGoals = [
  { label: 'Health Status', x: 480, y: 180 },
  { label: 'Customer Satisfaction', x: 480, y: 320 },
  { label: 'Financial Risk Protection', x: 480, y: 460 },
];

// Helper to generate a random angle between 15deg and 165deg (in radians)
function getRandomDialAngle() {
  const min = 0.2618; // 15deg in radians
  const max = 2.8798; // 165deg in radians
  return Math.random() * (max - min) + min;
}

// Definitions for dial outcomes
const outcomeDefinitions: { [label: string]: string } = {
  'Efficiency': 'The ability of the health system to maximize outputs from given resources.',
  'Quality': 'The degree to which health services increase the likelihood of desired health outcomes.',
  'Access': 'The ease with which people can obtain needed health services.',
  'Health Status': 'The overall health outcomes of the target population.',
  'Customer Satisfaction': 'The degree to which patients are satisfied with the health services they receive.',
  'Financial Risk Protection': 'The extent to which people are protected from financial hardship due to health care costs.'
};

function Gauge({ x, y, label }: { x: number; y: number; label: string }) {
  const [hovered, setHovered] = useState(false);
  const [dialAngle, setDialAngle] = useState(0.2618); // deterministic initial angle to avoid hydration mismatch

  // Randomize after component mounts (client side only)
  useEffect(() => {
    setDialAngle(getRandomDialAngle());
  }, []);

  const arcColor = hovered ? '#0074D9' : '#666';
  const labelColor = hovered ? '#0074D9' : '#222';
  const arcOpacity = hovered ? 0.85 : 1;

  const arcStroke = 16;
  const r = 50; // radius of arc
  const dialLength = 38;
  // Dial angle: 15deg to 165deg (in radians)
  const dialX2 = x + dialLength * Math.cos(Math.PI + dialAngle);
  const dialY2 = y + dialLength * Math.sin(Math.PI + dialAngle);

  // Horizontal line at the base of the arc (flush with arc's outer edge, 3px each side)
  const baseLinePad = 3; // 3px on each side
  const baseLineX1 = x - r - baseLinePad;
  const baseLineY = y;
  const baseLineX2 = x + r + baseLinePad;

  // On hover, animate dial to a new random angle
  const handleMouseEnter = () => {
    setHovered(true);
    setDialAngle(getRandomDialAngle());
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={label}
      className="cursor-pointer focus:outline-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => console.log(`Gauge clicked: ${label}`)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') console.log(`Gauge clicked: ${label}`); }}
    >
      {/* Arc */}
      <path
        d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y}`}
        fill="none"
        stroke={arcColor}
        strokeWidth="16"
        opacity={arcOpacity}
        style={{ transition: 'stroke 0.2s, opacity 0.2s' }}
      />
      {/* Dial (needle) - random orientation within arc */}
      <line
        x1={x}
        y1={y}
        x2={dialX2}
        y2={dialY2}
        stroke="#222"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ transition: 'stroke 0.2s' }}
      />
      {/* Horizontal base line (flush with arc's outer edge) */}
      <line
        x1={baseLineX1}
        y1={baseLineY}
        x2={baseLineX2}
        y2={baseLineY}
        stroke={arcColor}
        strokeWidth={arcStroke - 6}
        strokeLinecap="round"
        opacity={arcOpacity}
        style={{ transition: 'stroke 0.2s, opacity 0.2s' }}
      />
      {/* Label */}
      <text
        x={x}
        y={y + 38}
        textAnchor="middle"
        fontSize="17"
        fontWeight="bold"
        fill={labelColor}
        style={{ transition: 'fill 0.2s' }}
        pointerEvents="none"
      >
        {label}
      </text>
      {/* Tooltip */}
      {hovered && outcomeDefinitions[label] && (
        <foreignObject x={x - 90} y={y - 80} width="180" height="60">
          <div style={{
            background: 'rgba(255,255,255,0.97)',
            border: '1px solid #bbb',
            borderRadius: 8,
            padding: 10,
            fontSize: 14,
            color: '#222',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            {outcomeDefinitions[label]}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

function PerformanceGoalGauge({ x, y, label }: { x: number; y: number; label: string }) {
  const [hovered, setHovered] = useState(false);
  const [dialAngle, setDialAngle] = useState(0.2618);

  useEffect(() => {
    setDialAngle(getRandomDialAngle());
  }, []);

  const arcColor = hovered ? '#39CCCC' : '#666';
  const labelColor = hovered ? '#39CCCC' : '#222';
  const arcOpacity = hovered ? 0.85 : 1;
  const arcStroke = 16;
  const r = 50;
  const dialLength = 38;
  const dialX2 = x + dialLength * Math.cos(Math.PI + dialAngle);
  const dialY2 = y + dialLength * Math.sin(Math.PI + dialAngle);
  const baseLinePad = 3;
  const baseLineX1 = x - r - baseLinePad;
  const baseLineY = y;
  const baseLineX2 = x + r + baseLinePad;
  const handleMouseEnter = () => {
    setHovered(true);
    setDialAngle(getRandomDialAngle());
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={label}
      className="cursor-pointer focus:outline-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => console.log(`Performance Goal Gauge clicked: ${label}`)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') console.log(`Performance Goal Gauge clicked: ${label}`); }}
    >
      {/* Arc */}
      <path
        d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y}`}
        fill="none"
        stroke={arcColor}
        strokeWidth={arcStroke}
        opacity={arcOpacity}
        style={{ transition: 'stroke 0.2s, opacity 0.2s' }}
      />
      {/* Dial */}
      <line
        x1={x}
        y1={y}
        x2={dialX2}
        y2={dialY2}
        stroke="#222"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ transition: 'stroke 0.2s' }}
      />
      {/* Horizontal base line */}
      <line
        x1={baseLineX1}
        y1={baseLineY}
        x2={baseLineX2}
        y2={baseLineY}
        stroke={arcColor}
        strokeWidth={arcStroke - 6}
        strokeLinecap="round"
        opacity={arcOpacity}
        style={{ transition: 'stroke 0.2s, opacity 0.2s' }}
      />
      {/* Label */}
      <text
        x={x}
        y={y + 38}
        textAnchor="middle"
        fontSize="15"
        fontWeight="bold"
        fill={labelColor}
        style={{ transition: 'fill 0.2s' }}
        pointerEvents="none"
      >
        {label}
      </text>
      {/* Tooltip */}
      {hovered && outcomeDefinitions[label] && (
        <foreignObject x={x - 90} y={y - 80} width="180" height="60">
          <div style={{
            background: 'rgba(255,255,255,0.97)',
            border: '1px solid #bbb',
            borderRadius: 8,
            padding: 10,
            fontSize: 14,
            color: '#222',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            {outcomeDefinitions[label]}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

export default function ControlKnobsDiagram() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center">
      <svg width="600" height="650" viewBox="0 0 600 650" aria-label="Control Knobs Diagram">
        {/* Large Title */}
        <text x="210" y="32" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#222">The Control Knobs</text>
        {/* Background for Health System */}
        <rect x="0" y="0" width="350" height="650" rx="40" fill="#cfe2f3" />
        <text x="175" y="70" textAnchor="middle" fontSize="22" fontWeight="bold">THE HEALTH SYSTEM</text>
        {/* Knobs */}
        {controlKnobsFramework.knobs.map((knob, idx) => (
          <g
            key={knob.id}
            tabIndex={0}
            aria-label={knob.name}
            role="button"
            className="cursor-pointer focus:outline-none"
            onClick={() => router.push(`/frameworks/control-knobs/${knob.id}`)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/frameworks/control-knobs/${knob.id}`); }}
          >
            <circle
              cx={knobPositions[idx].x}
              cy={knobPositions[idx].y}
              r="40"
              fill={knobColors[idx]}
              stroke="#333"
              strokeWidth="3"
              className="transition-opacity hover:opacity-80 focus:opacity-90"
            />
            <text
              x={knobPositions[idx].x}
              y={knobPositions[idx].y + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#fff"
              pointerEvents="none"
              style={{dominantBaseline: 'middle'}}
            >
              {knob.name}
            </text>
          </g>
        ))}
        {/* Gauges for intermediate performance measures */}
        {gauges.map(g => (
          <Gauge key={g.label} x={g.x} y={g.y} label={g.label} />
        ))}
        {/* Target Population Section */}
        {/* Background for Target Population */}
        <rect x="370" y="0" width="220" height="650" rx="40" fill="#cfe2f3" />
        <text x="480" y="70" textAnchor="middle" fontSize="20" fontWeight="bold">TARGET POPULATION</text>
        {/* Performance Goal Gauges */}
        {performanceGoals.map(g => (
          <PerformanceGoalGauge key={g.label} x={g.x} y={g.y} label={g.label} />
        ))}
      </svg>
    </div>
  );
} 