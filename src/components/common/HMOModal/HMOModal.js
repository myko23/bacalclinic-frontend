import { useHMO } from "lib/hooks/useHMO";
import React, { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import Modal from "../Modal/Modal";
import styles from "./HMOModal.module.scss";

const HMOModal = ({ onCancel, formik }) => {
	const { hmoData } = useHMO();
	const [searchHMO, setSearchHMO] = useState("");

	const renderHMOData = () => {
		const searchHMOData = hmoData.filter((item) => {
			if (item.includes(searchHMO)) return item;
			return null;
		});

		return searchHMOData.map((item) => {
			return (
				<div
					key={item}
					className={styles.dataItem}
					onClick={() => {
						formik.setFieldValue("hmo", item);
					}}
					onDoubleClick={onCancel}
				>
					{item}
				</div>
			);
		});
	};

	return (
		<Modal onCancel={onCancel}>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>HMO</h1>
					<InputBox
						width="100%"
						label="search"
						value={searchHMO}
						onChange={(e) => setSearchHMO(e.target.value)}
					/>
				</div>
				<div className={styles.dataContainer}>{renderHMOData()}</div>
				<div className={styles.buttonContainer}>
					<Button label="Back" onClick={onCancel} />
				</div>
			</div>
		</Modal>
	);
};

export default HMOModal;
