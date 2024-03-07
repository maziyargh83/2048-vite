import { Router } from "@/Router";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Router />
    </ThemeProvider>
  );
}

export default App;
