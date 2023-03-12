import { faBedPulse } from "@fortawesome/free-solid-svg-icons";
import Header from "components/common/Header/Header";
import React, { useState } from "react";
import styles from "./GeneralAdmissionDay.module.scss";
import cls from "classnames";
import InputBox from "components/common/InputBox/InputBox";
import DateBox from "components/common/DateBox/DateBox";
import { DateTime } from "luxon";
import SelectBox from "components/common/SelectBox/SelectBox";
import Table from "components/common/Table/Table";
import { searchTable } from "components/common/Table/searchTable";
import { useSelected } from "lib/hooks/useSelected";
import { useTableConfigs } from "components/common/Table/useTableConfigs";
import { useTableSettings } from "lib/hooks/useTableSettings";
import { useRecords } from "lib/hooks/useRecords";
import _ from "lodash";
import { sortFeatures } from "lib/models/sortFeatures";
import { sortNameAdmissionHeader } from "lib/configs/selectConfigs";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import { useRoute } from "lib/hooks/useRoute";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { useDeleteRecordsMutation } from "lib/api/recordsAPI";
import { toast } from "react-toastify";
import SelectPatientModal from "components/features/SelectPatientModal/SelectPatientModal";

const GeneralAdmissionDay = () => {
	const { selectedAdmission, setSelectedAdmission } = useSelected();
	const { setMainView, setRecordsView, setGeneralAdmissionView } = useRoute();
	const { nameAdmissionData } = useRecords();
	const { generalAdmissionTableConfigs } = useTableSettings();

	const deleteAdmission = useDeleteRecordsMutation();

	const [admissionSearch, setAdmissionSearch] = useState("");
	const [sortDay, setSortDay] = useState(DateTime.now().toFormat("MM-dd-yyyy"));
	const [sortItem, setSortItem] = useState("datecreated");
	const [sortOrder, setSortOrder] = useState("asc");
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [confirmPatientModal, setConfirmPatientModal] = useState(false);

	const datedConsultationData = _.filter(nameAdmissionData, (item) => item.dateofconsult === sortDay);

	const viewButtonDisable = _.includes(
		_.map(datedConsultationData, (item) => item._id),
		selectedAdmission?._id
	);

	const { tableData, tableHeaders, tableWidth } = useTableConfigs(
		datedConsultationData,
		generalAdmissionTableConfigs,
		{
			defaultItem: "datecreated",
			sortItem,
			sortOrder,
		}
	);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<Header icon={faBedPulse}>Daily Admissions</Header>
					<div className={styles.navContainer}>
						<div className={cls(styles.navItem, styles.navSelected)}>Days</div>
						<div
							className={styles.navItem}
							onClick={() => {
								setGeneralAdmissionView("months");
							}}
						>
							Months
						</div>
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
						options={sortNameAdmissionHeader}
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
						data={searchTable(tableData, admissionSearch)}
						dataHeaders={tableHeaders}
						dataWidth={tableWidth}
						rowSelected={selectedAdmission?._id} // Row Selected ID
						rowClick={(item) => {
							setSelectedAdmission(item._id);
						}}
						rowDoubleClick={() => {
							setMainView("records");
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
							setConfirmPatientModal(true);
						}}
					/>
					<Button
						label="View"
						className={styles.button}
						disabled={!viewButtonDisable}
						onClick={() => {
							setMainView("records");
							setRecordsView("editadmission");
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
					setRecordsView("addadmission");
				}}
				onCancel={() => {
					setConfirmPatientModal(false);
				}}
			/>
			<ConfirmModal
				enabled={confirmDelete}
				message={`Are you sure you want to DELETE record with ${selectedAdmission?.chiefcomplaint} from the consultation records`}
				onConfirm={async () => {
					try {
						await toast.promise(deleteAdmission.mutateAsync(selectedAdmission._id), {
							pending: "Deleting Admission",
							success: "Admission Deleted",
							error: "Unsuccesful Deleting of Admission",
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

export default GeneralAdmissionDay;
