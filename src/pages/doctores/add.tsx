import Layout from "@/components/Layout";
import { actionHeaderType, especialidadType, institucionType } from "@/types";
import { useRouter } from "next/router";
import { GrSave } from "react-icons/gr";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import styles from "../../styles/pages/adddoctor.module.css";
import Input from "@/components/Input";
import { useState, useEffect } from "react";
import SelectOption from "@/components/SelectOption";
import { apiBase, checkIfNumber } from "@/utils";
import { selectOptionType } from "@/types";
import { useToast } from "@/hooks/useToast";
import axios from "axios";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";

export default function Add({
  instituciones,
  especialidades,
}: {
  instituciones: Array<institucionType>;
  especialidades: Array<especialidadType>;
}) {
  const [apellidos, setApellidos] = useState("");
  const [nombres, setNombres] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("hombre");
  const [direccion, setDireccion] = useState("");
  const [telefonoFijo, setTelefonoFijo] = useState("");
  const [celular, setCelular] = useState("");
  const router = useRouter();
  const [institucionOptions, setInstitucionOptions] = useState<
    Array<selectOptionType>
  >([]);
  const [institucion, setInstitucion] = useState("");
  const [especialidadOptions, setEspecialidadOptions] = useState<
    Array<selectOptionType>
  >([]);
  const [especialidad, setEspecialidad] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const sexoOptions: Array<selectOptionType> = [
    { value: "hombre", text: "Hombre" },
    { value: "mujer", text: "Mujer" },
  ];

  const { initToast, showToast } = useToast();

  const actions: Array<actionHeaderType> = [
    {
      label: "Guardar",
      icon: <GrSave size={18} />,
      action: () => handleOnSave(),
    },
  ];

  function init() {
    const _inst: Array<selectOptionType> = instituciones.map((_in) => {
      return {
        value: _in._id as string,
        text: _in.descripcion,
      };
    });

    setInstitucionOptions(_inst);

    if (_inst.length > 0) {
      setInstitucion(_inst[0].value);
    }

    const _esp: Array<selectOptionType> = especialidades.map((_es) => {
      return {
        value: _es._id as string,
        text: _es.descripcion,
      };
    });

    setEspecialidadOptions(_esp);

    if (_esp.length > 0) {
      setEspecialidad(_esp[0].value);
    }
  }

  useEffect(() => {
    init();
  }, []);

  function validate() {
    if (apellidos === "") {
      initToast(
        "Error de validación",
        "Los apellidos no pueden estar vacios",
        "error"
      );
      showToast();
      return false;
    }
    if (nombres === "") {
      initToast(
        "Error de validación",
        "Los nombres no pueden estar vacios",
        "error"
      );
      showToast();
      return false;
    }
    if (cedula === "" || cedula.length < 10) {
      initToast(
        "Error de validación",
        "La cedula no puede estar vacia o debe tener 10 digitos",
        "error"
      );
      showToast();
      return false;
    }
    if (fechaNacimiento === "") {
      initToast(
        "Error de validación",
        "Debes especificar la fecha de nacimiento",
        "error"
      );
      showToast();
      return false;
    }
    if (direccion === "") {
      initToast(
        "Error de validación",
        "Debes especificar la direccion de domicilio",
        "error"
      );
      showToast();
      return false;
    }
    if (celular === "" || celular.length < 10) {
      initToast(
        "Error de validación",
        "El celular no puede estar vacio o debe tener 10 digitos",
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
        await axios.post(`${apiBase}/doctores`, {
          apellidos,
          nombres,
          cedula,
          fechaNacimiento,
          sexo,
          direccion,
          telefonoFijo,
          celular,
          especialidad,
          institucion,
          disponible: true,
        });

        initToast("Bien!", "Se agregó el nuevo doctor", "success");
        showToast();
        router.push("../doctores");
      }
    } catch (error) {
      console.log(error);
      setIsBusy(false);
      initToast("Oops!", "Ocurrio un error", "error");
      showToast();
    }
  }

  return (
    <Layout>
      <div>
        <PageHeader
          title="Agregar Doctor"
          description="Agrega un nuevo doctor"
          options={actions}
        />
        <div className={styles.content}>
          <Card title="Información personal">
            <div className={styles.cardbody}>
              <div className={styles.form}>
                <Input
                  label="Apellidos"
                  value={apellidos}
                  onChange={({ target }) => {
                    setApellidos(target.value);
                  }}
                  required
                />
                <Input
                  label="Nombres"
                  value={nombres}
                  onChange={({ target }) => {
                    setNombres(target.value);
                  }}
                  required
                />
                <Input
                  label="Cédula"
                  maxLength={10}
                  minLength={10}
                  value={cedula}
                  onChange={({ target }) => {
                    checkIfNumber(target.value, setCedula);
                  }}
                  required
                />
                <Input
                  label="Fecha Nacimiento"
                  type="date"
                  value={fechaNacimiento}
                  onChange={({ target }) => {
                    setFechaNacimiento(target.value);
                  }}
                  required
                />
                <SelectOption
                  options={sexoOptions}
                  label="Sexo"
                  value={sexo}
                  onchange={setSexo}
                  required
                />
              </div>
            </div>
          </Card>
          <Card title="Información de contacto">
            <div className={styles.cardbody}>
              <div className={styles.form}>
                <Input
                  label="Dirección"
                  value={direccion}
                  onChange={({ target }) => {
                    setDireccion(target.value);
                  }}
                  required
                />
                <Input
                  label="Teléfono fijo"
                  value={telefonoFijo}
                  onChange={({ target }) => {
                    checkIfNumber(target.value, setTelefonoFijo);
                  }}
                />
                <Input
                  label="Celular"
                  maxLength={10}
                  minLength={10}
                  value={celular}
                  onChange={({ target }) => {
                    checkIfNumber(target.value, setCelular);
                  }}
                  required
                />
              </div>
            </div>
          </Card>
          <Card title="Información profesional">
            <div className={styles.cardbody}>
              <div className={styles.form}>
                <SelectOption
                  label="Institucion"
                  options={institucionOptions}
                  onchange={setInstitucion}
                  value={institucion}
                />
                <SelectOption
                  label="Especialidad"
                  options={especialidadOptions}
                  onchange={setEspecialidad}
                  value={especialidad}
                />
              </div>
            </div>
          </Card>
        </div>
        {isBusy && (
          <Modal>
            <Loading />
          </Modal>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const _inst = await axios.get(`${apiBase}/instituciones`);

  const _esp = await axios.get(`${apiBase}/especialidades`);

  return {
    props: {
      instituciones: _inst.data,
      especialidades: _esp.data,
    },
  };
}
