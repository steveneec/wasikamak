import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { GrChapterAdd } from "react-icons/gr";
import { actionHeaderType, pacienteType } from "@/types";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBase } from "@/utils";
import styles from "../../styles/pages/pacientes.module.css";
import { HiIdentification } from "react-icons/hi2";
import { BsPhone } from "react-icons/bs";

export default function Pacientes({
  pacientes,
}: {
  pacientes: Array<pacienteType>;
}) {
  const router = useRouter();
  const [resultSearch, setResultSearch] = useState<Array<pacienteType>>([]);
  const [searchValue, setSearchValue] = useState("");

  const actions: Array<actionHeaderType> = [
    {
      label: "Agregar",
      icon: <GrChapterAdd size={18} />,
      action: () => router.push("/pacientes/add"),
    },
  ];

  async function handleOnSearch() {
    try {
      const result = await axios.get(
        `${apiBase}/pacientes/name/${searchValue}`
      );
      setResultSearch(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleOnSearch();
  }, [searchValue]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Pacientes"
          description="Busca o agrega nuevos pacientes"
          options={actions}
          placeholder="Busca pacientes por su nombre"
          search
          searchValue={searchValue}
          onsearchChange={setSearchValue}
        />
        <div className={styles.content}>
          {resultSearch.length === 0 && searchValue === ""
            ? pacientes.map((_pac, key) => (
                <PacienteRow key={key} paciente={_pac} />
              ))
            : resultSearch.map((_pac, key) => (
                <PacienteRow paciente={_pac} key={key} />
              ))}
        </div>
      </div>
    </Layout>
  );
}

const PacienteRow = React.memo(({ paciente }: { paciente: pacienteType }) => {
  return (
    <div className={styles.pacienteRow}>
      <div className={styles.prContent}>
        <p>
          {paciente.nombres} {paciente.apellidos}
        </p>
        <div className={styles.chips}>
          <div className={styles.chip}>
            <HiIdentification size={15} color="#5e35b1" />
            <small>{paciente.cedula}</small>
          </div>
          <div className={styles.chip}>
            <BsPhone size={15} color="#43a047" />
            <small>{paciente.celular}</small>
          </div>
        </div>
      </div>
    </div>
  );
});

export async function getServerSideProps(context: any) {
  const pacientes = await axios.get(`${apiBase}/pacientes`);

  return {
    props: {
      pacientes: pacientes.data,
    },
  };
}
