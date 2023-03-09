import React from "react";
import styles from "./Table.module.scss";
import _ from "lodash";
import cls from "classnames";

const Table = ({
	data,
	dataHeaders,
	dataWidth,
	rowSelected = "1",
	rowClick = () => {},
	rowDoubleClick = () => {},
	headerClick = () => {},
	emptyTableString = "Add more data to the table",
	className,
}) => {
	const findIdIndex = _.findIndex(dataHeaders, (key) => key === "_id");

	const renderTableHeader = () => {
		return (
			<>
				{dataHeaders?.map((item, index) => {
					if (index === findIdIndex) return null;
					return (
						<div
							key={index}
							className={styles.columnHeader}
							style={{ width: `${dataWidth[index - 1]}%` }}
							onClick={() => headerClick(item)}
						>
							{item}
						</div>
					);
				})}
			</>
		);
	};

	const renderCards = () => {
		return (
			<>
				{data?.map((item, index) => {
					return (
						<div
							key={index}
							className={cls(styles.rowData, item._id === rowSelected && styles.rowSelected)}
							onClick={() => {
								rowClick(item);
							}}
							onDoubleClick={() => {
								rowDoubleClick(item);
							}}
						>
							{Object.values(item).map((row, index) => {
								if (index === findIdIndex) return null;
								return (
									<div
										key={index}
										className={styles.rowItem}
										style={{ width: `${dataWidth[index - 1]}%` }}
									>
										{row}
									</div>
								);
							})}
						</div>
					);
				})}
			</>
		);
	};

	return (
		<div className={cls(styles.table, className)}>
			<div className={styles.headerContainer}>{renderTableHeader()}</div>
			{data?.length !== 0 ? (
				<div className={styles.dataContainer}>{renderCards()}</div>
			) : (
				<div className={styles.emptyMessage}>{emptyTableString}</div>
			)}
		</div>
	);
};

export default Table;
