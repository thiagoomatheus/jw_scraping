import Apresentacao from "./componentes/apresentacao";
import Instrucoes from "./componentes/instrucoes";

export const dynamic = "force-dynamic"

export default async function Home() {

  return (
    <section className="flex flex-col items-center justify-center gap-12 md:gap-24 max-w-7xl">
      <Apresentacao />
      <Instrucoes />
    </section>
  );
}
