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
      name: "Sample 1",
      description: "Moderate improvement (10% lift)",
      data: {
        visitorsA: 5000,
        conversionsA: 500,
        visitorsB: 5000,
        conversionsB: 550,
      }
    },
    {
      name: "Sample 2",
      description: "Strong improvement (20% lift)",
      data: {
        visitorsA: 5000,
        conversionsA: 500,
        visitorsB: 5000,
        conversionsB: 600,
      }
    },
    {
      name: "Sample 3",
      description: "Small sample size (low confidence)",
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
        <h3 className="text-lg font-medium mb-3">Sample Test Data</h3>
        <p className="text-sm text-neutral-500 mb-3">Not sure what to input? Use our sample data:</p>
        
        <div className="space-y-2">
          {sampleTestData.map((sample, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onSelectSample(sample.data)}
              className="text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-1.5 px-3 rounded-md w-full justify-start font-normal h-auto"
            >
              <span className="font-medium">{sample.name}:</span> {sample.description}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
