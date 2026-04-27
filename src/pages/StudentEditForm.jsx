import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslate } from "../hooks/useTranslate";
import { StudentForm } from "../components/StudentForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const StudentEditForm = () => {
  const { id } = useParams();
  const t = useTranslate();

  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");

  const getStudent = async () => {
    const response = await fetch(`http://localhost:8080/students/${id}`);
    if (!response.ok) throw new Error("Nepodařilo se načíst studenta");
    const data = await response.json();

    return data;
  };

  const { data, isPending } = useQuery({
    queryKey: ["student", id],
    queryFn: getStudent,
  });

  const editStudent = async ({ id, student }) => {
    const response = await fetch(`http://localhost:8080/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Editace se nepovedla");
  };

  const editStudentMutation = useMutation({
    mutationKey: ["student", id],
    mutationFn: editStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", id] });
      setMessage(t("messageSuccesEdit"));
    },
    onError: () => {
      setMessage("Nastala chyba při úpravě ❌");
    },
  });

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

    editStudentMutation.mutate({ id, student: body });
  };

  if (isPending) return <p>{t("loading")}</p>;

  return (
    <>
      <h1>{t("titleEdit")}</h1>
      {message && <p>{message}</p>}
      <StudentForm defaultValues={data} onSubmit={handleEdit} />
      <nav>
        <Link to="/">{t("buttonBack")}</Link>
      </nav>
    </>
  );
};
