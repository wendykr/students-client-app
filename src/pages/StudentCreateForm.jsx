import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { EnumsContext } from "../context/EnumsContext";
import { translateEnums } from "../helper/translateEnums";
import { IntlContext } from "../context/IntlContext";

export const StudentCreateForm = () => {
  const { house: houseEnum, gender: genderEnum, year: yearEnum } = useContext(EnumsContext);
  const { locale } = useContext(IntlContext);
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    house: "",
    year: "",
  });
  const [message, setMessage] = useState("")

  const FormattedMessage = ({ id }) => {
    const { messages, locale } = useContext(IntlContext);

    const translatedThingy = messages?.[locale]?.[id];

    if (!translatedThingy) {
      return "Unknown translation";
    }

    return translatedThingy;
  };

  const handleStudentChange = (e, field) => {
    setStudent({
      ...student,
      [field]: e.target.value,
    });
  };

  const handleCreate = async () => {
    if (
      !student.firstName?.trim() ||
      !student.lastName?.trim() ||
      !student.gender ||
      !student.house ||
      !student.year
    ) {
      setMessage(<FormattedMessage id="messageEmptyField" />);
      return;
    }

    const body = {
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender,
      house: student.house,
      year: student.year,
    }

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

      setMessage(<FormattedMessage id="messageSuccesCreate" />);
    } catch (error) {
      setMessage("Nastala chyba při přidání ❌");
      console.error(error);
    }
  }

  return (
    <>
      <h1>
        <FormattedMessage id="titleCreate" />
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
                  required
                  onChange={(e) => handleStudentChange(e, "firstName")}
                  value={student.firstName}
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
                  required
                  onChange={(e) => handleStudentChange(e, "lastName")}
                  value={student.lastName}
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
                    onChange={(e) => handleStudentChange(e, "gender")}
                  />{" "}
                  {translateEnums("M", genderEnum, locale)}
                </label>
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="gender"
                    className="form-check-input"
                    value="F"
                    required
                    checked={student.gender === "F"}
                    onChange={(e) => handleStudentChange(e, "gender")}
                  />{" "}
                  {translateEnums("F", genderEnum, locale)}
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
                  value={student.house}
                  onChange={(e) => handleStudentChange(e, "house")}
                >
                  <option></option>
                  {houseEnum.map((item) => (
                    <option key={item.code} value={item.code}>
                      {translateEnums(item.code, houseEnum, locale)}
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
                  value={student.year}
                  onChange={(e) => handleStudentChange(e, "year")}
                >
                  <option></option>
                  {yearEnum.map((item) => (
                    <option key={item.code} value={item.code}>
                      {translateEnums(item.code, yearEnum, locale)}
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
                  onClick={handleCreate}
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
