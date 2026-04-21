import { Link } from "react-router-dom"
import { useState } from "react"
import { useTranslate } from "../hooks/useTranslate";
import { StudentForm } from "../components/StudentForm";

export const StudentCreateForm = () => {
  const t = useTranslate();

  const [message, setMessage] = useState("")

  const handleCreate = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const gender = form.gender.value;
    const house = form.house.value;
    const year = form.year.value;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !gender ||
      !house ||
      !year
    ) {
      setMessage(t("messageEmptyField"));
      return;
    }

    const body = {
      firstName,
      lastName,
      gender,
      house,
      year,
    };

    try {
      const response = await fetch("http://localhost:8080/students", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Přidání se nepovedlo");
      }

      setMessage(t("messageSuccesCreate"));
    } catch (error) {
      setMessage("Nastala chyba při přidání ❌");
      console.error(error);
    }
  }

  return (
    <>
      <h1>{t("titleCreate")}</h1>
      {message && <p>{message}</p>}
      <StudentForm defaultValues={{}} onSubmit={handleCreate} />
      <nav>
        <Link to="/">{t("buttonBack")}</Link>
      </nav>
    </>
  );
};
