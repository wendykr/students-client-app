import { Link } from "react-router-dom";
import { StudentListRow } from "../components/StudentListRow";
import { useState, useEffect, useContext } from "react"
import { IntlContext } from "../context/IntlContext";

export const StudentList = () => {
  const [studentList, setStudentList] = useState([])
  const [loading, setLoading] = useState(true)
  
  const FormattedMessage = ({ id }) => {
    const { messages, locale } = useContext(IntlContext);

    const translatedThingy = messages?.[locale]?.[id];

    if (!translatedThingy) {
      return "Unknown translation";
    }

    return translatedThingy;
  };

  useEffect(() => {
    const getStudents = async () => {
    const response = await fetch("http://localhost:8080/students");

    const data = await response.json()

    setStudentList(data)
    setLoading(false)
    }

    getStudents()
  }, [])

  if (loading) return (
    <p>
      <FormattedMessage id="loading" />
    </p>
  );

  return (
    <>
      <h1>
        <FormattedMessage id="titleList" />
      </h1>
      {}
      <table className="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="thName" />
            </th>
            <th>
              <FormattedMessage id="thGender" />
            </th>
            <th>
              <FormattedMessage id="thHouse" />
            </th>
            <th>
              <FormattedMessage id="thYear" />
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
          <FormattedMessage id="buttonNew" />
        </Link>
      </nav>
    </>
  );
};
