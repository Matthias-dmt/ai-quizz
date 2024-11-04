import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex mb-6 mt-80 justify-center flex-1">
        <h1 className="text-6xl font-bold">Welcome to the QuiQuiQuizzz 👋</h1>
      </main>
      <footer className="flex footer pb-9 px-6 relative mb-0 justify-center">
        <Button>Start the quizz</Button>
      </footer>
    </div>
  )
}
