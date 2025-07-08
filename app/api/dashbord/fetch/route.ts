import { NextResponse } from 'next/server';

// Hardcoded data for now (matches frontend)
const skillData = {
  labels: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
  values: [30, 25, 20, 15, 10], // percentages
};

const projectTimeline = [
  {
    name: 'SEO Optimization for E-commerce',
    duration: { years: 0, months: 2, days: 10 },
  },
  {
    name: 'Social Media Campaign',
    duration: { years: 0, months: 1, days: 20 },
  },
  {
    name: 'Modern Portfolio Website',
    duration: { years: 0, months: 3, days: 5 },
  },
  {
    name: 'E-commerce Website',
    duration: { years: 0, months: 2, days: 15 },
  },
  {
    name: 'Fitness Tracking App',
    duration: { years: 0, months: 4, days: 0 },
  },
  {
    name: 'Food Delivery App',
    duration: { years: 0, months: 3, days: 10 },
  },
  {
    name: 'Payment Gateway Integration',
    duration: { years: 0, months: 1, days: 25 },
  },
  {
    name: '3rd‑Party CRM Sync',
    duration: { years: 0, months: 2, days: 5 },
  },
];

const TOTAL_PROJECTS = 42; // Hardcoded
const YEARS_EXPERIENCE = 5; // Hardcoded
const AVERAGE_RATING = 4.5; // Hardcoded fallback

export async function GET() {
  try {
    return NextResponse.json({
      skills: skillData,
      projectTimeline,
      stats: {
        totalProjects: TOTAL_PROJECTS,
        averageClientRating: AVERAGE_RATING,
        yearsOfExperience: YEARS_EXPERIENCE,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
