import { useState } from "react";
import TestDataInput from "@/components/TestDataInput";
import ResultsCard from "@/components/ResultsCard";
import InfoCard from "@/components/InfoCard";
import { ABTestResult, StatisticalResult } from "@shared/schema";
import { calculateStatistics } from "@/utils/statistics";

export default function Home() {
  const [results, setResults] = useState<StatisticalResult | null>(null);

  const handleCalculate = (data: ABTestResult) => {
    const statisticalResults = calculateStatistics(data);
    setResults(statisticalResults);
  };

  return (
    <div className="min-h-screen bg-neutral-100 px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-neutral-700 mb-2">
            A/B Test Statistical Significance Calculator
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Determine if your A/B test results are statistically significant with confidence.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <TestDataInput onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-7">
            {results && <ResultsCard results={results} />}
            <InfoCard />
          </div>
        </div>
      </div>
    </div>
  );
}
