import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { EnumsContext } from "../context/EnumsContext";
import { translateEnums } from "../helper/translateEnums";
import { IntlContext } from "../context/IntlContext";

export const StudentEditForm = () => {
  const { gender, house, year } = useContext(EnumsContext)
  const { locale } = useContext(IntlContext);
  const { id } = useParams();

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    house: "",
    year: "",
  });
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

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

  const handleFirstName = (e) => {
    setStudent({...student, firstName: e.target.value });
  };

  const handleLastName = (e) => {
    setStudent({...student, lastName: e.target.value});
  };

  const handleGender = (e) => {
    setStudent({...student, gender: e.target.value});
  };

  const handleHouse = (e) => {
    setStudent({...student, house: e.target.value});
  };

  const handleYear = (e) => {
    setStudent({
      ...student,
      year: e.target.value,
    });
  };

const handleEdit = async () => {
  const body = {
    firstName: student.firstName,
    lastName: student.lastName,
    gender: student.gender,
    house: student.house,
    year: student.year,
  };

  try {
    const response = await fetch(
      `http://localhost:8080/students/${student.id}`,
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

    setMessage(<FormattedMessage id="messageSuccesEdit" />);
  } catch (error) {
    setMessage("Nastala chyba při úpravě ❌");
    console.error(error);
  }
};

  if (loading) return (
    <p>
      <FormattedMessage id="loading" />
    </p>
  );

  return (
    <>
      <h1>
        <FormattedMessage id="titleEdit" />
      </h1>
      {message && <p>{message}</p>}
      <form>
        <table className="table table-light table-bordered">
          <tbody>
            <tr>
              <th>
                <label htmlFor="first-name" className="form-label">
                  <FormattedMessage id="thFirstName" />
                </label>
              </th>
              <td>
                <input
                  id="first-name"
                  name="first-name"
                  className="form-control"
                  value={student.firstName}
                  onChange={handleFirstName}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="last-name" className="form-label">
                  <FormattedMessage id="thLastName" />
                </label>
              </th>
              <td>
                <input
                  id="last-name"
                  name="last-name"
                  className="form-control"
                  value={student.lastName}
                  onChange={handleLastName}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="thGender" />
              </th>
              <td>
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="gender"
                    className="form-check-input"
                    value="M"
                    required
                    checked={student.gender === "M"}
                    onChange={handleGender}
                  />{" "}
                  {translateEnums("M", gender, locale)}
                </label>
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="gender"
                    className="form-check-input"
                    value="F"
                    required
                    checked={student.gender === "F"}
                    onChange={handleGender}
                  />{" "}
                  {translateEnums("F", gender, locale)}
                </label>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="house" className="form-label">
                  <FormattedMessage id="thHouse" />
                </label>
              </th>
              <td>
                <select
                  id="house"
                  name="house"
                  className="form-select"
                  required
                  onChange={handleHouse}
                  value={student.house}
                >
                  {house.map((item) => (
                    <option key={item.code} value={item.code}>
                      {translateEnums(item.code, house, locale)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="year" className="form-label">
                  <FormattedMessage id="thYear" />
                </label>
              </th>
              <td>
                <select
                  id="year"
                  name="year"
                  className="form-select"
                  required
                  onChange={handleYear}
                  value={student.year}
                >
                  {year.map((item) => (
                    <option key={item.code} value={item.code}>
                      {translateEnums(item.code, year, locale)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEdit}
                >
                  <FormattedMessage id="buttonSave" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <nav>
        <Link to="/">
          <FormattedMessage id="buttonBack" />
        </Link>
      </nav>
    </>
  );
};
