import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { EnumsContext } from "../context/EnumsContext";
import { translateEnums } from "../helper/translateEnums";
import { IntlContext } from "../context/IntlContext";

export const StudentDetail = () => {
  const { gender, house, year } = useContext(EnumsContext)
  const { locale } = useContext(IntlContext);
  const { id } = useParams();

  const [student, setStudent] = useState({})
  const [loading, setLoading] = useState(true);

  const FormattedMessage = ({ id }) => {
    const { messages, locale } = useContext(IntlContext);
  
    const translatedThingy = messages?.[locale]?.[id];
  
    if (!translatedThingy) {
      return "Unknown translation";
    }
  
    return translatedThingy;
  };

  useEffect(() => {
    const getStudent = async () => {
    const response = await fetch(`http://localhost:8080/students/${id}`);
    
    const data = await response.json()
    
    setStudent(data)
      setLoading(false);
    }
    
    getStudent()
  }, [id])

    if (loading) return (
      <p>
        <FormattedMessage id="loading" />
      </p>
    );

  return (
    <>
      <h1>
        <FormattedMessage id="titleDetail" />
      </h1>
      <table className="table table-light table-bordered">
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="thName" />
            </th>
            <td>
              {student.firstName} {student.lastName}
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="thGender" />
            </th>
            <td>{translateEnums(student.gender, gender, locale)}</td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="thHouse" />
            </th>
            <td>{translateEnums(student.house, house, locale)}</td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="thYear" />
            </th>
            <td>{translateEnums(student.year, year, locale)}</td>
          </tr>
        </tbody>
      </table>
      <nav>
        <Link to="/">
          <FormattedMessage id="buttonBack" />
        </Link>{" "}
        <Link to={`/students/${id}/edit`}>
          <FormattedMessage id="buttonEdit" /> {student.firstName}{" "}
          {student.lastName}
        </Link>
      </nav>
    </>
  );
};
