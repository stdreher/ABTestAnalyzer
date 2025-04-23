import { ABTestResult, StatisticalResult } from "@shared/schema";

/**
 * Calculate Z-Score for the statistical test
 */
export function calculateZScore(rate1: number, rate2: number, visitors1: number, visitors2: number): number {
  const pooledStdErr = Math.sqrt((rate1 * (1 - rate1) / visitors1) + (rate2 * (1 - rate2) / visitors2));
  return (rate2 - rate1) / pooledStdErr;
}

/**
 * Calculate P-Value from Z-Score
 * Uses an approximation of the normal CDF
 */
export function calculatePValue(zScore: number): number {
  const x = Math.abs(zScore);
  let p = 0;
  
  if (x > 7) {
    p = 0;
  } else {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p1 = 0.3275911;
    
    const t = 1 / (1 + p1 * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2);
    p = 1 - y;
  }
  
  return 2 * p; // Two-tailed test
}

/**
 * Get Z-Score for a given confidence level
 */
export function getZForConfidenceLevel(confidenceLevel: string): number {
  // Z-scores for common confidence levels
  const zScores: Record<string, number> = {
    '0.9': 1.645,
    '0.95': 1.96,
    '0.99': 2.576
  };
  return zScores[confidenceLevel] || 1.96;
}

/**
 * Calculate confidence interval for the difference between rates
 */
export function calculateConfidenceInterval(
  rate1: number, 
  rate2: number, 
  visitors1: number, 
  visitors2: number, 
  confidenceLevel: string
): { lower: number; upper: number } {
  const z = getZForConfidenceLevel(confidenceLevel);
  const diff = rate2 - rate1;
  const marginOfError = z * Math.sqrt((rate1 * (1 - rate1) / visitors1) + (rate2 * (1 - rate2) / visitors2));
  return {
    lower: diff - marginOfError,
    upper: diff + marginOfError
  };
}

/**
 * Calculate all statistical metrics for A/B test results
 */
export function calculateStatistics(data: ABTestResult): StatisticalResult {
  const { visitorsA, conversionsA, visitorsB, conversionsB, confidenceLevel } = data;
  
  // Calculate rates (Konversionsrate = Konversionen / Besucher)
  const rateA = conversionsA / visitorsA;
  const rateB = conversionsB / visitorsB;
  
  // Calculate statistical metrics
  const zScore = calculateZScore(rateA, rateB, visitorsA, visitorsB);
  const pValue = calculatePValue(zScore);
  const confidenceInterval = calculateConfidenceInterval(rateA, rateB, visitorsA, visitorsB, confidenceLevel);
  const relativeImprovement = ((rateB - rateA) / rateA) * 100;
  
  // Determine significance
  const isSignificant = pValue < (1 - Number(confidenceLevel));
  
  return {
    isSignificant,
    pValue,
    zScore,
    relativeImprovement,
    confidenceInterval,
    rateA,
    rateB,
    confidenceLevel,
  };
}
