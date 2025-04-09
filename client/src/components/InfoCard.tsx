import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function InfoCard() {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Statistische Konzepte erklärt</h2>
        
        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem value="significance" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              Was ist statistische Signifikanz?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              Statistische Signifikanz zeigt an, ob der Unterschied zwischen Varianten wahrscheinlich auf Zufall zurückzuführen ist oder einen realen Effekt darstellt. 
              Ein Ergebnis ist "statistisch signifikant", wenn der p-Wert unter dem Signifikanzniveau liegt (oft 0,05 für ein Konfidenzniveau von 95%). 
              Dies bedeutet, dass es starke Hinweise darauf gibt, dass ein beobachteter Unterschied nicht nur zufällige Schwankungen sind.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="z-score" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              Was ist ein Z-Wert?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              Der Z-Wert (oder Z-Score) ist ein statistisches Maß, das angibt, wie viele Standardabweichungen ein Wert vom Mittelwert entfernt ist. 
              In A/B-Tests wird der Z-Wert verwendet, um zu quantifizieren, wie stark die Differenz zwischen zwei Konversionsraten ist, relativ zur Streuung dieser Raten.
              <br /><br />
              Ein höherer Z-Wert bedeutet einen stärkeren Unterschied zwischen den Varianten. Z-Werte nahe 0 bedeuten kaum Unterschied, während Z-Werte über 1,96 (bei einem 95% Konfidenzniveau) 
              auf einen statistisch signifikanten Unterschied hindeuten. Der Z-Wert wird auch verwendet, um den p-Wert zu berechnen.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="p-value" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              Was ist ein p-Wert?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              Der p-Wert gibt die Wahrscheinlichkeit an, Ergebnisse zu beobachten, die mindestens so extrem sind wie die aktuellen Daten, 
              unter der Annahme, dass die Nullhypothese wahr ist (d.h. es gibt keinen realen Unterschied zwischen den Varianten). 
              Ein kleinerer p-Wert (typischerweise &lt; 0,05) deutet darauf hin, dass der beobachtete Unterschied wahrscheinlich nicht zufällig auftritt, 
              was Beweise gegen die Nullhypothese liefert.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="confidence-interval" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              Was ist ein Konfidenzintervall?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              Ein Konfidenzintervall stellt einen Wertebereich dar, der wahrscheinlich den wahren Unterschied zwischen den Varianten enthält. 
              Ein 95%-Konfidenzintervall bedeutet zum Beispiel, dass wenn wir den Test viele Male wiederholen würden, 
              95% der berechneten Intervalle den wahren Unterschied enthalten würden. 
              Breitere Intervalle weisen auf eine geringere Präzision Ihrer Schätzung hin.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="sample-size" className="border border-neutral-200 rounded-lg overflow-hidden px-0">
            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
              Stichprobengröße und statistische Power
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-neutral-600">
              Größere Stichproben erhöhen die statistische Power, also die Fähigkeit, einen tatsächlichen Effekt zu erkennen, wenn er existiert. 
              Bei kleinen Stichprobengrößen können Sie möglicherweise bedeutende Unterschiede nicht erkennen. 
              Für zuverlässige Ergebnisse sollten Sie sicherstellen, dass Sie genügend Daten in jeder Variante haben, um die Effektgröße zu erkennen, die für Sie wichtig ist. 
              Im Zweifelsfall sollten Sie mindestens 1.000 Besucher pro Variante anstreben.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
