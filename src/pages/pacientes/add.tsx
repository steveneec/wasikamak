import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  actionHeaderType,
  contactoType,
  nacionalidadType,
  riesgoType,
  selectOptionType,
} from "@/types";
import { GrSave } from "react-icons/gr";
import PageHeader from "@/components/PageHeader";
import Input from "@/components/Input";
import SelectOption from "@/components/SelectOption";
import Card from "@/components/Card";
import styles from "../../styles/pages/addpaciente.module.css";
import axios from "axios";
import { apiBase } from "@/utils";
import { useToast } from "@/hooks/useToast";
import { GrChapterAdd } from "react-icons/gr";
import OptionAction from "@/components/ActionButton";
import ContactRow from "@/components/ContactRow";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { checkIfNumber } from "@/utils";

export default function AddPaciente({
  nacionalidades,
  riesgos,
}: {
  nacionalidades: Array<nacionalidadType>;
  riesgos: Array<riesgoType>;
}) {
  const [apellidos, setApellidos] = useState("");
  const [nombres, setNombres] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("hombre");
  const [medicinaHabitual, setMedicinaHabitual] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefonoFijo, setTelefonoFijo] = useState("");
  const [celular, setCelular] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [riesgo, setRiesgo] = useState("");
  const [isAddContact, setIsAddContact] = useState(false);
  //options
  const [nacionalidadOptions, setNacionalidadOptions] = useState<
    Array<selectOptionType>
  >([]);
  const [riesgoOptions, setRiesgoOptions] = useState<Array<selectOptionType>>(
    []
  );
  const [contactos, setContactos] = useState<Array<contactoType>>([]);
  const [contactoNombre, setContactoNombre] = useState("");
  const [contactoApellido, setContactoApellido] = useState("");
  const [contactoCelular, setContactoCelular] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const { initToast, showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    init();
  }, []);

  const actions: Array<actionHeaderType> = [
    {
      label: "Guardar",
      icon: <GrSave size={18} />,
      action: () => handleOnSave(),
    },
  ];

  const sexoOptions: Array<selectOptionType> = [
    { value: "hombre", text: "Hombre" },
    { value: "mujer", text: "Mujer" },
  ];

  async function handleOnSave() {
    try {
      if (validate()) {
        setIsBusy(true);
        await axios.post("/api/pacientes", {
          apellidos,
          nombres,
          cedula,
          fechaNacimiento,
          sexo,
          medicinaHabitual,
          direccion,
          telefonoFijo,
          celular,
          nacionalidad,
          riesgo,
          contactos,
        });

        initToast("Bien!", "Se agregó el nuevo paciente", "success");
        showToast();

        router.push("../pacientes");
      }
    } catch (error) {
      console.log(error);
      setIsBusy(false);
      initToast("Oops!", "Ocurrio un error", "error");
      showToast();
    }
  }

  function init() {
    //Extract nacionalidades
    const _nacionalidadOptions: Array<selectOptionType> = nacionalidades.map(
      (_nac) => {
        return {
          value: _nac._id as string,
          text: _nac.descripcion,
        };
      }
    );
    setNacionalidadOptions(_nacionalidadOptions);

    if (_nacionalidadOptions.length > 0) {
      setNacionalidad(_nacionalidadOptions[0].value);
    }

    //Extract riesgo
    const _riesgoOptions: Array<selectOptionType> = riesgos.map((_rieg) => {
      return {
        value: _rieg._id as string,
        text: _rieg.descripcion,
      };
    });

    setRiesgoOptions(_riesgoOptions);

    if (_riesgoOptions.length > 0) {
      setRiesgo(_riesgoOptions[0].value);
    }
  }

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
    if (nacionalidad === "") {
      initToast(
        "Error de validación",
        "Debes especificar la nacionalidad",
        "error"
      );
      showToast();
      return false;
    }
    if (riesgo === "") {
      initToast(
        "Error de validación",
        "Debes especificar el nivel de riesgo",
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

  function handleOnAddContact() {
    if (validateContacto()) {
      const _contacts = [...contactos];
      _contacts.push({
        nombres: contactoNombre,
        apellidos: contactoApellido,
        celular: contactoCelular,
      });
      setContactos(_contacts);
      setIsAddContact(false);
    }
  }

  function handleOnRemoveContact(contacto: contactoType) {
    const _contacts = contactos.filter((_cont) => _cont !== contacto);
    setContactos(_contacts);
  }

  function handleOnCancelAddConctact() {
    setIsAddContact(false);
    setContactoNombre("");
    setContactoApellido("");
    setContactoCelular("");
  }

  function validateContacto() {
    if (contactoNombre === "") {
      initToast(
        "Error de validación",
        "El nombre no pueden esta vacio",
        "error"
      );
      showToast();
      return false;
    }

    if (contactoApellido === "") {
      initToast(
        "Error de validación",
        "El apellido no puede estar vacio",
        "error"
      );
      showToast();
      return false;
    }

    if (contactoCelular === "" || contactoCelular.length < 10) {
      initToast(
        "Error de validación",
        "El telefono no puede estar vacio o debe tener 10 digitos",
        "error"
      );
      showToast();
      return false;
    }

    return true;
  }

  return (
    <Layout>
      <div>
        <PageHeader
          title="Nuevo Paciente"
          description="Agrega un nuevo paciente"
          options={actions}
        />
        <div className={styles.content}>
          <Card title="Información básica">
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
                <Input
                  label="Medicina habitual"
                  value={medicinaHabitual}
                  onChange={({ target }) => {
                    setMedicinaHabitual(target.value);
                  }}
                />
                <SelectOption
                  options={nacionalidadOptions}
                  label="Nacionalidad"
                  value={nacionalidad}
                  onchange={setNacionalidad}
                  required
                />
                <SelectOption
                  options={riesgoOptions}
                  label="Nivel de riesgo"
                  value={riesgo}
                  onchange={setRiesgo}
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
          <Card title="Contactos de emergencia">
            <div className={styles.cardbody}>
              <div className={styles.form}>
                <div>
                  <OptionAction
                    action={{
                      label: "Agregar",
                      icon: <GrChapterAdd size={18} />,
                      action: () => setIsAddContact(true),
                    }}
                  />
                  <div className={styles.contacts}>
                    {contactos.map((contacto, key) => (
                      <ContactRow
                        key={key}
                        contacto={contacto}
                        onremove={() => handleOnRemoveContact(contacto)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        {isAddContact && (
          <Modal>
            <Card title="Nuevo contacto">
              <div className={styles.cardbody}>
                <div className={styles.form}>
                  <Input
                    label="Nombre"
                    value={contactoNombre}
                    onChange={({ target }) => setContactoNombre(target.value)}
                  />
                  <Input
                    label="Apellido"
                    value={contactoApellido}
                    onChange={({ target }) => setContactoApellido(target.value)}
                  />
                  <Input
                    label="Celular"
                    maxLength={10}
                    value={contactoCelular}
                    onChange={({ target }) =>
                      checkIfNumber(target.value, setContactoCelular)
                    }
                  />
                </div>
              </div>
              <div className={styles.cardOptions}>
                <button onClick={() => handleOnCancelAddConctact()}>
                  Cancelar
                </button>
                <button onClick={() => handleOnAddContact()}>Aceptar</button>
              </div>
            </Card>
          </Modal>
        )}
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
  const nacionalidades = await axios.get(`${apiBase}/nacionalidades`);
  const riesgo = await axios.get(`${apiBase}/riesgo`);

  return {
    props: {
      nacionalidades: nacionalidades.data,
      riesgos: riesgo.data,
    },
  };
}
