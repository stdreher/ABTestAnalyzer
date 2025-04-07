import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function InfoCard() {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Statistical Concepts Explained</h2>
        
        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem value="significance" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              What is statistical significance?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              Statistical significance indicates whether the difference between variants is likely due to chance or represents a real effect. 
              A result is "statistically significant" when the p-value is below the significance level (often 0.05 for a 95% confidence level). 
              This means there's strong evidence that any observed difference is not just random variation.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="p-value" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              What is a p-value?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              The p-value indicates the probability of observing results at least as extreme as the current data, 
              assuming the null hypothesis is true (i.e., there's no real difference between variants). 
              A smaller p-value (typically &lt; 0.05) suggests that the observed difference is unlikely to occur by chance, 
              providing evidence against the null hypothesis.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="confidence-interval" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              What is a confidence interval?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              A confidence interval represents a range of values that likely contains the true difference between the variants. 
              For example, a 95% confidence interval means that if we were to repeat the test many times, 
              95% of the calculated intervals would contain the true difference. 
              Wider intervals indicate less precision in your estimate.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="sample-size" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              Sample size and statistical power
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              Larger sample sizes increase statistical power, which is the ability to detect a true effect when it exists. 
              With small sample sizes, you might fail to detect meaningful differences. 
              For reliable results, ensure you have enough data in each variant to detect the size of effect you care about. 
              If you're unsure, aim for at least 1,000 visitors per variant.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
