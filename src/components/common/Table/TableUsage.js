import React from "react";
import { searchTable } from "./searchTable";
import Table from "./Table";
import { useTableConfigs } from "./useTableConfigs";

const TableUsage = () => {
	const { tableData, tableHeaders, tableWidth } = useTableConfigs(
		[],
		[
			{
				header: "Name",
				content: (item) => {
					return `${item.firstname} ${item.lastname}`;
				},
				width: 40,
			},
			{
				header: "Birthday",
				content: (item) => item,
				width: 20,
			},
			{ header: "Age", content: (item) => item, width: 20 },
		],
		{ defaultItem: "datecreated", sortItem: "sortItem", sortOrder: "asc" }
	);

	return (
		<div>
			<Table
				data={searchTable(tableData, "searchField")}
				dataHeaders={tableHeaders}
				dataWidth={tableWidth}
				rowSelected={"1"} // Row Selected ID
				rowClick={() => {}}
				rowDoubleClick={() => {}}
				emptyTableString="No Patient Records"
			/>
		</div>
	);
};

export default TableUsage;
