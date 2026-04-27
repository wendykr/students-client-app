import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { EnumsContext } from "../context/EnumsContext";
import { translateEnums } from "../helper/translateEnums";
import { IntlContext } from "../context/IntlContext";
import { useTranslate } from "../hooks/useTranslate";

export const StudentDetail = () => {
  const { gender, house, year } = useContext(EnumsContext);
  const { locale } = useContext(IntlContext);
  const { id } = useParams();
  const t = useTranslate();

  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStudent = async () => {
      const response = await fetch(`http://localhost:8080/students/${id}`);

      const data = await response.json();

      setStudent(data);
      setLoading(false);
    };

    getStudent();
  }, [id]);

  if (loading) return <p>{t("loading")}</p>;

  return (
    <>
      <h1>{t("titleDetail")}</h1>
      <table className="table table-light table-bordered">
        <tbody>
          <tr>
            <th>{t("thName")}</th>
            <td>
              {student.firstName} {student.lastName}
            </td>
          </tr>
          <tr>
            <th>{t("thGender")}</th>
            <td>{translateEnums(student.gender, gender, locale)}</td>
          </tr>
          <tr>
            <th>{t("thHouse")}</th>
            <td>{translateEnums(student.house, house, locale)}</td>
          </tr>
          <tr>
            <th>{t("thYear")}</th>
            <td>{translateEnums(student.year, year, locale)}</td>
          </tr>
        </tbody>
      </table>
      <nav>
        <Link to="/">{t("buttonBack")}</Link>{" "}
        <Link to={`/students/${id}/edit`}>
          {t("buttonEdit")} {student.firstName} {student.lastName}
        </Link>
      </nav>
    </>
  );
};
