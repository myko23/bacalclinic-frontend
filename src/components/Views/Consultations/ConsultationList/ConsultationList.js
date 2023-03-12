import React, { useState } from "react";
import styles from "./ConsultationList.module.scss";
import cls from "classnames";
import { useSelected } from "lib/hooks/useSelected";
import { useRoute } from "lib/hooks/useRoute";
import SelectBox from "components/common/SelectBox/SelectBox";
import InputBox from "components/common/InputBox/InputBox";
import { sortFeatures } from "lib/models/sortFeatures";
import Table from "components/common/Table/Table";
import { searchTable } from "components/common/Table/searchTable";
import { useTableConfigs } from "components/common/Table/useTableConfigs";
import { sortConsultationHeader } from "lib/configs/selectConfigs";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import { useDeleteRecordsMutation } from "lib/api/recordsAPI";
import { useTableSettings } from "lib/hooks/useTableSettings";

const ConsultationList = () => {
	const { selectedPatient, patientConsultationData, selectedConsultation, setSelectedConsultation } = useSelected();
	const { setRecordsView } = useRoute();
	const { consultationTableConfigs } = useTableSettings();

	const deleteConsultation = useDeleteRecordsMutation();

	const [consultationSearch, setConsultationSearch] = useState("");
	const [sortItem, setSortItem] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [confirmDelete, setConfirmDelete] = useState(false);

	const { tableData, tableHeaders, tableWidth } = useTableConfigs(patientConsultationData, consultationTableConfigs, {
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
						<div className={cls(styles.recordsItem, styles.recordsSelected)}>Consultation</div>
						<div className={styles.recordsItem} onClick={() => setRecordsView("admissionlist")}>
							Admission
						</div>
					</div>
				</div>
				<div className={styles.sortContainer}>
					<InputBox
						label="Search"
						className={styles.search}
						value={consultationSearch}
						onChange={(e) => setConsultationSearch(e.target.value)}
						width="30rem"
					/>
					<SelectBox
						label="Sort By"
						className={styles.sortBy}
						options={sortConsultationHeader}
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
						data={searchTable(tableData, consultationSearch)}
						dataHeaders={tableHeaders}
						dataWidth={tableWidth}
						rowSelected={selectedConsultation?._id} // Row Selected ID
						rowClick={(item) => {
							setSelectedConsultation(item._id);
						}}
						rowDoubleClick={() => {
							setRecordsView("editconsultation");
						}}
						emptyTableString="No Consultation Records"
					/>
				</div>
			</div>
			<BottomMenu className={styles.bottomContainer}>
				<div className={styles.buttonContainer}>
					<Button
						label="Add"
						className={styles.button}
						onClick={() => {
							setRecordsView("addconsultation");
						}}
					/>
					<Button
						label="View"
						className={styles.button}
						disabled={selectedPatient?._id === selectedConsultation?.patient_id ? false : true}
						onClick={() => {
							setRecordsView("editconsultation");
						}}
					/>
					<Button
						label="Delete"
						className={styles.button}
						disabled={selectedPatient?._id === selectedConsultation?.patient_id ? false : true}
						onClick={() => {
							setConfirmDelete(true);
						}}
					/>
				</div>
			</BottomMenu>
			<ConfirmModal
				enabled={confirmDelete}
				message={`Are you sure you want to DELETE record with ${selectedConsultation?.chiefcomplaint} from the consultation records`}
				onConfirm={async () => {
					try {
						await toast.promise(deleteConsultation.mutateAsync(selectedConsultation._id), {
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

export default ConsultationList;
