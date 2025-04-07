import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { abTestResultSchema, statisticalResultSchema } from "../shared/schema";
import { calculateStatistics } from "../client/src/utils/statistics";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for calculating A/B test significance
  app.post("/api/calculate-significance", async (req, res) => {
    try {
      // Validate the input data
      const result = abTestResultSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: result.error.format() 
        });
      }
      
      // Calculate statistics
      const statisticalResults = calculateStatistics(result.data);
      
      // Validate output format
      const validatedResults = statisticalResultSchema.parse(statisticalResults);
      
      return res.json(validatedResults);
    } catch (error) {
      console.error("Error calculating significance:", error);
      return res.status(500).json({ message: "Error calculating statistical significance" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
