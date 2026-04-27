import { Link } from "react-router-dom";
import { StudentListRow } from "../components/StudentListRow";
import { useState } from "react";
import { useTranslate } from "../hooks/useTranslate";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const StudentList = () => {
  const [message, setMessage] = useState("");

  const t = useTranslate();

  const queryClient = useQueryClient();

  const getStudents = async () => {
    const response = await fetch("http://localhost:8080/students");
    const data = await response.json();

    return data;
  };

  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: ["studentsList"],
    queryFn: getStudents,
  });

  const deleteStudent = (id) =>
    fetch(`http://localhost:8080/students/${id}`, { method: "DELETE" });

  const deleteMutation = useMutation({
    queryKey: ["studentsList"],
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentsList"] });
      setMessage(t("messageSuccesDel"));
    },
  });

  if (isPending) return <p>{t("loading")}</p>;

  if (isError) return <p>{t("error")}</p>;

  if (isFetching) return <p>{t("fetching")}</p>;

  return (
    <>
      <h1>{t("titleList")}</h1>
      {message && <p>{message}</p>}
      <table className="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th>{t("thName")}</th>
            <th>{t("thGender")}</th>
            <th>{t("thHouse")}</th>
            <th>{t("thYear")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <StudentListRow
              key={student.id}
              student={student}
              onDelete={deleteMutation.mutate}
            />
          ))}
        </tbody>
      </table>
      <nav>
        <Link to="/students/create">{t("buttonNew")}</Link>
      </nav>
    </>
  );
};
