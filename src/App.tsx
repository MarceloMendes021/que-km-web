import { appName } from "@/shared/lib/test";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <h1 className="text-3xl font-bold text-white">{appName}</h1>
    </div>
  );
}

export default App;
