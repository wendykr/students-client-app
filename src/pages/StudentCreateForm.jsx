import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslate } from "../hooks/useTranslate";
import { StudentForm } from "../components/StudentForm";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const StudentCreateForm = () => {
  const t = useTranslate();

  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");

  const createStudent = (student) =>
    fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

  const addStudentMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setMessage(t("messageSuccesCreate"));
    },
    onError: () => {
      setMessage("Nastala chyba při přidání ❌");
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const gender = form.gender.value;
    const house = form.house.value;
    const year = form.year.value;

    if (!firstName?.trim() || !lastName?.trim() || !gender || !house || !year) {
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

    addStudentMutation.mutate(body);
  };

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
