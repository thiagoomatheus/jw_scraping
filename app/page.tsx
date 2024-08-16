import Form from "./components/form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start gap-7 w-full">
      <h1>Designações</h1>
      <section className="flex flex-col w-full max-w-4xl">
        <Form />
      </section>
    </main>
  );
}
