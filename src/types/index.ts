export type ProjectLocation =
  | 'delhi'
  | 'mumbai'
  | 'kolkata'
  | 'chennai'
  | 'hyderabad'
  | 'lucknow'
  | 'jaipur'
  | 'patna'
  | 'bhopal'
  | 'ahmedabad';

export interface Project {
  id: number;
  category: string;
  title: string;
  location: ProjectLocation;
  raised: number;
  goal: number;
  beneficiaries: string;
  image: string;
}
