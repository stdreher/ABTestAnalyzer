import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ABTestResult } from "@shared/schema";

interface SampleDataCardProps {
  onSelectSample: (data: Partial<ABTestResult>) => void;
}

interface SampleData {
  name: string;
  description: string;
  data: Partial<ABTestResult>;
}

export default function SampleDataCard({ onSelectSample }: SampleDataCardProps) {
  const sampleTestData: SampleData[] = [
    {
      name: "Beispiel 1",
      description: "Mäßige Verbesserung (10% Steigerung)",
      data: {
        visitorsA: 5000,
        conversionsA: 500,
        visitorsB: 5000,
        conversionsB: 550,
      }
    },
    {
      name: "Beispiel 2",
      description: "Starke Verbesserung (20% Steigerung)",
      data: {
        visitorsA: 5000,
        conversionsA: 500,
        visitorsB: 5000,
        conversionsB: 600,
      }
    },
    {
      name: "Beispiel 3",
      description: "Kleine Stichprobengröße (geringe Konfidenz)",
      data: {
        visitorsA: 500,
        conversionsA: 50,
        visitorsB: 500,
        conversionsB: 60,
      }
    }
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-3">Beispieldaten</h3>
        <p className="text-sm text-neutral-500 mb-3">Nicht sicher, was einzugeben ist? Nutzen Sie unsere Beispieldaten:</p>
        
        <div className="space-y-2">
          {sampleTestData.map((sample, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onSelectSample(sample.data)}
              className="text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-1.5 px-3 rounded-md w-full justify-start font-normal h-auto whitespace-normal text-left"
            >
              <span className="font-medium">{sample.name}:</span> {sample.description}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
