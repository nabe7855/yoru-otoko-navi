
export type Region = 'hokkaido' | 'tohoku' | 'kanto' | 'chubu' | 'kansai' | 'chugoku' | 'shikoku' | 'kyushu';

export interface RoleSalary {
  roleName: string;
  amount: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  age: number;
  storeName: string;
  area: string;
  monthlyIncome: string;
  formerIncome: string;
  formerJob: string;
  catchphrase: string;
  image: string;
}

export interface Job {
  id: string;
  storeName: string;
  industry: 'Cabaret' | 'Girls Bar' | 'Club' | 'Lounge' | 'Host';
  role: 'Boy' | 'Manager' | 'Driver' | 'Kitchen' | 'Escort';
  catchCopy?: string;
  location: string;
  access?: string;
  salary: {
    type: 'Monthly' | 'Daily' | 'Hourly';
    amount: string;
    description?: string;
  };
  roleSalaries?: RoleSalary[];
  tags: string[];
  thumbnail: string;
  isNew?: boolean;
  featured?: boolean;
  urgent?: boolean;
}

export interface FilterOptions {
  region?: string;
  prefecture?: string;
  role?: string[];
  industry?: string[];
  perks?: string[];
}
