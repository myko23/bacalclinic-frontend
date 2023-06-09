import React, { useState } from "react";
import styles from "./GeneralAdmitted.module.scss";
import InputBox from "components/common/InputBox/InputBox";
import SelectBox from "components/common/SelectBox/SelectBox";
import Table from "components/common/Table/Table";
import { searchTable } from "components/common/Table/searchTable";
import { useSelected } from "lib/hooks/useSelected";
import { useTableConfigs } from "components/common/Table/useTableConfigs";
import { useRecords } from "lib/hooks/useRecords";
import { useTableSettings } from "lib/hooks/useTableSettings";
import Header from "components/common/Header/Header";
import { faBedPulse } from "@fortawesome/free-solid-svg-icons";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import SelectPatientModal from "components/features/SelectPatientModal/SelectPatientModal";
import { useRoute } from "lib/hooks/useRoute";
import _ from "lodash";
import { sortNameAdmissionHeader } from "lib/configs/selectConfigs";
import { sortFeatures } from "lib/models/sortFeatures";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import { useDeleteRecordsMutation } from "lib/api/recordsAPI";

const GeneralAdmitted = () => {
	const [admittedSearch, setAdmittedSearch] = useState("");
	const { selectedAdmission, setSelectedAdmission } = useSelected();
	const { admittedAdmissionData } = useRecords();
	const { generalAdmissionTableConfigs } = useTableSettings();
	const [confirmPatientModal, setConfirmPatientModal] = useState();
	const { setRecordsView, setMainView } = useRoute();
	const [sortItem, setSortItem] = useState();
	const [sortOrder, setSortOrder] = useState();
	const [confirmDelete, setConfirmDelete] = useState(false);
	const deleteAdmission = useDeleteRecordsMutation();

	const viewButtonDisable = _.includes(
		_.map(admittedAdmissionData, (item) => item._id),
		selectedAdmission?._id
	);

	const { tableData, tableHeaders, tableWidth } = useTableConfigs(
		admittedAdmissionData,
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
				<Header icon={faBedPulse}>Admitted Patients</Header>
				<div className={styles.sortContainer}>
					<InputBox
						label="Search"
						className={styles.search}
						width="30rem"
						value={admittedSearch}
						onChange={(e) => setAdmittedSearch(e.target.value)}
					/>

					<SelectBox
						label="Sort By"
						className={styles.sortBy}
						options={sortNameAdmissionHeader}
						value={sortItem}
						onChange={(e) => setSortItem(e.target.value)}
					/>
					<SelectBox
						label="Asc/ Desc"
						className={styles.sort}
						options={sortFeatures}
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value)}
					/>
				</div>
				<div className={styles.tableContainer}>
					<Table
						data={searchTable(tableData, admittedSearch)}
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
						emptyTableString="No Consultation Records"
					/>
				</div>
			</div>
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
			<BottomMenu className={styles.bottomContainer}>
				<div className={styles.buttonContainer}>
					<Button label="Add" className={styles.button} onClick={() => setConfirmPatientModal(true)} />
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
						className={styles.button}
						onClick={() => {
							setConfirmDelete(true);
						}}
						disabled={!viewButtonDisable}
					/>
				</div>
			</BottomMenu>
			<ConfirmModal
				enabled={confirmDelete}
				message={`Are you sure you want to DELETE record with ${selectedAdmission?.chiefcomplaint} from the admission records`}
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

export default GeneralAdmitted;
