import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Info } from "lucide-react";
import { StatisticalResult } from "@shared/schema";

interface ResultsCardProps {
  results: StatisticalResult;
}

export default function ResultsCard({ results }: ResultsCardProps) {
  const {
    isSignificant,
    pValue,
    zScore,
    relativeImprovement,
    confidenceInterval,
    rateA,
    rateB,
    confidenceLevel
  } = results;

  // Format values for display
  const formattedRateA = (rateA * 100).toFixed(2);
  const formattedRateB = (rateB * 100).toFixed(2);
  const formattedImprovement = relativeImprovement.toFixed(2);
  const formattedPValue = pValue.toFixed(4);
  const formattedZScore = zScore.toFixed(2);
  const formattedCI = `${(confidenceInterval.lower * 100).toFixed(2)}% to ${(confidenceInterval.upper * 100).toFixed(2)}%`;
  const confidencePercentage = parseInt(confidenceLevel) * 100;
  
  // Calculate max rate for progress bars
  const maxRate = Math.max(rateA, rateB) * 1.2; // Add 20% padding
  const rateAWidth = `${(rateA / maxRate) * 100}%`;
  const rateBWidth = `${(rateB / maxRate) * 100}%`;

  return (
    <Card className="bg-white shadow-sm mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Test Results</h2>
        
        {/* Significance Display */}
        <div className={`mb-6 p-4 ${isSignificant ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'} rounded-lg text-center`}>
          <div className="flex items-center justify-center mb-2">
            {isSignificant ? (
              <>
                <CheckCircle className="text-secondary text-2xl mr-2" />
                <h3 className="text-xl font-bold text-secondary">Statistically Significant</h3>
              </>
            ) : (
              <>
                <Info className="text-accent text-2xl mr-2" />
                <h3 className="text-xl font-bold text-accent">Not Statistically Significant</h3>
              </>
            )}
          </div>
          <p>
            {isSignificant
              ? `There is a significant difference between variants at ${confidencePercentage}% confidence level.`
              : `The difference between variants is not significant at ${confidencePercentage}% confidence level.`}
          </p>
        </div>
        
        {/* Results Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Conversion Rates */}
          <div>
            <h3 className="text-lg font-medium mb-3">Conversion Rates</h3>
            <div className="space-y-4">
              {/* Variant A Rate */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Variant A</span>
                  <span className="text-sm font-medium text-primary">{formattedRateA}%</span>
                </div>
                <div className="bg-neutral-100 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 transition-all duration-500 ease-in-out" style={{ width: rateAWidth }}></div>
                </div>
              </div>
              
              {/* Variant B Rate */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Variant B</span>
                  <span className="text-sm font-medium text-accent">{formattedRateB}%</span>
                </div>
                <div className="bg-neutral-100 rounded-full h-2">
                  <div className="bg-accent rounded-full h-2 transition-all duration-500 ease-in-out" style={{ width: rateBWidth }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Relative Improvement */}
          <div>
            <h3 className="text-lg font-medium mb-3">Relative Improvement</h3>
            <div className="bg-neutral-50 p-4 rounded-lg h-full flex flex-col justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${isSignificant ? 'text-secondary' : 'text-neutral-700'} mb-1`}>
                  {formattedImprovement}%
                </div>
                <p className="text-sm text-neutral-500">Relative uplift from A to B</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Statistical Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">P-value:</span>
                <span className="font-medium">{formattedPValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Z-score:</span>
                <span className="font-medium">{formattedZScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Confidence Level:</span>
                <span className="font-medium">{confidencePercentage}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Confidence Interval</h3>
            <div className="bg-neutral-50 p-4 rounded-lg h-full flex flex-col justify-center text-center text-sm">
              <p>
                Difference between rates:<br />
                <span className="font-medium">{formattedCI}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Interpretation Guide */}
        <div>
          <h3 className="text-lg font-medium mb-3">What This Means</h3>
          <div className="text-sm text-neutral-700 bg-neutral-50 p-4 rounded-lg">
            {isSignificant ? (
              <>
                <p className="mb-2">✅ <strong>Your test shows a statistically significant difference</strong> with a p-value of {formattedPValue}.</p>
                
                {relativeImprovement > 0 ? (
                  <>
                    <p className="mb-2">📈 Variant B outperforms variant A by approximately {formattedImprovement}%.</p>
                    <p>💡 <strong>Recommendation:</strong> Consider implementing variant B, as the data provides strong evidence of improvement.</p>
                  </>
                ) : (
                  <>
                    <p className="mb-2">📉 Variant B performs worse than variant A by approximately {Math.abs(parseFloat(formattedImprovement)).toFixed(2)}%.</p>
                    <p>💡 <strong>Recommendation:</strong> Stick with variant A, as variant B shows a statistically significant decrease in performance.</p>
                  </>
                )}
              </>
            ) : (
              <>
                <p className="mb-2">❓ <strong>Your test does not show statistically significant results</strong> at the {confidencePercentage}% confidence level.</p>
                
                {Math.abs(relativeImprovement) < 5 ? (
                  <>
                    <p className="mb-2">📏 <strong>Small effect size detected.</strong> The difference between variants ({Math.abs(relativeImprovement).toFixed(2)}%) may be too small to detect reliably.</p>
                    <p>💡 <strong>Recommendation:</strong> Consider whether this small difference is practically meaningful for your business before deciding.</p>
                  </>
                ) : (
                  <>
                    <p>💡 <strong>Recommendation:</strong> Continue testing or consider adjusting your variants to create a more substantial difference.</p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
