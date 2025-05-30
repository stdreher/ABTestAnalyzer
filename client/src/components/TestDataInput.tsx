import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { ABTestResult } from "@shared/schema";
import SampleDataCard from "@/components/SampleDataCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { abTestResultSchema } from "@shared/schema";

interface TestDataInputProps {
  onCalculate: (data: ABTestResult) => void;
}

export default function TestDataInput({ onCalculate }: TestDataInputProps) {
  const form = useForm<ABTestResult>({
    resolver: zodResolver(abTestResultSchema),
    defaultValues: {
      visitorsA: undefined,
      conversionsA: undefined,
      visitorsB: undefined,
      conversionsB: undefined,
      confidenceLevel: "0.95",
    },
  });
  
  const fillSampleData = (sampleData: Partial<ABTestResult>) => {
    form.reset({ ...form.getValues(), ...sampleData });
    if (
      sampleData.visitorsA && 
      sampleData.conversionsA && 
      sampleData.visitorsB && 
      sampleData.conversionsB
    ) {
      handleCalculate();
    }
  };
  
  const handleCalculate = form.handleSubmit((data) => {
    onCalculate(data);
  });

  return (
    <>
      <Card className="bg-white shadow-sm mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Testdaten-Eingabe</h2>
          <Form {...form}>
            <form onSubmit={handleCalculate} className="space-y-6">
              {/* Variant A (Control) */}
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-600 mb-3">Variante A (Kontrolle)</h3>
                
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Label htmlFor="visitorsA" className="text-sm font-medium">Besucher</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-48 text-xs">Gesamtzahl der Benutzer, die Variante A gesehen haben</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormField
                    control={form.control}
                    name="visitorsA"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="visitorsA"
                            type="number"
                            min="0"
                            placeholder="z.B. 5000"
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Label htmlFor="conversionsA" className="text-sm font-medium">Konversionen</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-48 text-xs">Anzahl der Benutzer, die die gewünschte Aktion ausgeführt haben</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormField
                    control={form.control}
                    name="conversionsA"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="conversionsA"
                            type="number"
                            min="0"
                            placeholder="z.B. 500"
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Variant B (Test) */}
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-600 mb-3">Variante B (Test)</h3>
                
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Label htmlFor="visitorsB" className="text-sm font-medium">Besucher</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-48 text-xs">Gesamtzahl der Benutzer, die Variante B gesehen haben</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormField
                    control={form.control}
                    name="visitorsB"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="visitorsB"
                            type="number"
                            min="0"
                            placeholder="z.B. 5000"
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Label htmlFor="conversionsB" className="text-sm font-medium">Konversionen</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-48 text-xs">Anzahl der Benutzer, die die gewünschte Aktion ausgeführt haben</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormField
                    control={form.control}
                    name="conversionsB"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="conversionsB"
                            type="number"
                            min="0"
                            placeholder="z.B. 550"
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Test Settings */}
              <div className="mt-6 bg-neutral-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-purple-600 mb-3">Testeinstellungen</h3>
                
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Label htmlFor="confidenceLevel" className="text-sm font-medium">Konfidenzniveau</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-48 text-xs">Gibt an, wie sicher Sie sich Ihrer Ergebnisse sein möchten. 95% ist der Branchenstandard.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormField
                    control={form.control}
                    name="confidenceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Konfidenzniveau auswählen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0.9">90%</SelectItem>
                            <SelectItem value="0.95">95%</SelectItem>
                            <SelectItem value="0.99">99%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Signifikanz berechnen
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <SampleDataCard onSelectSample={fillSampleData} />
    </>
  );
}
