import Layout from "@/components/Layout";
import { apiBase } from "@/utils";
import axios from "axios";
import PageHeader from "@/components/PageHeader";
import { GrSave } from "react-icons/gr";
import {
  actionHeaderType,
  doctorType,
  pacienteType,
  selectOptionType,
} from "@/types";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/pages/addcita.module.css";
import Input from "@/components/Input";
import SelectOption from "@/components/SelectOption";
import Card from "@/components/Card";

export default function AddCita({
  pacientes,
  doctores,
}: {
  pacientes: Array<pacienteType>;
  doctores: Array<doctorType>;
}) {
  const [isBusy, setIsBusy] = useState(false);
  const [paciente, setPaciente] = useState("");
  const [doctor, setDoctor] = useState("");
  const [fecha, setFecha] = useState("");
  const [observacion, setObservacion] = useState("");
  const [proximaVisita, setProximaVisita] = useState("");
  const [estado, setEstado] = useState("agendado");
  const [pacientesOptions, setPacientesOptions] = useState<
    Array<selectOptionType>
  >([]);
  const [doctoresOptions, setDoctoresOptions] = useState<
    Array<selectOptionType>
  >([]);

  const actions: Array<actionHeaderType> = [
    {
      label: "Guardar",
      icon: <GrSave size={18} />,
      action: () => handleOnSave(),
    },
  ];

  const { initToast, showToast } = useToast();
  const router = useRouter();

  function validate() {
    if (paciente === "") {
      initToast(
        "Error de validación",
        "Debes seleccionar un paciente",
        "error"
      );
      showToast();
      return false;
    }
    if (doctor === "") {
      initToast("Error de validación", "Debes seleccionar un doctor", "error");
      showToast();
      return false;
    }
    if (fecha === "") {
      initToast("Error de validación", "Debes seleccionar una fecha", "error");
      showToast();
      return false;
    }
    if (proximaVisita === "") {
      initToast(
        "Error de validación",
        "Debes seleccionar una fecha para la proxima cita",
        "error"
      );
      showToast();
      return false;
    }
    return true;
  }

  async function handleOnSave() {
    try {
      if (validate()) {
        setIsBusy(true);
        await axios.post(`${apiBase}/citas`, {
          paciente,
          doctor,
          fecha,
          observacion,
          proximaVisita,
          estado,
        });

        initToast("Bien!", "Se agregó la cita!", "success");
        showToast();
        router.push("../citas");
      }
    } catch (error) {
      console.log(error);
      setIsBusy(false);
      initToast("Oops!", "Ocurrio un error", "error");
      showToast();
    }
  }

  function init() {
    const _docs: Array<selectOptionType> = doctores.map((_doc) => {
      return {
        value: _doc._id as string,
        text: `${_doc.cedula} | ${_doc.nombres} ${_doc.apellidos}`,
      };
    });

    setDoctoresOptions(_docs);

    if (_docs.length > 0) {
      setDoctor(_docs[0].value);
    }

    const _pacs: Array<selectOptionType> = pacientes.map((_pac) => {
      return {
        value: _pac._id as string,
        text: `${_pac.cedula} | ${_pac.nombres} ${_pac.apellidos}`,
      };
    });

    setPacientesOptions(_pacs);

    if (_pacs.length > 0) {
      setPaciente(_pacs[0].value);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Agregar cita"
          description="Agregar una nueva cita"
          options={actions}
          //search
          //placeholder="Buscar cita por nombre de paciente, cédula de paciente o doctor..."
        />
        <div className={styles.content}>
          <Card>
            <div className={styles.cardbody}>
              <div className={styles.form}>
                <SelectOption
                  options={pacientesOptions}
                  label="Paciente"
                  value={paciente}
                  onchange={setPaciente}
                  required
                />
                <SelectOption
                  options={doctoresOptions}
                  label="Doctor"
                  value={doctor}
                  onchange={setDoctor}
                  required
                />
                <Input
                  label="Fecha"
                  type="date"
                  value={fecha}
                  onChange={({ target }) => setFecha(target.value)}
                />
                <Input
                  label="Observación"
                  value={fecha}
                  onChange={({ target }) => setFecha(target.value)}
                />
                <Input
                  label="Proxima visita"
                  type="date"
                  value={proximaVisita}
                  required
                  onChange={({ target }) => setProximaVisita(target.value)}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const _pacs = await axios.get(`${apiBase}/pacientes`);
  const _docs = await axios.get(`${apiBase}/doctores`);

  return {
    props: {
      pacientes: _pacs.data,
      doctores: _docs.data,
    },
  };
}
