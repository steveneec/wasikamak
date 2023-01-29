import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { actionHeaderType, citaPrew, citeType } from "@/types";
import { apiBase } from "@/utils";
import { useRouter } from "next/router";
import { GrChapterAdd } from "react-icons/gr";
import axios from "axios";
import styles from "../../styles/pages/citas.module.css";
import React, { useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import Modal from "@/components/Modal";
import Card from "@/components/Card";
import { useToast } from "@/hooks/useToast";

export default function Citas({ citas }: { citas: Array<citaPrew> }) {
  const router = useRouter();
  const [resultSearch, setResultSearch] = useState<Array<citaPrew>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editCita, setEditCita] = useState<citaPrew | null>();

  const { initToast, showToast } = useToast();

  const actions: Array<actionHeaderType> = [
    {
      label: "Agendar",
      icon: <GrChapterAdd size={18} />,
      action: () => router.push("/citas/add"),
    },
  ];

  function handleOnClickCite(cita: citaPrew) {
    if (cita.estado === "agendado") {
      setEditCita(cita);
      setIsEdit(true);
    }
  }

  async function handleOnConfirm() {
    try {
      await axios.put(`${apiBase}/citas`, { _id: editCita?._id as string });
      initToast("Bien!", "Se cambió el estado de la cita", "success");
      showToast();
      router.reload();
    } catch (error) {
      console.log(error);
      initToast("Oops!", "Ocurrio un error", "error");
      showToast();
    }
  }

  function handleOnCancel() {
    setEditCita(null);
    setIsEdit(false);
  }

  return (
    <Layout>
      <div>
        <PageHeader
          title="Citas"
          description="Busca, edita o agenda nuevas citas"
          options={actions}
          //search
          //placeholder="Buscar cita por nombre de paciente, cédula de paciente o doctor..."
        />
        <div className={styles.content}>
          {resultSearch.length === 0 && searchValue === ""
            ? citas.map((_cit, key) => (
                <CitaRow
                  key={key}
                  cita={_cit}
                  onclick={() => handleOnClickCite(_cit)}
                />
              ))
            : resultSearch.map((_cit, key) => (
                <CitaRow
                  cita={_cit}
                  key={key}
                  onclick={() => handleOnClickCite(_cit)}
                />
              ))}
        </div>
        {isEdit && (
          <Modal>
            <Card title="Cambiar estado">
              <div className={styles.cardbody}>
                ¿Quieres cambiar el estado de la cita a ejecutado?
              </div>
              <div className={styles.cardOptions}>
                <button onClick={() => handleOnCancel()}>Cancelar</button>
                <button onClick={() => handleOnConfirm()}>Aceptar</button>
              </div>
            </Card>
          </Modal>
        )}
      </div>
    </Layout>
  );
}

const CitaRow = React.memo(
  ({ cita, onclick }: { cita: citaPrew; onclick: Function }) => {
    function getDate(_fecha: Date) {
      const _date = new Date(_fecha);
      return _date.toDateString();
    }

    return (
      <div className={styles.citaRow} onClick={() => onclick()}>
        <p>
          {cita.paciente.nombres} {cita.paciente.apellidos}
        </p>
        <div className={styles.chips}>
          <div className={styles.chip}>
            <BsCalendarDate />
            <small>{getDate(cita.fecha)}</small>
          </div>
          <div className={styles.chip}>
            <AiOutlineUser />
            <small>
              {cita.doctor.nombres} {cita.doctor.apellidos}
            </small>
          </div>
          <div>
            <small
              className={
                cita.estado === "agendado" ? styles.agendado : styles.ejecutado
              }
            >
              {cita.estado === "agendado" ? "Agendado" : "Ejecutado"}
            </small>
          </div>
        </div>
      </div>
    );
  }
);

export async function getServerSideProps(context: any) {
  const _cits = await axios.get(`${apiBase}/citas`);

  console.log("citas >> ", _cits.data);

  return {
    props: {
      citas: _cits.data,
    },
  };
}
