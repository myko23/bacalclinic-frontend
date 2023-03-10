import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import DateBox from "components/common/DateBox/DateBox";
import InputBox from "components/common/InputBox/InputBox";
import SelectBox from "components/common/SelectBox/SelectBox";
import { searchTable } from "components/common/Table/searchTable";
import Table from "components/common/Table/Table";
import { useTableConfigs } from "components/common/Table/useTableConfigs";
import SelectPatientModal from "components/features/SelectPatientModal/SelectPatientModal";
import { sortNameConsultationHeader } from "lib/configs/selectConfigs";
import { useTableSettings } from "lib/configs/useTableSettings";
import { useRecords } from "lib/hooks/useRecords";
import { useRoute } from "lib/hooks/useRoute";
import { useSelected } from "lib/hooks/useSelected";
import { sortFeatures } from "lib/models/sortFeatures";
import _ from "lodash";
import { DateTime } from "luxon";
import React, { useState } from "react";
import styles from "./GeneralConsultation.module.scss";

const GeneralConsultation = () => {
	const [consultationSearch, setConsultationSearch] = useState("");
	const { nameConsultationData } = useRecords();
	const { selectedConsultation, setSelectedConsultation, setSelectedPatient } = useSelected();
	const { generalConsultationTableConfigs } = useTableSettings();
	const [sortDay, setSortDay] = useState(DateTime.now().toFormat("MM-dd-yyyy"));
	const { setMainView, setRecordsView } = useRoute();
	const [sortItem, setSortItem] = useState("datecreated");
	const [sortOrder, setSortOrder] = useState("asc");
	const [confirmPatientModal, setConfirmPatientModal] = useState(false);

	const datedConsultationData = _.filter(nameConsultationData, (item) => item.dateofconsult === sortDay);
	const viewButtonDisable = _.includes(
		_.map(datedConsultationData, (item) => item._id),
		selectedConsultation?._id
	);

	const { tableData, tableHeaders, tableWidth } = useTableConfigs(
		datedConsultationData,
		generalConsultationTableConfigs,
		{
			defaultItem: "datecreated",
			sortItem,
			sortOrder,
		}
	);

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.header}>Consultations</h1>
				<div className={styles.sortContainer}>
					<InputBox
						label="Search"
						className={styles.search}
						width="30rem"
						value={consultationSearch}
						onChange={(e) => setConsultationSearch(e.target.value)}
					/>
					<DateBox
						label="Day"
						className={styles.sortDay}
						width="15rem"
						selected={DateTime.fromFormat(sortDay, "MM-dd-yyyy").toJSDate()}
						onChange={(e) => {
							if (e !== null) {
								const newDate = DateTime.fromJSDate(e).toFormat("MM-dd-yyyy");
								setSortDay(newDate);
							}
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
							console.log({ consultation });
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
						disabled={!viewButtonDisable}
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
					<Button label="Delete" disabled={!viewButtonDisable} className={styles.button} onClick={() => {}} />
				</div>
			</BottomMenu>
			<SelectPatientModal
				enabled={confirmPatientModal}
				onCancel={() => {
					setConfirmPatientModal(false);
				}}
			/>
		</>
	);
};

export default GeneralConsultation;
