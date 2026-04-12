export interface VehicleSpecs {
  acceleration: string;    // "3.0s"
  horsepower: number;      // 518
  topSpeed: number;        // 184
  drivetrain: string;      // "RWD"
  transmission: string;    // "7-Speed PDK"
  downforce?: string;      // "1,895 lbs at 177 mph"
}

export interface VehicleDetails {
  odometer: string;        // "142 Miles"
  interior: string;        // "Black / Arctic Grey"
  engine: string;          // "4.0L Flat-6"
}

export interface VehicleImages {
  hero: string;
  gallery: string[];
  thumbnail: string;
}

export interface Vehicle {
  slug: string;
  make: string;
  model: string;
  year: number;
  tagline: string;
  price: number;
  monthlyLease: number;
  category: "coupe" | "suv" | "sedan" | "convertible";
  manufacturer: "porsche" | "ferrari" | "lamborghini" | "land-rover" | "mercedes" | "bmw" | "aston-martin" | "rolls-royce" | "other";
  specs: VehicleSpecs;
  details: VehicleDetails;
  badge?: "new-arrival" | "certified-pre-owned";
  images: VehicleImages;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;         // Material Symbol name
  href: string;
  backgroundImage?: string;
  badge?: string;
}
