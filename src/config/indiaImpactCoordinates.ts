import { ProjectLocation } from '@/types';

export const INDIA_IMPACT_COORDINATES: Record<
  ProjectLocation,
  { x: number; y: number; label: string }
> = {
  delhi: { x: 187, y: 210, label: 'Delhi' },
  mumbai: { x: 125, y: 425, label: 'Mumbai, Maharashtra' },
  kolkata: { x: 415, y: 375, label: 'Kolkata, West Bengal' },
  chennai: { x: 230, y: 565, label: 'Chennai, Tamil Nadu' },
  hyderabad: { x: 226, y: 458, label: 'Hyderabad, Telangana' },
  lucknow: { x: 285, y: 250, label: 'Lucknow, Uttar Pradesh' },
  jaipur: { x: 175, y: 255, label: 'Jaipur, Rajasthan' },
  patna: { x: 365, y: 270, label: 'Patna, Bihar' },
  bhopal: { x: 245, y: 345, label: 'Bhopal, Madhya Pradesh' },
  ahmedabad: { x: 95, y: 340, label: 'Ahmedabad, Gujarat' },
};
