import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { useTranslate } from "../hooks/useTranslate";
import { StudentForm } from "../components/StudentForm";

export const StudentEditForm = () => {
  const { id } = useParams();
  const t = useTranslate();

  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const getStudent = async () => {
    const response = await fetch(`http://localhost:8080/students/${id}`);
    
    const data = await response.json()
    
    setStudent(data)
      setLoading(false);
    }
    
    getStudent()
  }, [id])

  const handleEdit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const gender = form.gender.value;
    const house = form.house.value;
    const year = form.year.value;

    const body = {
      firstName,
      lastName,
      gender,
      house,
      year,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/students/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Editace se nepovedla");
      }

      setMessage(t("messageSuccesEdit"));
    } catch (error) {
      setMessage("Nastala chyba při úpravě ❌");
      console.error(error);
    }
  };

  if (loading) return (
    <p>
      {t("loading")}
    </p>
  );

  return (
    <>
      <h1>{t("titleEdit")}</h1>
      {message && <p>{message}</p>}
      <StudentForm defaultValues={student} onSubmit={handleEdit} />
      <nav>
        <Link to="/">{t("buttonBack")}</Link>
      </nav>
    </>
  );
};
