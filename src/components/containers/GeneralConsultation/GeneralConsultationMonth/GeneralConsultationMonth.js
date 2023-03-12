import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import Header from "components/common/Header/Header";
import InputBox from "components/common/InputBox/InputBox";
import SelectBox from "components/common/SelectBox/SelectBox";
import { searchTable } from "components/common/Table/searchTable";
import Table from "components/common/Table/Table";
import { useTableConfigs } from "components/common/Table/useTableConfigs";
import SelectPatientModal from "components/features/SelectPatientModal/SelectPatientModal";
import { useDeleteRecordsMutation } from "lib/api/recordsAPI";
import { sortNameConsultationHeader } from "lib/configs/selectConfigs";
import { useTableSettings } from "lib/hooks/useTableSettings";
import { useRecords } from "lib/hooks/useRecords";
import { useRoute } from "lib/hooks/useRoute";
import { useSelected } from "lib/hooks/useSelected";
import { sortFeatures, sortMonthsFeatures } from "lib/models/sortFeatures";
import _ from "lodash";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./GeneralConsultationMonth.module.scss";
import cls from "classnames";
import { filterDataByMonthYear } from "lib/utils/filterDataByMonthYear";

const GeneralConsultationMonth = () => {
	const { nameConsultationData } = useRecords();
	const { selectedConsultation, setSelectedConsultation, setSelectedPatient } = useSelected();
	const { generalConsultationTableConfigs } = useTableSettings();
	const { setMainView, setRecordsView, setGeneralConsultationView } = useRoute();

	const deleteConsultation = useDeleteRecordsMutation();

	const [consultationSearch, setConsultationSearch] = useState("");
	const [sortItem, setSortItem] = useState("datecreated");
	const [sortOrder, setSortOrder] = useState("asc");
	const [confirmPatientModal, setConfirmPatientModal] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [sortMonth, setSortMonth] = useState(DateTime.now().month);
	const [sortYear, setSortYear] = useState(DateTime.now().year);

	const viewButtonDisable = _.includes(
		_.map(nameConsultationData, (item) => item._id),
		selectedConsultation?._id
	);

	const filterData = filterDataByMonthYear(nameConsultationData, sortMonth, sortYear);

	const { tableData, tableHeaders, tableWidth } = useTableConfigs(filterData, generalConsultationTableConfigs, {
		defaultItem: "datecreated",
		sortItem,
		sortOrder,
	});

	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<Header icon={faNotesMedical}>Monthly/Yearly Consultations</Header>
					<div className={styles.navContainer}>
						<div
							className={styles.navItem}
							onClick={() => {
								setGeneralConsultationView("days");
							}}
						>
							Days
						</div>
						<div className={cls(styles.navItem, styles.navSelected)}>Months</div>
					</div>
				</div>
				<div className={styles.sortContainer}>
					<InputBox
						label="Search"
						className={styles.search}
						width="20rem"
						value={consultationSearch}
						onChange={(e) => setConsultationSearch(e.target.value)}
					/>
					<SelectBox
						label="Month"
						className={styles.sortDay}
						width="10rem"
						options={sortMonthsFeatures}
						value={sortMonth}
						onChange={(e) => setSortMonth(e.target.value)}
					/>
					<InputBox
						label="Year"
						className={styles.sortDay}
						width="10rem"
						maxLength="4"
						value={sortYear}
						onChange={(e) => {
							setSortYear(e.target.value);
						}}
					/>
					<SelectBox
						label="Sort By"
						options={sortNameConsultationHeader}
						className={styles.sortBy}
						value={sortItem}
						onChange={(e) => setSortItem(e.target.value)}
					/>
					<SelectBox
						label="Asc/ Desc"
						options={sortFeatures}
						className={styles.sort}
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value)}
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
							const consultation = _.find(nameConsultationData, (consult) => item._id === consult._id);
							setSelectedPatient(consultation.patient_id);
						}}
						rowDoubleClick={() => {
							setMainView("records");
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
							setConfirmPatientModal(true);
						}}
					/>
					<Button
						label="View"
						className={styles.button}
						disabled={!viewButtonDisable}
						onClick={() => {
							setMainView("records");
							setRecordsView("editconsultation");
						}}
					/>
					<Button
						label="Delete"
						disabled={!viewButtonDisable}
						className={styles.button}
						onClick={() => {
							setConfirmDelete(true);
						}}
					/>
				</div>
			</BottomMenu>
			<SelectPatientModal
				enabled={confirmPatientModal}
				onProceed={() => {
					setMainView("records");
					setRecordsView("addconsultation");
				}}
				onCancel={() => {
					setConfirmPatientModal(false);
				}}
			/>
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

export default GeneralConsultationMonth;
