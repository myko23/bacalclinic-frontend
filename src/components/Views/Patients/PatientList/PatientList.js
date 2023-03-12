import { faUser } from "@fortawesome/free-solid-svg-icons";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import Header from "components/common/Header/Header";
import InputBox from "components/common/InputBox/InputBox";
import SelectBox from "components/common/SelectBox/SelectBox";
import { searchTable } from "components/common/Table/searchTable";
import Table from "components/common/Table/Table";
import { useTableConfigs } from "components/common/Table/useTableConfigs";
import { useDeletePatientMutation } from "lib/api/patientsAPI";
import { sortPatientHeader } from "lib/configs/selectConfigs";
import { useTableSettings } from "lib/hooks/useTableSettings";
import { useRecords } from "lib/hooks/useRecords";
import { useRoute } from "lib/hooks/useRoute";
import { useSelected } from "lib/hooks/useSelected";
import { sortFeatures } from "lib/models/sortFeatures";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./PatientList.module.scss";

const PatientList = () => {
	const { patientData } = useRecords();
	const { selectedPatient, setSelectedPatient } = useSelected();
	const { setRecordsView } = useRoute();
	const { patientTableConfigs } = useTableSettings();

	const deletePatient = useDeletePatientMutation();

	const [patientSearch, setPatientSearch] = useState("");
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [sortOrder, setSortOrder] = useState("asc");
	const [sortItem, setSortItem] = useState("lastname");

	const { tableData, tableHeaders, tableWidth } = useTableConfigs(patientData, patientTableConfigs, {
		defaultItem: "datecreated",
		sortItem,
		sortOrder,
	});

	return (
		<>
			<div className={styles.container}>
				<Header icon={faUser}>Patient List</Header>
				<div className={styles.sortContainer}>
					<InputBox
						label="Search"
						className={styles.search}
						value={patientSearch}
						onChange={(e) => setPatientSearch(e.target.value)}
						width="30rem"
					/>
					<SelectBox
						label="Sort By"
						className={styles.sortBy}
						options={sortPatientHeader}
						onChange={(e) => {
							setSortItem(e.target.value);
						}}
					/>
					<SelectBox
						label="Asc/ Desc"
						className={styles.sort}
						options={sortFeatures}
						onChange={(e) => {
							if (e.target.value === "none") {
								setSortOrder("asc");
							} else setSortOrder(e.target.value);
						}}
					/>
				</div>
				<div className={styles.tableContainer}>
					<Table
						data={searchTable(tableData, patientSearch)}
						dataHeaders={tableHeaders}
						dataWidth={tableWidth}
						rowSelected={selectedPatient?._id} // Row Selected ID
						rowClick={({ _id }) => {
							setSelectedPatient(_id);
						}}
						rowDoubleClick={() => setRecordsView("editpatient")}
						emptyTableString="No Patient Records"
					/>
				</div>
			</div>
			<BottomMenu className={styles.bottomContainer}>
				{selectedPatient && (
					<div className={styles.selectedContainer}>
						<span className={styles.patientLabel}>Patient</span>
						<span
							className={styles.patient}
						>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</span>
					</div>
				)}
				<div className={styles.buttonContainer}>
					<Button label="Add" className={styles.button} onClick={() => setRecordsView("addpatient")} />
					<Button
						label="View"
						className={styles.button}
						disabled={selectedPatient ? false : true}
						onClick={() => setRecordsView("editpatient")}
					/>
					<Button
						label="Delete"
						className={styles.button}
						disabled={selectedPatient ? false : true}
						onClick={() => setConfirmDelete(true)}
					/>
				</div>
			</BottomMenu>
			<ConfirmModal
				enabled={confirmDelete}
				message={`Are you sure you want to DELETE ${selectedPatient?.firstname} ${selectedPatient?.lastname} from the patient records. This will included deleting all the pertaining records he has existing in the system.`}
				onConfirm={async () => {
					try {
						await toast.promise(deletePatient.mutateAsync(selectedPatient._id), {
							pending: "Deleting Patient",
							success: "Patient Deleted",
							error: "Unsuccesful Deleting of Patient",
						});

						setConfirmDelete(false);
					} catch (err) {
						console.error(err.response.data);
					}
				}}
				onCancel={() => {
					setConfirmDelete(false);
				}}
			/>
		</>
	);
};

export default PatientList;
