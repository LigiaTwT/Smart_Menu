import Header from "@/components/landing/cabecalho";
import Inicio from "@/components/landing/inicio";
import Sobre from "@/components/landing/sobre";
import Rodape from "@/components/landing/rodape";
import Beneficios from "@/components/landing/beneficios";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Inicio />
        <Sobre />
        <Beneficios />
        <Rodape />
      </main>
    </>
  );
}
