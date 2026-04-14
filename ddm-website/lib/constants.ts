import type { NavLink, Vehicle, ServiceItem } from "./types";

// ---------------------------------------------------------------------------
// Business Info
// ---------------------------------------------------------------------------
export const BUSINESS_INFO = {
  name: "Dream Drive Motors",
  address: "15132 Arrow Hwy, Baldwin Park, CA",
  phone: "626-257-4368",
  email: "dreamdrivemotors1@gmail.com",
  tagline:
    "The gold standard in pre-owned automotive excellence and bespoke financial services.",
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Leasing", href: "/leasing" },
  { label: "Financing", href: "/financing" },
  { label: "Credit Application", href: "/apply" },
  { label: "Sell Your Car", href: "/acquisition" },
  { label: "Trade-Ins", href: "/trade-in" },
  { label: "Delivery", href: "/delivery" },
  { label: "Contact", href: "/contact" },
];

// ---------------------------------------------------------------------------
// Lease Defaults
// ---------------------------------------------------------------------------
export const LEASE_DEFAULTS = {
  residualPercent: 0.5,
  moneyFactor: 0.00125,
} as const;

// ---------------------------------------------------------------------------
// Vehicles
// ---------------------------------------------------------------------------
export const VEHICLES: Vehicle[] = [
  {
    slug: "porsche-911-gt3-rs",
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    tagline: "Born on the track. Unleashed on the street.",
    price: 215900,
    monthlyLease: 3450,
    category: "coupe",
    manufacturer: "porsche",
    badge: "new-arrival",
    specs: {
      acceleration: "3.0s",
      horsepower: 518,
      topSpeed: 184,
      drivetrain: "RWD",
      transmission: "7-Speed PDK",
      downforce: "1,895 lbs at 177 mph",
    },
    details: {
      odometer: "142 Miles",
      interior: "Black / Arctic Grey",
      engine: "4.0L Flat-6",
    },
    images: {
      hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz1VKO7PPNLCY77sBOvIH-61n9xGWD2A25brleceAk-ZJBqK1zObAR2cDRP39wtH1UoMvS1tXwhPGsTP99yOdP4RxdI9C-q6vGM-dbF463n3ZegstH1UYhaIdm68v4j0iIw5ktcMVsNGjhlO9XDx_4F_x2nuHwbOxsYZF0ahMQ8wPitKE6j9f60teq3HBZTsHhWjmUt57OUue9SrPHDIg9OcdO2QmqBStyEz0mEhcyogtOjGCICzxVl99YdPbaNM3-BGgdfXyaeic",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZJQ73nGHEcjj8n6sKOjq2K9MUDCWxdZo0aUZJzpwwYXAk1HeltuplDWMU-6Ar2XoQD5g1y5C3ZVb5vVjrAvIqi0aoIEIB8Pp4aLfM07MlACvKY39pzW-tFzRtgwS5nCzBtI34ars3x-f3Os0tr-GIYhnR7_PIgI52VduN6JhhuyfdbOHelSpnSieY-XOD9mlmabn0_WWdF8GL8xxaAS5AGqujlSo07C5nF63_PAq9T9i16hmdnu1oKJDXY5eTotfdxmPQ5y6zPA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFDAG_WxklGT4PXgqoVL0TqhN8CLaYQrx0yyOAnkCUy9hKskGe_ZrbXwOfPoWGm6D3s-YxEGaw1r4V2m1L08l63oN6d37OwzTtQYN2cW9R43xlkiW_JRDUxnBZT2tGHbzzFTmazR4YFl4V2BQ7mRhgjJLp2IhBqBqzyeWKtv9h89BR-WtJAnlXbEd0SXd9nB-IwMxuwr2dXsYlRgnXCg21FYhaG3e3J0gfFlyz4xnVgn10Nh-UjTTq-Gsbtnpv2zvj042xkAzCKns",
      ],
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFDAG_WxklGT4PXgqoVL0TqhN8CLaYQrx0yyOAnkCUy9hKskGe_ZrbXwOfPoWGm6D3s-YxEGaw1r4V2m1L08l63oN6d37OwzTtQYN2cW9R43xlkiW_JRDUxnBZT2tGHbzzFTmazR4YFl4V2BQ7mRhgjJLp2IhBqBqzyeWKtv9h89BR-WtJAnlXbEd0SXd9nB-IwMxuwr2dXsYlRgnXCg21FYhaG3e3J0gfFlyz4xnVgn10Nh-UjTTq-Gsbtnpv2zvj042xkAzCKns",
    },
  },
  {
    slug: "ferrari-roma-spider",
    make: "Ferrari",
    model: "Roma Spider",
    year: 2024,
    tagline: "La dolce vita, redefined.",
    price: 285000,
    monthlyLease: 4120,
    category: "convertible",
    manufacturer: "ferrari",
    specs: {
      acceleration: "3.4s",
      horsepower: 612,
      topSpeed: 199,
      drivetrain: "RWD",
      transmission: "8-Speed DCT",
    },
    details: {
      odometer: "387 Miles",
      interior: "Rosso / Crema",
      engine: "3.9L V8 Biturbo",
    },
    images: {
      hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG2MCM9ciuVU6jvMVBnRNlfW4kifQS2RBS6CjztM2xulCjl6IoYHU0kmTGzpUwjhzNxBTQPFKO_eKfgFHaPtgjkhCc6bx6Epz8585uYOFiTK1Z3jfxkLtw7JRxsL1zX7KUczi-Pddm3Ibq9wNgzFM_xXAyw2Dc57wvqYT7ng36ywImNzACHyWRGqzZIQ_vkqaWAzN-uKE_2JvG68YncFMj15wuj9j-Wt7kMyuKdq7ZseGgODQtezQHuJMqyorDMuOBxdqJCli58Vw",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZJQ73nGHEcjj8n6sKOjq2K9MUDCWxdZo0aUZJzpwwYXAk1HeltuplDWMU-6Ar2XoQD5g1y5C3ZVb5vVjrAvIqi0aoIEIB8Pp4aLfM07MlACvKY39pzW-tFzRtgwS5nCzBtI34ars3x-f3Os0tr-GIYhnR7_PIgI52VduN6JhhuyfdbOHelSpnSieY-XOD9mlmabn0_WWdF8GL8xxaAS5AGqujlSo07C5nF63_PAq9T9i16hmdnu1oKJDXY5eTotfdxmPQ5y6zPA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVP6rMNleQeRlFOjCRUV6WUG2KHKNHLfQTkJTwLjcfTP8R39sTFmrzD6i23S9CfImYQQMEmLKtstbmC5IMIbUvFSlex0ibsHudZ6zek9G9cpcmDfMnNaNSgGWVdGurFWttPTDclWOZCxPt9AukvAf7ddFJ3eNA2YE8j6oOfvRhGWn16AQEDozFvkIWGlfymCgABMKty6yeXyUk7pnqp_8XxrtHA4gIblapToBncAr8feWuod1QLHnOL3akz-8sifHfiJcjrBtAYw",
      ],
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG2MCM9ciuVU6jvMVBnRNlfW4kifQS2RBS6CjztM2xulCjl6IoYHU0kmTGzpUwjhzNxBTQPFKO_eKfgFHaPtgjkhCc6bx6Epz8585uYOFiTK1Z3jfxkLtw7JRxsL1zX7KUczi-Pddm3Ibq9wNgzFM_xXAyw2Dc57wvqYT7ng36ywImNzACHyWRGqzZIQ_vkqaWAzN-uKE_2JvG68YncFMj15wuj9j-Wt7kMyuKdq7ZseGgODQtezQHuJMqyorDMuOBxdqJCli58Vw",
    },
  },
  {
    slug: "range-rover-sv",
    make: "Land Rover",
    model: "Range Rover SV",
    year: 2024,
    tagline: "Command every road with effortless refinement.",
    price: 198500,
    monthlyLease: 2890,
    category: "suv",
    manufacturer: "land-rover",
    badge: "certified-pre-owned",
    specs: {
      acceleration: "4.4s",
      horsepower: 606,
      topSpeed: 155,
      drivetrain: "AWD",
      transmission: "8-Speed Automatic",
    },
    details: {
      odometer: "4,218 Miles",
      interior: "Caraway / Perlino",
      engine: "4.4L V8 Twin-Turbo",
    },
    images: {
      hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu5ETpZhnNP6d9fDgiXrlVAgzsnNKuHEeTf0rX9VjHaELosqs40jVcGlxfG1lpdKAryMDpV2xD6_glRsn5ws7ujoaDq2a5drVEtUEJZXhtlBcbFQM-68NFiz6t_-72n-1OJaCoaX8BoQtMgVfAgsdsyUf2nn0jT0zLSguvMeTjOEAzYgjPQdwJS-tSWMQcvNF8XMrhDTkccTlh3fESDFkjARPFhDV3kQoqJDif5CtsurLvrrxlGmgybCn2EgGMJX7Ro6L7aMdmvrs",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC7ECdBRaB2JNc2-27D5f8ZU92NYtIAq9pJ0tlVmbikvNjmG7l8bEyOjzw_oDoqz6pDvgymFDwXy7ItN-vdch9dOZkb11uKIHrAmjncjkn89J0I5_5VugwEIT7sTdp1X-rWRxgx5blw6gySfPi2Dm4uBz0Zr9iTj8dGlv2cg1maI6eKb58s5USMs0uMY_CivqQeD5PtFe92YA1BYkg9QnWGeR86GdZK52mnFYraQ6_sNnKSYmjQKibagPtlXJa7qZvNJGUxdSLhCOI",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpApBXBaWZb0UbEqoIIxN2KGjJ-Y-dyOkCxO20iM8JMHg-yyvYJypJzDCgFheD9U0gU_vMqeu6FtFQCXajzm6oHPA6Ne7XSED1-iaxTRlyXMhGHfufLVpvDLbNi0AY6q6aeR3rf50lR2OATW8d4wY07jWKyq-AVsiAHpRJxF8bkZ4AII5dW1IRX9duCKE-WTrhdxnmvLzSznde76-T6FO24D4S3OfUxKXgzQluJMWwd1I4TCqb8f-np3n6Rb9J1qUUP_jCLnRKs8",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA",
      ],
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu5ETpZhnNP6d9fDgiXrlVAgzsnNKuHEeTf0rX9VjHaELosqs40jVcGlxfG1lpdKAryMDpV2xD6_glRsn5ws7ujoaDq2a5drVEtUEJZXhtlBcbFQM-68NFiz6t_-72n-1OJaCoaX8BoQtMgVfAgsdsyUf2nn0jT0zLSguvMeTjOEAzYgjPQdwJS-tSWMQcvNF8XMrhDTkccTlh3fESDFkjARPFhDV3kQoqJDif5CtsurLvrrxlGmgybCn2EgGMJX7Ro6L7aMdmvrs",
    },
  },
  {
    slug: "mercedes-s-class",
    make: "Mercedes",
    model: "S 580",
    year: 2024,
    tagline: "The benchmark of luxury, elevated.",
    price: 125000,
    monthlyLease: 1850,
    category: "sedan",
    manufacturer: "mercedes",
    specs: {
      acceleration: "4.4s",
      horsepower: 429,
      topSpeed: 130,
      drivetrain: "AWD",
      transmission: "9-Speed Automatic",
    },
    details: {
      odometer: "6,541 Miles",
      interior: "Black / Macchiato Beige",
      engine: "4.0L V8 Biturbo",
    },
    images: {
      hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVeDPBTHrXZQtmz7rvkROGmpSJ5ZBBiCawmniuHAWThHGFbZOpulcKxMolcJPMz8pEkOY7XqrzLTWZncTvFfOszXXDilCJKMk2IPUbarFqU5JbGJ9d3YzCWf9CCoaAmOH2W8OXh1JG5uu9dIUqqRwtlsmbhpFy6Yz3T2an4naqYeWfdw3EA5OVG_gAIzvM4cJuHx81f1hqgDJjgTY8FZf6S6yePldIaWijA3-mLdB2GBR-djpQksguT-HFkA_PQnBlj4e1QNKNPgI",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCuBmiTxjQD3VNN3YIbE1K209QgtZm00zAdKTRBkwcJt2rXzlk0CEq03qvjNvOllxpsZtM7TcOjY-0Yizm-L3RgOtJ6lC1HlQoEA_lwAsIgxUC2Ef4HnAaQEJIdE20TRBDIaOu-mvBpjbBpHSWnseArhnxiYTZZrpjfPq5qf-pCw3W4bqe6WB_QbRjdcAfXBbfs_J08EW3hNxubpLjdQQ8Q_LWGUmb57pNSugYGSeinlGspntVXPS0ssVqPPf3TYNI1tuV0gmFJU00",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpApBXBaWZb0UbEqoIIxN2KGjJ-Y-dyOkCxO20iM8JMHg-yyvYJypJzDCgFheD9U0gU_vMqeu6FtFQCXajzm6oHPA6Ne7XSED1-iaxTRlyXMhGHfufLVpvDLbNi0AY6q6aeR3rf50lR2OATW8d4wY07jWKyq-AVsiAHpRJxF8bkZ4AII5dW1IRX9duCKE-WTrhdxnmvLzSznde76-T6FO24D4S3OfUxKXgzQluJMWwd1I4TCqb8f-np3n6Rb9J1qUUP_jCLnRKs8",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA",
      ],
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVeDPBTHrXZQtmz7rvkROGmpSJ5ZBBiCawmniuHAWThHGFbZOpulcKxMolcJPMz8pEkOY7XqrzLTWZncTvFfOszXXDilCJKMk2IPUbarFqU5JbGJ9d3YzCWf9CCoaAmOH2W8OXh1JG5uu9dIUqqRwtlsmbhpFy6Yz3T2an4naqYeWfdw3EA5OVG_gAIzvM4cJuHx81f1hqgDJjgTY8FZf6S6yePldIaWijA3-mLdB2GBR-djpQksguT-HFkA_PQnBlj4e1QNKNPgI",
    },
  },
  {
    slug: "lamborghini-huracan-evo",
    make: "Lamborghini",
    model: "Hurac\u00e1n EVO",
    year: 2023,
    tagline: "Every instinct satisfies. Every road obeys.",
    price: 268000,
    monthlyLease: 3900,
    category: "coupe",
    manufacturer: "lamborghini",
    specs: {
      acceleration: "2.9s",
      horsepower: 631,
      topSpeed: 202,
      drivetrain: "AWD",
      transmission: "7-Speed DCT",
    },
    details: {
      odometer: "1,874 Miles",
      interior: "Nero Ade / Arancio Leonis",
      engine: "5.2L V10",
    },
    images: {
      hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVP6rMNleQeRlFOjCRUV6WUG2KHKNHLfQTkJTwLjcfTP8R39sTFmrzD6i23S9CfImYQQMEmLKtstbmC5IMIbUvFSlex0ibsHudZ6zek9G9cpcmDfMnNaNSgGWVdGurFWttPTDclWOZCxPt9AukvAf7ddFJ3eNA2YE8j6oOfvRhGWn16AQEDozFvkIWGlfymCgABMKty6yeXyUk7pnqp_8XxrtHA4gIblapToBncAr8feWuod1QLHnOL3akz-8sifHfiJcjrBtAYw",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJnzoG-lMWv5kS6qNuczDeJAp9Lcbuc52YkhmKg5gNLx6HHDyCm26DnSIg3JaNVK8yffi-Lj9wz1wSZZl2zRntwGqd5FKfsB33tUeAiQ8lxxKwMwW8cs78RtypYI1cbQg9nZK1XOnuMV6Gyt_1n1cTZ32u0TR1tQxrF5U_3a-Q_tsjxdXG6PyTctRW6YbtWHmoQePfSZUxqjpl2sKhsm_uMlnAoRnMhoqbmQEwHPQNDhF3B-EM2US9mq_P3yKS8Vfa_CoyfEw-ny8",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZJQ73nGHEcjj8n6sKOjq2K9MUDCWxdZo0aUZJzpwwYXAk1HeltuplDWMU-6Ar2XoQD5g1y5C3ZVb5vVjrAvIqi0aoIEIB8Pp4aLfM07MlACvKY39pzW-tFzRtgwS5nCzBtI34ars3x-f3Os0tr-GIYhnR7_PIgI52VduN6JhhuyfdbOHelSpnSieY-XOD9mlmabn0_WWdF8GL8xxaAS5AGqujlSo07C5nF63_PAq9T9i16hmdnu1oKJDXY5eTotfdxmPQ5y6zPA",
      ],
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVP6rMNleQeRlFOjCRUV6WUG2KHKNHLfQTkJTwLjcfTP8R39sTFmrzD6i23S9CfImYQQMEmLKtstbmC5IMIbUvFSlex0ibsHudZ6zek9G9cpcmDfMnNaNSgGWVdGurFWttPTDclWOZCxPt9AukvAf7ddFJ3eNA2YE8j6oOfvRhGWn16AQEDozFvkIWGlfymCgABMKty6yeXyUk7pnqp_8XxrtHA4gIblapToBncAr8feWuod1QLHnOL3akz-8sifHfiJcjrBtAYw",
    },
  },
  {
    slug: "bmw-m4-competition",
    make: "BMW",
    model: "M4 Competition",
    year: 2024,
    tagline: "Precision-engineered exhilaration.",
    price: 84900,
    monthlyLease: 1250,
    category: "coupe",
    manufacturer: "bmw",
    specs: {
      acceleration: "3.8s",
      horsepower: 503,
      topSpeed: 180,
      drivetrain: "RWD",
      transmission: "6-Speed Manual",
    },
    details: {
      odometer: "3,290 Miles",
      interior: "Black / Silverstone",
      engine: "3.0L I6 Twin-Turbo",
    },
    images: {
      hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCESArkuH84LgtmzJk0qQbadAsxKXYSGyNNSmaxJVdZohKhwZmRpo5jzQAPtQwo1qO8BvAMCDK7z9jCSPNKhp1KVdxhEQHL4j1WS0KsvgpjNeZYDoCq5rJkWKg0YDxKuU-C-3p60PhG9EhV_a5aji-J6Id_6zG36byVc_6PHUNgfUYdvDGxI-kwPkPHxRvrDouXOrlRXe_HRdRl_F1b3lXGxPhiudRAsoa1VKsbWiHpTF4L8BRa7oLhO0eH2zez0Ycl7lXiHj3_kp8",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpApBXBaWZb0UbEqoIIxN2KGjJ-Y-dyOkCxO20iM8JMHg-yyvYJypJzDCgFheD9U0gU_vMqeu6FtFQCXajzm6oHPA6Ne7XSED1-iaxTRlyXMhGHfufLVpvDLbNi0AY6q6aeR3rf50lR2OATW8d4wY07jWKyq-AVsiAHpRJxF8bkZ4AII5dW1IRX9duCKE-WTrhdxnmvLzSznde76-T6FO24D4S3OfUxKXgzQluJMWwd1I4TCqb8f-np3n6Rb9J1qUUP_jCLnRKs8",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZJQ73nGHEcjj8n6sKOjq2K9MUDCWxdZo0aUZJzpwwYXAk1HeltuplDWMU-6Ar2XoQD5g1y5C3ZVb5vVjrAvIqi0aoIEIB8Pp4aLfM07MlACvKY39pzW-tFzRtgwS5nCzBtI34ars3x-f3Os0tr-GIYhnR7_PIgI52VduN6JhhuyfdbOHelSpnSieY-XOD9mlmabn0_WWdF8GL8xxaAS5AGqujlSo07C5nF63_PAq9T9i16hmdnu1oKJDXY5eTotfdxmPQ5y6zPA",
      ],
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCESArkuH84LgtmzJk0qQbadAsxKXYSGyNNSmaxJVdZohKhwZmRpo5jzQAPtQwo1qO8BvAMCDK7z9jCSPNKhp1KVdxhEQHL4j1WS0KsvgpjNeZYDoCq5rJkWKg0YDxKuU-C-3p60PhG9EhV_a5aji-J6Id_6zG36byVc_6PHUNgfUYdvDGxI-kwPkPHxRvrDouXOrlRXe_HRdRl_F1b3lXGxPhiudRAsoa1VKsbWiHpTF4L8BRa7oLhO0eH2zez0Ycl7lXiHj3_kp8",
    },
  },
  {
    slug: "aston-martin-db12",
    make: "Aston Martin",
    model: "DB12",
    year: 2024,
    tagline: "The world's first super tourer.",
    price: 245000,
    monthlyLease: 3680,
    category: "coupe",
    manufacturer: "aston-martin",
    specs: {
      acceleration: "3.5s",
      horsepower: 671,
      topSpeed: 202,
      drivetrain: "RWD",
      transmission: "8-Speed Automatic",
    },
    details: {
      odometer: "512 Miles",
      interior: "Obsidian Black / Tan",
      engine: "4.0L V8 Twin-Turbo",
    },
    images: {
      hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeNs8gBiPfYQjIgX6IyH8vW_UG4plalaMJeAJgVmUzvG3-_Tf_kGjI2foPBaGJghXQ7LyROnE602gbex9JfY41N--Nv64RXPRc8aqkbvAiTkxFfr9gyiIF7vzT09frLm5-sBf_Xa2ZmQtmwLcDkt7ftQLytg3KZJmCh_bsvtzvqWJ7T7F9wpNNnYc-OgbXsQ-tY8LtLhnvjh7pz_nyDNGwK3U8gb_ZqSNT8fjQEA785Cs0VaTl6ePWGD2J8JjYGOokHNnAq_gHy8s",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZJQ73nGHEcjj8n6sKOjq2K9MUDCWxdZo0aUZJzpwwYXAk1HeltuplDWMU-6Ar2XoQD5g1y5C3ZVb5vVjrAvIqi0aoIEIB8Pp4aLfM07MlACvKY39pzW-tFzRtgwS5nCzBtI34ars3x-f3Os0tr-GIYhnR7_PIgI52VduN6JhhuyfdbOHelSpnSieY-XOD9mlmabn0_WWdF8GL8xxaAS5AGqujlSo07C5nF63_PAq9T9i16hmdnu1oKJDXY5eTotfdxmPQ5y6zPA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCuBmiTxjQD3VNN3YIbE1K209QgtZm00zAdKTRBkwcJt2rXzlk0CEq03qvjNvOllxpsZtM7TcOjY-0Yizm-L3RgOtJ6lC1HlQoEA_lwAsIgxUC2Ef4HnAaQEJIdE20TRBDIaOu-mvBpjbBpHSWnseArhnxiYTZZrpjfPq5qf-pCw3W4bqe6WB_QbRjdcAfXBbfs_J08EW3hNxubpLjdQQ8Q_LWGUmb57pNSugYGSeinlGspntVXPS0ssVqPPf3TYNI1tuV0gmFJU00",
      ],
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeNs8gBiPfYQjIgX6IyH8vW_UG4plalaMJeAJgVmUzvG3-_Tf_kGjI2foPBaGJghXQ7LyROnE602gbex9JfY41N--Nv64RXPRc8aqkbvAiTkxFfr9gyiIF7vzT09frLm5-sBf_Xa2ZmQtmwLcDkt7ftQLytg3KZJmCh_bsvtzvqWJ7T7F9wpNNnYc-OgbXsQ-tY8LtLhnvjh7pz_nyDNGwK3U8gb_ZqSNT8fjQEA785Cs0VaTl6ePWGD2J8JjYGOokHNnAq_gHy8s",
    },
  },
  {
    slug: "rolls-royce-spectre",
    make: "Rolls-Royce",
    model: "Spectre",
    year: 2024,
    tagline: "The silent revolution of ultra-luxury.",
    price: 420000,
    monthlyLease: 5200,
    category: "coupe",
    manufacturer: "rolls-royce",
    specs: {
      acceleration: "4.4s",
      horsepower: 577,
      topSpeed: 155,
      drivetrain: "AWD",
      transmission: "Automatic",
    },
    details: {
      odometer: "876 Miles",
      interior: "Navy Blue / Seashell",
      engine: "Electric (dual motor)",
    },
    images: {
      hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3w-1rWviv9eXR4-4e6capLwsdnaCtoplsi86CwgyG-GIXFhQYMxEfMXkH0B4-qXDQ8gbASGdi9qotjgPhJ0LH_hGQgM-nYOwV3CZ7JZlBl6cTrIa2tNYU1Hp4h7gDY9DvFwkrVf6gW6M-Vaa9GFNNUOrErxAXKGJZ9O23oEbnNOuUMW4pS-jnj-hAl1SzwcqTlDfKDI3f2Dy5G_F4lueAWpWnBkqPLT2OyfnMCl6tVULzxHrdZVF8ku8mE7WZ3gQ04V_sfgBJBrs",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCuBmiTxjQD3VNN3YIbE1K209QgtZm00zAdKTRBkwcJt2rXzlk0CEq03qvjNvOllxpsZtM7TcOjY-0Yizm-L3RgOtJ6lC1HlQoEA_lwAsIgxUC2Ef4HnAaQEJIdE20TRBDIaOu-mvBpjbBpHSWnseArhnxiYTZZrpjfPq5qf-pCw3W4bqe6WB_QbRjdcAfXBbfs_J08EW3hNxubpLjdQQ8Q_LWGUmb57pNSugYGSeinlGspntVXPS0ssVqPPf3TYNI1tuV0gmFJU00",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpApBXBaWZb0UbEqoIIxN2KGjJ-Y-dyOkCxO20iM8JMHg-yyvYJypJzDCgFheD9U0gU_vMqeu6FtFQCXajzm6oHPA6Ne7XSED1-iaxTRlyXMhGHfufLVpvDLbNi0AY6q6aeR3rf50lR2OATW8d4wY07jWKyq-AVsiAHpRJxF8bkZ4AII5dW1IRX9duCKE-WTrhdxnmvLzSznde76-T6FO24D4S3OfUxKXgzQluJMWwd1I4TCqb8f-np3n6Rb9J1qUUP_jCLnRKs8",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA",
      ],
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3w-1rWviv9eXR4-4e6capLwsdnaCtoplsi86CwgyG-GIXFhQYMxEfMXkH0B4-qXDQ8gbASGdi9qotjgPhJ0LH_hGQgM-nYOwV3CZ7JZlBl6cTrIa2tNYU1Hp4h7gDY9DvFwkrVf6gW6M-Vaa9GFNNUOrErxAXKGJZ9O23oEbnNOuUMW4pS-jnj-hAl1SzwcqTlDfKDI3f2Dy5G_F4lueAWpWnBkqPLT2OyfnMCl6tVULzxHrdZVF8ku8mE7WZ3gQ04V_sfgBJBrs",
    },
  },
];

// ---------------------------------------------------------------------------
// Service Items (for the services hub page)
// ---------------------------------------------------------------------------
export const SERVICE_ITEMS: ServiceItem[] = [
  {
    title: "Leasing",
    description:
      "Tailored lease programs with competitive rates designed for discerning clients who demand flexibility.",
    icon: "directions_car",
    href: "/leasing",
  },
  {
    title: "Financing",
    description:
      "Bespoke financing solutions structured to match your lifestyle and investment strategy.",
    icon: "account_balance",
    href: "/financing",
  },
  {
    title: "Credit Assistance",
    description:
      "Expert guidance through every step of the credit process, ensuring the smoothest path to ownership.",
    icon: "verified_user",
    href: "/credit-info",
  },
  {
    title: "Sell / Trade-In",
    description:
      "Receive a premium, no-obligation offer for your vehicle through our direct acquisition program.",
    icon: "sell",
    href: "/trade-in",
  },
  {
    title: "Nationwide Delivery",
    description:
      "White-glove, enclosed transport to your door — anywhere in the continental United States.",
    icon: "local_shipping",
    href: "/delivery",
    badge: "White Glove",
  },
  {
    title: "Concierge",
    description:
      "A dedicated specialist to curate your experience from first inquiry to key handoff and beyond.",
    icon: "support_agent",
    href: "/contact",
  },
];
