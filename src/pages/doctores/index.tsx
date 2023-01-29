import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { actionHeaderType, doctorType } from "@/types";
import { useRouter } from "next/router";
import { GrChapterAdd } from "react-icons/gr";
import React, { useState, useEffect } from "react";
import styles from "../../styles/pages/doctores.module.css";
import { apiBase } from "@/utils";
import axios from "axios";
import { HiIdentification } from "react-icons/hi2";
import { BsPhone } from "react-icons/bs";

export default function Doctores({
  doctores,
}: {
  doctores: Array<doctorType>;
}) {
  const router = useRouter();
  const [resultSearch, setResultSearch] = useState<Array<doctorType>>([]);
  const [searchValue, setSearchValue] = useState("");

  const actions: Array<actionHeaderType> = [
    {
      label: "Agregar",
      icon: <GrChapterAdd size={18} />,
      action: () => router.push("/doctores/add"),
    },
  ];

  async function handleOnSearch() {
    try {
      const result = await axios.get(`${apiBase}/doctores/name/${searchValue}`);
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
          title="Doctores"
          description="Busca o agrega nuevos doctores"
          options={actions}
          placeholder="Busca doctores por su nombre"
          search
          searchValue={searchValue}
          onsearchChange={setSearchValue}
        />
        <div className={styles.content}>
          {resultSearch.length === 0 && searchValue === ""
            ? doctores.map((_doc, key) => <DoctorRow key={key} doctor={_doc} />)
            : resultSearch.map((_doc, key) => (
                <DoctorRow doctor={_doc} key={key} />
              ))}
        </div>
      </div>
    </Layout>
  );
}

const DoctorRow = React.memo(({ doctor }: { doctor: doctorType }) => {
  return (
    <div className={styles.doctorRow}>
      <div className={styles.drContent}>
        <div>
          <p>
            {doctor.nombres} {doctor.apellidos}
            <small
              className={
                doctor.disponible ? styles.disponible : styles.nodisponible
              }
            >
              {doctor.disponible ? "Disponible" : "No disponible"}
            </small>
          </p>
        </div>
        <div className={styles.chips}>
          <div className={styles.chip}>
            <HiIdentification size={15} color="#5e35b1" />
            <small>{doctor.cedula}</small>
          </div>
          <div className={styles.chip}>
            <BsPhone size={15} color="#43a047" />
            <small>{doctor.celular}</small>
          </div>
        </div>
      </div>
    </div>
  );
});

export async function getServerSideProps(context: any) {
  const _docs = await axios.get(`${apiBase}/doctores`);

  return {
    props: {
      doctores: _docs.data,
    },
  };
}
