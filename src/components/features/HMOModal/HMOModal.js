import { faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { useHMO } from "lib/hooks/useHMO";
import React, { useState } from "react";
import Button from "../../common/Button/Button";
import Header from "../../common/Header/Header";
import InputBox from "../../common/InputBox/InputBox";
import Modal from "../../common/Modal/Modal";
import styles from "./HMOModal.module.scss";

const HMOModal = ({ enabled = false, onCancel, formik }) => {
	const { hmoData } = useHMO();

	const [searchHMO, setSearchHMO] = useState("");

	if (!enabled) return null;

	const searchHMOData = hmoData.filter((item) => {
		if (item.toLowerCase().includes(searchHMO.toLowerCase())) return item;
		return null;
	});

	const renderHMOData = () => {
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
					<Header icon={faFileMedical}>HMO</Header>
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
