import { Link } from "react-router-dom";
import { useContext } from "react";
import { EnumsContext } from "../context/EnumsContext";
import { translateEnums } from "../helper/translateEnums";
import { IntlContext } from "../context/IntlContext";
import { useTranslate } from "../hooks/useTranslate";
export const StudentListRow = ({
  student: {id, firstName, lastName, gender, house, year},
}) => {
  const { house: houseEnum, gender: genderEnum, year: yearEnum } = useContext(EnumsContext);
  const { locale } = useContext(IntlContext);
  const t = useTranslate()

  const handleDelete = () => {
    fetch(`http://localhost:8080/students/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <tr>
      <td>
        <Link to={`/students/${id}`}>
          {firstName} {lastName}
        </Link>
      </td>
      <td>{translateEnums(gender, genderEnum, locale)}</td>
      <td>{translateEnums(house, houseEnum, locale)}</td>
      <td>{translateEnums(year, yearEnum, locale)}</td>
      <td>
        <Link to={`/students/${id}/edit`}>{t("buttonEdit")}</Link>{" "}
        <button
          type="button"
          className="btn btn-danger student-delete"
          onClick={handleDelete}
        >
          {t("buttonDel")}
        </button>
      </td>
    </tr>
  );
};