import React, { useState, useEffect, useMemo } from 'react';

// Supported categories and unit conversion factors relative to a base unit
const categories = {
  Length: {
    base: 'm',
    units: {
      km: 1000,
      m: 1,
      cm: 0.01,
      mm: 0.001,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34,
    },
  },
  'Weight/Mass': {
    base: 'kg',
    units: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592,
      oz: 0.0283495,
      tonne: 1000,
    },
  },
  Temperature: {
    base: 'C', // handled specially
    units: {
      Celsius: 'C',
      Fahrenheit: 'F',
      Kelvin: 'K',
    },
  },
  Time: {
    base: 'sec',
    units: {
      sec: 1,
      min: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2629800,
      year: 31557600,
    },
  },
  Area: {
    base: 'sqm',
    units: {
      'sq m': 1,
      'sq km': 1e6,
      'sq ft': 0.092903,
      acres: 4046.86,
      hectares: 10000,
    },
  },
  Volume: {
    base: 'L',
    units: {
      L: 1,
      mL: 0.001,
      gal: 3.78541,
      pint: 0.473176,
      quart: 0.946353,
      'cu ft': 28.3168,
      'cu m': 1000,
    },
  },
  Speed: {
    base: 'm/s',
    units: {
      'km/h': 0.277778,
      'm/s': 1,
      mph: 0.44704,
      'ft/s': 0.3048,
    },
  },
  Pressure: {
    base: 'Pa',
    units: {
      Pa: 1,
      kPa: 1000,
      bar: 100000,
      psi: 6894.76,
      atm: 101325,
      mmHg: 133.322,
    },
  },
  Energy: {
    base: 'J',
    units: {
      Joule: 1,
      kJ: 1000,
      kcal: 4184,
      Wh: 3600,
      kWh: 3600000,
      BTU: 1055.06,
    },
  },
  Data: {
    base: 'byte',
    units: {
      bit: 0.125,
      byte: 1,
      KB: 1024,
      MB: 1048576,
      GB: 1073741824,
      TB: 1099511627776,
    },
  },
  'Fuel Consumption': {
    base: 'L/100km',
    units: {
      mpg: 'mpg',
      'km/L': 'km/L',
      'L/100km': 'L/100km',
    },
  },
} as const;

type Category = keyof typeof categories;

type UnitMap = { [unit: string]: number | string };

function convert(value: number, from: string, to: string, category: Category) {
  if (category === 'Temperature') {
    const toC = (val: number, unit: string) => {
      if (unit === 'Celsius' || unit === 'C') return val;
      if (unit === 'Fahrenheit' || unit === 'F') return (val - 32) * (5 / 9);
      return val - 273.15; // Kelvin
    };
    const fromC = (val: number, unit: string) => {
      if (unit === 'Celsius' || unit === 'C') return val;
      if (unit === 'Fahrenheit' || unit === 'F') return val * 9/5 + 32;
      return val + 273.15;
    };
    return fromC(toC(value, from), to);
  }
  if (category === 'Fuel Consumption') {
    let lPer100km;
    if (from === 'mpg') lPer100km = 235.214583 / value;
    else if (from === 'km/L') lPer100km = 100 / value;
    else lPer100km = value; // L/100km

    if (to === 'mpg') return 235.214583 / lPer100km;
    if (to === 'km/L') return 100 / lPer100km;
    return lPer100km;
  }
  const map = categories[category].units as UnitMap;
  const baseFrom = map[from] as number;
  const baseTo = map[to] as number;
  return (value * baseFrom) / baseTo;
}

const UnitConverter: React.FC = () => {
  const categoryKeys = Object.keys(categories) as Category[];
  const [category, setCategory] = useState<Category>(categoryKeys[0]);
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [input, setInput] = useState('1');

  useEffect(() => {
    const savedCategory = localStorage.getItem('uc-category') as Category | null;
    const savedFrom = localStorage.getItem('uc-from');
    const savedTo = localStorage.getItem('uc-to');
    if (savedCategory && categories[savedCategory]) {
      setCategory(savedCategory);
      const units = Object.keys(categories[savedCategory].units);
      setFromUnit(savedFrom && units.includes(savedFrom) ? savedFrom : units[0]);
      setToUnit(savedTo && units.includes(savedTo) ? savedTo : units[1] || units[0]);
    } else {
      const units = Object.keys(categories[category].units);
      setFromUnit(units[0]);
      setToUnit(units[1] || units[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('uc-category', category);
    localStorage.setItem('uc-from', fromUnit);
    localStorage.setItem('uc-to', toUnit);
  }, [category, fromUnit, toUnit]);

  useEffect(() => {
    const units = Object.keys(categories[category].units);
    if (!units.includes(fromUnit)) setFromUnit(units[0]);
    if (!units.includes(toUnit)) setToUnit(units[1] || units[0]);
  }, [category]);

  const result = useMemo(() => {
    const val = parseFloat(input);
    if (isNaN(val)) return '';
    const converted = convert(val, fromUnit, toUnit, category);
    return converted.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [input, fromUnit, toUnit, category]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const units = Object.keys(categories[category].units);

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full p-2 rounded border dark:bg-gray-800"
        >
          {categoryKeys.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Value</label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 rounded border dark:bg-gray-800"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <select value={fromUnit} onChange={(e)=>setFromUnit(e.target.value)} className="w-full p-2 rounded border dark:bg-gray-800">
            {units.map(u=> (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select value={toUnit} onChange={(e)=>setToUnit(e.target.value)} className="w-full p-2 rounded border dark:bg-gray-800">
            {units.map(u=> (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Result</p>
          <p className="text-2xl font-bold">{result}</p>
        </div>
        <button
          onClick={swapUnits}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default UnitConverter;

