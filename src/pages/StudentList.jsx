import { Link } from "react-router-dom";
import { StudentListRow } from "../components/StudentListRow";
import { useState, useEffect } from "react"
import { useTranslate } from "../hooks/useTranslate";

export const StudentList = () => {
  const [studentList, setStudentList] = useState([])
  const [loading, setLoading] = useState(true)
  
  const t = useTranslate();

  useEffect(() => {
    const getStudents = async () => {
    const response = await fetch("http://localhost:8080/students");

    const data = await response.json()

    setStudentList(data)
    setLoading(false)
    }

    getStudents()
  }, [])

  if (loading) return <p>{t("loading")}</p>;

  return (
    <>
      <h1>
        {t("titleList")}
      </h1>
      {}
      <table className="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th>
              {t("thName")}
            </th>
            <th>
              {t("thGender")}
            </th>
            <th>
              {t("thHouse")}
            </th>
            <th>
              {t("thYear")}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => (
            <StudentListRow key={student.id} student={student} />
          ))}
        </tbody>
      </table>
      <nav>
        <Link to="/students/create">
          {t("buttonNew")}
        </Link>
      </nav>
    </>
  );
};
