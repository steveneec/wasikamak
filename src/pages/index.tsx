import CiteOverView from "@/components/CiteOverview";
import Layout from "@/components/Layout";
import { citeType } from "@/types";
import Card from "@/components/Card";
import connectMongo from "@/utils/connectMongo";
import Paciente from "@/models/Paciente";
import { useEffect, useState } from "react";
import styles from "../styles/pages/home.module.css";

export default function Home() {
  const [cites, setCites] = useState<Array<citeType>>([]);

  useEffect(() => {
    const _cites: Array<citeType> = [
      {
        paciente: "Martha Torres",
        doctor: "Alexander Cedeño",
        institucion: "Hospital Norte",
        direccion: "Av. 6 de Diciembre N45",
        fecha: new Date(),
        terapia: "Ortopedia",
        estado: "agendado",
      },
      {
        paciente: "Fernando Alvarado",
        doctor: "Alexander Cedeño",
        institucion: "Hospital Norte",
        direccion: "Av. 6 de Diciembre N45",
        fecha: new Date(),
        terapia: "Ortopedia",
        estado: "agendado",
      },
      {
        paciente: "Ricardo Nieto",
        doctor: "Alexander Cedeño",
        institucion: "Hospital Norte",
        direccion: "Av. 6 de Diciembre N45",
        fecha: new Date(),
        terapia: "Ortopedia",
        estado: "agendado",
      },
    ];

    setCites(_cites);
  }, []);

  return (
    <Layout>
      <div className={styles.layout}>
        <div className={styles.header}>
          <p className={styles.greeting}>Hola, Maribel</p>
          <p>Mira el resúmen de las citas agendadas</p>
        </div>
        <div className={styles.sectionTitle}>
          <p>Próximas citas (3)</p>
        </div>
        <div className={styles.content}>
          {cites.map((cite, key) => (
            <Card key={key}>
              <CiteOverView cite={cite} />
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/citas",
    },
  };
}
