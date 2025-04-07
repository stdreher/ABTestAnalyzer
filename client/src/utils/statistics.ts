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
  // Approximation of the normal CDF for p-value
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return zScore > 0 ? 2 * (1 - (0.5 - p)) : 2 * (0.5 - p);
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
  
  // Calculate rates
  const rateA = conversionsA / visitorsA;
  const rateB = conversionsB / visitorsB;
  
  // Calculate statistical metrics
  const zScore = calculateZScore(rateA, rateB, visitorsA, visitorsB);
  const pValue = calculatePValue(zScore);
  const confidenceInterval = calculateConfidenceInterval(rateA, rateB, visitorsA, visitorsB, confidenceLevel);
  const relativeImprovement = ((rateB - rateA) / rateA) * 100;
  
  // Determine significance
  const isSignificant = pValue < (1 - parseFloat(confidenceLevel));
  
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
