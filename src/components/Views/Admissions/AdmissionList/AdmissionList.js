import { useRoute } from "lib/hooks/useRoute";
import { useSelected } from "lib/hooks/useSelected";
import React, { useState } from "react";
import styles from "./AdmissionList.module.scss";
import cls from "classnames";
import SelectBox from "components/common/SelectBox/SelectBox";
import { sortAdmissionHeader } from "lib/configs/selectConfigs";
import { sortFeatures } from "lib/models/sortFeatures";
import InputBox from "components/common/InputBox/InputBox";
import Table from "components/common/Table/Table";
import { searchTable } from "components/common/Table/searchTable";
import { useTableConfigs } from "components/common/Table/useTableConfigs";
import { useTableSettings } from "lib/configs/useTableSettings";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import { toast } from "react-toastify";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { useDeleteRecordsMutation } from "lib/api/recordsAPI";

const AdmissionList = () => {
	const { selectedPatient, selectedAdmission, setSelectedAdmission, patientAdmissionData } = useSelected();
	const { setRecordsView } = useRoute();
	const { admissionTableConfigs } = useTableSettings();
	const [admissionSearch, setAdmissionSearch] = useState("");
	const [sortItem, setSortItem] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [confirmDelete, setConfirmDelete] = useState(false);
	const deleteRecords = useDeleteRecordsMutation();

	const { tableData, tableHeaders, tableWidth } = useTableConfigs(patientAdmissionData, admissionTableConfigs, {
		defaultItem: "datecreated",
		sortItem,
		sortOrder,
	});

	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h1>
					<div className={styles.recordsContainer}>
						<div className={styles.recordsItem} onClick={() => setRecordsView("editpatient")}>
							Records
						</div>
						<div className={styles.recordsItem} onClick={() => setRecordsView("consultationlist")}>
							Consultation
						</div>
						<div className={cls(styles.recordsItem, styles.recordsSelected)}>Admission</div>
					</div>
				</div>
				<div className={styles.sortContainer}>
					<InputBox
						label="Search"
						className={styles.search}
						width="30rem"
						value={admissionSearch}
						onChange={(e) => setAdmissionSearch(e.target.value)}
					/>
					<SelectBox
						label="Sort By"
						className={styles.sortBy}
						options={sortAdmissionHeader}
						value={sortItem}
						onChange={(e) => {
							setSortItem(e.target.value);
						}}
					/>
					<SelectBox
						label="Asc/ Desc"
						className={styles.sort}
						options={sortFeatures}
						value={sortOrder}
						onChange={(e) => {
							setSortOrder(e.target.value);
						}}
					/>
				</div>
				<div className={styles.tableContainer}>
					<Table
						data={searchTable(tableData, admissionSearch)}
						dataHeaders={tableHeaders}
						dataWidth={tableWidth}
						rowSelected={selectedAdmission?._id} // Row Selected ID
						rowClick={(item) => {
							setSelectedAdmission(item._id);
						}}
						rowDoubleClick={() => {
							setRecordsView("editadmission");
						}}
						emptyTableString="No Admission Records"
					/>
				</div>
			</div>
			<BottomMenu className={styles.bottomContainer}>
				<div className={styles.buttonContainer}>
					<Button
						label="Add"
						className={styles.button}
						onClick={() => {
							setRecordsView("addadmission");
						}}
					/>
					<Button
						label="View"
						className={styles.button}
						disabled={selectedPatient?._id === selectedAdmission?.patient_id ? false : true}
						onClick={() => {
							setRecordsView("editadmission");
						}}
					/>
					<Button
						label="Delete"
						className={styles.button}
						disabled={selectedPatient?._id === selectedAdmission?.patient_id ? false : true}
						onClick={() => {
							setConfirmDelete(true);
						}}
					/>
				</div>
			</BottomMenu>
			<ConfirmModal
				enabled={confirmDelete}
				message={`Are you sure you want to DELETE record with ${selectedAdmission?.chiefcomplaint} from the admission records`}
				onConfirm={async () => {
					try {
						await toast.promise(deleteRecords.mutateAsync(selectedAdmission._id), {
							pending: "Deleting Consultation",
							success: "Consultation Deleted",
							error: "Unsuccesful Deleting of Consultation",
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

export default AdmissionList;
