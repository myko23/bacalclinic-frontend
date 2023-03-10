import React, { useState } from "react";
import styles from "./GeneralAdmitted.module.scss";
import InputBox from "components/common/InputBox/InputBox";
import SelectBox from "components/common/SelectBox/SelectBox";
import Table from "components/common/Table/Table";
import { searchTable } from "components/common/Table/searchTable";
import { useSelected } from "lib/hooks/useSelected";
import { useTableConfigs } from "components/common/Table/useTableConfigs";
import { useRecords } from "lib/hooks/useRecords";
import { useTableSettings } from "lib/configs/useTableSettings";

const GeneralAdmitted = () => {
	const [admittedSearch, setAdmittedSearch] = useState("");
	const { selectedAdmission, setSelectedAdmission } = useSelected();
	const { admittedAdmissionData } = useRecords();
	const { generalAdmissionTableConfigs } = useTableSettings();

	const { tableData, tableHeaders, tableWidth } = useTableConfigs(
		admittedAdmissionData,
		generalAdmissionTableConfigs,
		{
			defaultItem: "datecreated",
			sortItem: "hello",
			sortOrder: "asc",
		}
	);
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Admitted Patients</h1>
			<div className={styles.sortContainer}>
				<InputBox
					label="Search"
					className={styles.search}
					width="30rem"
					value={admittedSearch}
					onChange={(e) => setAdmittedSearch(e.target.value)}
				/>

				<SelectBox label="Sort By" className={styles.sortBy} />
				<SelectBox label="Asc/ Desc" className={styles.sort} />
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
					rowDoubleClick={() => {}}
					emptyTableString="No Consultation Records"
				/>
			</div>
		</div>
	);
};

export default GeneralAdmitted;
