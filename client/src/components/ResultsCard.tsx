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

  // Debug-Info zum Identifizieren von Problemen mit der Berechnung
  console.log("Ergebnisse:", { rateA, rateB, fullResults: results });

  // Format values for display
  const formattedRateA = (rateA * 100).toFixed(2);
  const formattedRateB = (rateB * 100).toFixed(2);
  const formattedImprovement = relativeImprovement.toFixed(2);
  const formattedPValue = pValue.toFixed(4);
  const formattedZScore = zScore.toFixed(2);
  const formattedCI = `${(confidenceInterval.lower * 100).toFixed(2)}% bis ${(confidenceInterval.upper * 100).toFixed(2)}%`;
  const confidencePercentage = parseInt(confidenceLevel) * 100;
  
  // Calculate max rate for progress bars
  const maxRate = Math.max(rateA, rateB) * 1.2; // Add 20% padding
  const rateAWidth = `${(rateA / maxRate) * 100}%`;
  const rateBWidth = `${(rateB / maxRate) * 100}%`;

  return (
    <Card className="bg-white shadow-sm mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Testergebnisse</h2>
        
        {/* Significance Display */}
        <div className={`mb-6 p-4 ${isSignificant ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'} rounded-lg text-center`}>
          <div className="flex items-center justify-center mb-2">
            {isSignificant ? (
              <>
                <CheckCircle className="text-secondary text-2xl mr-2" />
                <h3 className="text-xl font-bold text-secondary">Statistisch signifikant</h3>
              </>
            ) : (
              <>
                <Info className="text-accent text-2xl mr-2" />
                <h3 className="text-xl font-bold text-accent">Nicht statistisch signifikant</h3>
              </>
            )}
          </div>
          <p>
            {isSignificant
              ? `Es gibt einen signifikanten Unterschied zwischen den Varianten mit einem Konfidenzniveau von ${confidencePercentage}%.`
              : `Der Unterschied zwischen den Varianten ist nicht signifikant bei einem Konfidenzniveau von ${confidencePercentage}%.`}
          </p>
        </div>
        
        {/* Results Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Conversion Rates */}
          <div>
            <h3 className="text-lg font-medium mb-3">Konversionsraten</h3>
            <div className="space-y-4">
              {/* Variant A Rate */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Variante A</span>
                  <span className="text-sm font-medium text-primary">{formattedRateA}%</span>
                </div>
                <div className="bg-neutral-100 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 transition-all duration-500 ease-in-out" style={{ width: rateAWidth }}></div>
                </div>
              </div>
              
              {/* Variant B Rate */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Variante B</span>
                  <span className="text-sm font-medium text-blue-600">{formattedRateB}%</span>
                </div>
                <div className="bg-neutral-100 rounded-full h-2">
                  <div className="bg-blue-600 rounded-full h-2 transition-all duration-500 ease-in-out" style={{ width: rateBWidth }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Relative Improvement */}
          <div>
            <h3 className="text-lg font-medium mb-3">Relative Verbesserung</h3>
            <div className="bg-neutral-50 p-4 rounded-lg h-full flex flex-col justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${isSignificant ? 'text-secondary' : 'text-neutral-700'} mb-1`}>
                  {formattedImprovement}%
                </div>
                <p className="text-sm text-neutral-500">Relative Steigerung von A zu B</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Statistische Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">P-Wert:</span>
                <span className="font-medium">{formattedPValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Z-Wert:</span>
                <span className="font-medium">{formattedZScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Konfidenzniveau:</span>
                <span className="font-medium">{confidencePercentage}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Konfidenzintervall</h3>
            <div className="bg-neutral-50 p-4 rounded-lg h-full flex flex-col justify-center text-center text-sm">
              <p>
                Unterschied zwischen den Raten:<br />
                <span className="font-medium">{formattedCI}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Interpretation Guide */}
        <div>
          <h3 className="text-lg font-medium mb-3">Was das bedeutet</h3>
          <div className="text-sm text-neutral-700 bg-neutral-50 p-4 rounded-lg">
            {isSignificant ? (
              <>
                <p className="mb-2">✅ <strong>Ihr Test zeigt einen statistisch signifikanten Unterschied</strong> mit einem p-Wert von {formattedPValue}.</p>
                
                {relativeImprovement > 0 ? (
                  <>
                    <p className="mb-2">📈 Variante B übertrifft Variante A um etwa {formattedImprovement}%.</p>
                    <p>💡 <strong>Empfehlung:</strong> Erwägen Sie die Implementierung von Variante B, da die Daten starke Hinweise auf eine Verbesserung liefern.</p>
                  </>
                ) : (
                  <>
                    <p className="mb-2">📉 Variante B schneidet schlechter ab als Variante A um etwa {Math.abs(parseFloat(formattedImprovement)).toFixed(2)}%.</p>
                    <p>💡 <strong>Empfehlung:</strong> Bleiben Sie bei Variante A, da Variante B eine statistisch signifikante Leistungsminderung aufweist.</p>
                  </>
                )}
              </>
            ) : (
              <>
                <p className="mb-2">❓ <strong>Ihr Test zeigt keine statistisch signifikanten Ergebnisse</strong> bei einem Konfidenzniveau von {confidencePercentage}%.</p>
                
                {Math.abs(relativeImprovement) < 5 ? (
                  <>
                    <p className="mb-2">📏 <strong>Kleine Effektgröße festgestellt.</strong> Der Unterschied zwischen den Varianten ({Math.abs(relativeImprovement).toFixed(2)}%) ist möglicherweise zu gering, um zuverlässig erkannt zu werden.</p>
                    <p>💡 <strong>Empfehlung:</strong> Überlegen Sie, ob dieser kleine Unterschied für Ihr Unternehmen praktisch bedeutsam ist, bevor Sie eine Entscheidung treffen.</p>
                  </>
                ) : (
                  <>
                    <p>💡 <strong>Empfehlung:</strong> Setzen Sie die Tests fort oder erwägen Sie, Ihre Varianten anzupassen, um einen wesentlicheren Unterschied zu erzielen.</p>
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
