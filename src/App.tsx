import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

import Display from "./pages/display";
import Tournament from "./pages/Tournament";
import Scoreboard from "./components/Scoreboard";

const queryClient = new QueryClient();

// The App component is the entry point for your application.

// It uses React Router to define the routes for your application.

// You can add more routes as needed.




const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* deux ongel website on sime time i runder display*/}
          <Route path="/display" element={<Display />} />

          <Route path="/" element={<Tournament />} />
          
          
          
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
