import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Header from "components/common/Header/Header";
import InputBox from "components/common/InputBox/InputBox";
import React, { useEffect, useState } from "react";
import styles from "./Billings.module.scss";
import SelectBox from "components/common/SelectBox/SelectBox";
import { useRecords } from "lib/hooks/useRecords";
import { sortMonthsFeatures, sortPaidFeatures, sortTypeFeatures } from "lib/models/sortFeatures";
import { useHMO } from "lib/hooks/useHMO";
import { DateTime } from "luxon";
import { filterDataByMonthYear } from "lib/utils/filterDataByMonthYear";
import _ from "lodash";
import { setTableConfigs } from "components/common/Table/setTableConfigs";
import { useTableSettings } from "lib/hooks/useTableSettings";
import { searchTable } from "components/common/Table/searchTable";
import Table from "components/common/Table/Table";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import { filterRecordsByType } from "lib/utils/filterRecordsByType";
import Button from "components/common/Button/Button";
import PrintBillings from "../PrintBillings/PrintBillings";
import { filterPaid } from "lib/utils/filterPaid";

const Billings = () => {
	const { nameRecordsData } = useRecords();
	const { sortHMOFeatures, filterHMOData } = useHMO();
	const { hmoTableConfigs } = useTableSettings();

	const [sortMonth, setSortMonth] = useState(DateTime.now().month);
	const [sortYear, setSortYear] = useState(DateTime.now().year);
	const [sortHMO, setSortHMO] = useState("0");
	const [hmoSearch, setHMOSearch] = useState("");
	const [total, setTotal] = useState(0);
	const [typeData, setTypeData] = useState("all");
	const [printModal, setPrintModal] = useState(false);
	const [paid, setPaid] = useState("all");

	const filterData = filterDataByMonthYear(
		filterRecordsByType(filterPaid(nameRecordsData, paid), typeData),
		sortMonth,
		sortYear
	);

	useEffect(() => {
		if (sortHMO === "0") {
			const hmoSortedData = filterHMOData(filterData);
			const totalSum = hmoSortedData.reduce((total, item) => total + parseInt(item.total), 0);
			setTotal(totalSum);
		} else {
			const hmoFilterData = _.filter(filterData, (item) => item.hmo === sortHMO);
			const totalSum = hmoFilterData.reduce((total, item) => total + parseInt(item.bill), 0);
			setTotal(totalSum);
		}
	}, [sortHMO, filterData, filterHMOData]);

	const renderHMOTable = () => {
		if (sortHMO === "0") {
			const hmoSortedData = filterHMOData(filterData);

			return hmoSortedData.map((item, index) => {
				const { tableData, tableHeaders, tableWidth } = setTableConfigs(item.data, hmoTableConfigs, {
					defaultItem: "datecreated",
					sortItem: "Hey",
					sortOrder: "asc",
				});

				return (
					<div className={styles.tableSetContainer} key={index}>
						<div className={styles.hmoHeaderContainer}>
							<div className={styles.hmo}>{item.hmo}</div>
							<div className={styles.totalContainer}>
								<span className={styles.totalLabel}>Total: </span>
								<span className={styles.total}>{item.total}</span>
							</div>
						</div>

						<Table
							data={searchTable(tableData, hmoSearch)}
							dataHeaders={tableHeaders}
							dataWidth={tableWidth}
							rowSelected={"0"} // Row Selected ID
							rowClick={(item) => {}}
							rowDoubleClick={() => {}}
							emptyTableString="No Billing Record Records"
						/>
					</div>
				);
			});
		} else {
			const hmoFilterData = _.filter(filterData, (item) => item.hmo === sortHMO);

			const { tableData, tableHeaders, tableWidth } = setTableConfigs(hmoFilterData, hmoTableConfigs, {
				defaultItem: "datecreated",
				sortItem: "Hey",
				sortOrder: "asc",
			});
			return (
				<Table
					data={searchTable(tableData, hmoSearch)}
					dataHeaders={tableHeaders}
					dataWidth={tableWidth}
					rowSelected={"0"} // Row Selected ID
					rowClick={(item) => {}}
					rowDoubleClick={() => {}}
					emptyTableString="No Billing Record Records"
				/>
			);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<Header icon={faMoneyBill}>Billings</Header>
				</div>
				<div className={styles.sortContainer}>
					<InputBox
						label="Search"
						className={styles.search}
						width="30rem"
						value={hmoSearch}
						onChange={(e) => {
							setHMOSearch(e.target.value);
						}}
					/>
					<SelectBox
						label="Month"
						className={styles.sortMonth}
						width="10rem"
						options={sortMonthsFeatures}
						value={sortMonth}
						onChange={(e) => setSortMonth(e.target.value)}
					/>
					<InputBox
						label="Year"
						className={styles.sortYear}
						width="6rem"
						maxLength="4"
						value={sortYear}
						onChange={(e) => setSortYear(e.target.value)}
					/>
					<SelectBox
						label="Type"
						className={styles.sortHMO}
						width="15rem"
						options={sortTypeFeatures}
						value={typeData}
						onChange={(e) => setTypeData(e.target.value)}
					/>
					<SelectBox
						label="HMO"
						className={styles.sortHMO}
						width="15rem"
						options={[{ label: "No Filter", value: 0 }, ...sortHMOFeatures]}
						value={sortHMO}
						onChange={(e) => setSortHMO(e.target.value)}
					/>
					<SelectBox
						label="Paid"
						className={styles.sortPaid}
						width="15rem"
						options={sortPaidFeatures}
						value={paid}
						onChange={(e) => setPaid(e.target.value)}
					/>
				</div>
				<div className={styles.tableContainer}>{renderHMOTable()}</div>
			</div>
			<BottomMenu className={styles.bottomContainer}>
				<div className={styles.totalContainer}>
					<span className={styles.totalLabel}>Total</span>
					<span className={styles.total}>{total}</span>
				</div>
				<div className={styles.buttonContainer}>
					<Button
						label="Print"
						onClick={() => {
							setPrintModal(true);
						}}
					/>
				</div>
			</BottomMenu>
			<PrintBillings
				enabled={printModal}
				onCancel={() => setPrintModal(false)}
				data={filterHMOData(filterData)}
			/>
		</>
	);
};

export default Billings;
